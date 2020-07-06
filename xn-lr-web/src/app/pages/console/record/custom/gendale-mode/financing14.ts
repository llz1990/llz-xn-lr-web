import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { IFlowCustom } from '../../flow.custom';
import { XnService } from '../../../../../services/xn.service';
import XnFlowUtils from '../../../../../common/xn-flow-utils';
import { XnUtils } from '../../../../../common/xn-utils';
import { FinancingFactoringVankeModalComponent } from '../../../../../public/modal/financing-factoring-vanke-modal.component';
import { LoadingService } from '../../../../../services/loading.service';

/**
 *  金地模式3.0-保理商审核
 */
export class Financing14Flow implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) { }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void { }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId === '@begin') {
            formValue.title = '《' + JSON.parse(svrConfig.constParams.checkers['supplier']).label + '》放款申请';
        }

        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }

        const params: any = {
            flowId: svrConfig.flow.flowId,
            procedureId: svrConfig.procedure.procedureId,
            recordId: svrConfig.record && svrConfig.record.recordId || '',  // 重复同意时会有recordId，此时后台就不要新生成recordId了
            title: formValue.title,
            memo: formValue.memo,
            checkers: XnFlowUtils.buildSubmitCheckers(svrConfig.checkers, formValue)
        };

        console.log('preSubmit', params);
        XnUtils.checkLoading(this);

        return this.xn.api.post('/record/record?method=pre_submit', params)
            .map(json => {
                console.log(json, 'pre_submit');
                json.data.flowId = 'financing14';
                const contracts = json.data;
                contracts.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                contracts.forEach(x => {
                    if (x.label.includes('国内无追索权商业保理合同')) {
                        x['config']['text'] = '甲方（债权人、出让人）数字签名';
                    } else if (x.label.includes('应收账款转让协议书') || x.label.includes('应收账款转让登记协议')) {
                        x['config']['text'] = '甲方（出让方）';
                    } else {
                        x['config']['text'] = '（盖章）';
                    }
                });
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
            def: `《${this.xn.user.orgName}》的交易申请`
        };
    }
}
