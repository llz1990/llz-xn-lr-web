import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import XnFlowUtils from '../../../../common/xn-flow-utils';
import {AuditCriteriaModalComponent} from '../../../../public/form/hw-mode/modal/audit-criteria-modal.component';

declare const moment: any;

/**
 *  两票一合同，委托模式-子流程-保理商审批流程
 */
export class FinancingFactoring2Flow implements IFlowCustom {

    constructor(private xn: XnService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId === 'operate') {
            const payTime = moment(formValue.payDate, 'YYYY-MM-DD').format('YYYYMMDD') || 0; // 将付款时间传给后台
            const modalParams = {
                mainFlowId: svrConfig.record.mainFlowId,
                payTime: payTime
            };
            // return Observable.of(null);
            return Observable.of({
                action: 'modal',
                modal: AuditCriteriaModalComponent,
                params: modalParams
            });
        } else if (svrConfig.procedure.procedureId === 'review') {
            const params: any = {
                flowId: svrConfig.flow.flowId,
                procedureId: svrConfig.procedure.procedureId,
                recordId: svrConfig.record && svrConfig.record.recordId || '',  // 重复同意时会有recordId，此时后台就不要新生成recordId了
                title: formValue.title,
                memo: formValue.memo,
                checkers: XnFlowUtils.buildSubmitCheckers(svrConfig.checkers, formValue)
            };

            console.log('preSubmit', params);
            return this.xn.api.post('/record/record?method=pre_submit', params)
                .map(json => {
                    console.log(json, 'pre_submit');
                    json.data.flowId = 'financing_factoring2';
                    return {
                        action: 'modal',
                        modal: FinancingFactoringModalComponent,
                        params: json.data
                    };
                });
        } else {
            return Observable.of(null);
        }
    }

    getTitleConfig(): any {
        return null;
    }
}
