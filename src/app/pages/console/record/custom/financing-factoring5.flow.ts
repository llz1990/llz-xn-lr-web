import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import XnFlowUtils from '../../../../common/xn-flow-utils';

export class FinancingFactoring5Flow implements IFlowCustom {

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
        // if (svrConfig.procedure.procedureId === 'operate') {
        //     // 这个默认值要加上
        //     formValue.factoringPrice = XnUtils.getDefaultValueByName(svrConfig, 'factoringPrice');
        // }

        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }

        let params: any = {
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
                json.data.flowId = 'financing_factoring5';
                return {
                    action: 'modal',
                    modal: FinancingFactoringModalComponent,
                    params: json.data
                };
            });
    }

    getTitleConfig(): any {
        return null;
    }
}
