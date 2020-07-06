import { XnUtils } from './../../../../common/xn-utils';
import { FinancingFactoringModalComponent } from './../../../../public/modal/financing-factoring-modal.component';
import { IFlowCustom } from '../flow.custom';
import { XnService } from '../../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import XnFlowUtils from '../../../../common/xn-flow-utils';
import { FinancingFactoringVankeModalComponent } from '../../../../public/modal/financing-factoring-vanke-modal.component';
import { LoadingService } from '../../../../services/loading.service';

export class Financing7Flow implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {}

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {}

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }

        const params: any = {
            flowId: svrConfig.flow.flowId,
            procedureId: svrConfig.procedure.procedureId,
            recordId: (svrConfig.record && svrConfig.record.recordId) || '', // 重复同意时会有recordId，此时后台就不要新生成recordId了
            title: formValue.title,
            memo: formValue.memo,
            checkers: XnFlowUtils.buildSubmitCheckers(
                svrConfig.checkers,
                formValue
            )
        };

        XnUtils.checkLoading(this);

        return this.xn.api
            .post('/record/record?method=pre_submit', params)
            .map(json => {
                console.log(json, 'pre_submit');
                json.data.flowId = 'financing7';
                const contracts = json.data;
                contracts.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                contracts[0]['config']['text'] =
                    '甲方（债权人、出让人）数字签名';
                contracts[1]['config']['text'] = '甲方（出让方）';
                // contracts[2]['config']['text'] = '甲方（出让方）';
                // contracts[3]['config']['text'] = '（盖章）';
                // contracts[4]['config']['text'] = '（盖章）';
                this.loading.close();
                return {
                    action: 'modal',
                    modal: FinancingFactoringVankeModalComponent,
                    params: contracts
                };
            });
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            def: `《保证付款 + 商品融资》的交易申请`
        };
    }
}
