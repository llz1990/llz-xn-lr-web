import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import XnFlowUtils from '../../../../common/xn-flow-utils';

export class FinancingProject5Flow implements IFlowCustom {

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

        if (svrConfig.procedure.procedureId !== 'windReview') {
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
                json.data.flowId = 'financing_project5';
                return {
                    action: 'modal',
                    modal: FinancingFactoringModalComponent,
                    params: json.data
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
