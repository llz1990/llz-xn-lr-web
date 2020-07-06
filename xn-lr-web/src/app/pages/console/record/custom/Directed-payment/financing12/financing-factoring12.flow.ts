import {IFlowCustom} from '../../../flow.custom';
import {XnService} from '../../../../../../services/xn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FinancingFactoringVankeModalComponent} from '../../../../../../public/modal/financing-factoring-vanke-modal.component';
import XnFlowUtils from '../../../../../../common/xn-flow-utils';
import {XnUtils} from '../../../../../../common/xn-utils';
import {LoadingService} from '../../../../../../services/loading.service';

/**
 *  定向收款模式-保理商签署合同
 */
export class FinancingFactoring12Flow implements IFlowCustom {

    constructor(private xn: XnService, private loading: LoadingService,) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    /**
     *  供应商变更协议时，变更-保理不需要签署合同，终止时保理需要签署
     * @param svrConfig
     * @param formValue
     * @returns {Observable<any>}
     */
    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        let label = '';
        if (svrConfig.actions && svrConfig.actions.length && svrConfig.actions[0].checkers) {
            const find = svrConfig.actions[0].checkers.find(x => x.checkerId === 'itemChange').data;
            if (find) {
                label = JSON.parse(find).typeChange; // 变更类型
            }
        }
        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }
        if (label !== '终止协议') {
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
                json.data.flowId = 'financing_factoring12';
                const contracts = json.data;
                contracts.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                contracts.forEach(x => {
                    if (x.label === '终止协议通知书') {
                        x['config']['text'] = '乙方（电子签章、数字签名）';
                    } else {
                        x['config']['text'] = '（盖章）';
                    }
                });
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
