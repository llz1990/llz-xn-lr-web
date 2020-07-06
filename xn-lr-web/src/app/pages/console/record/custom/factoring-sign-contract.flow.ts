import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LoadingService} from '../../../../services/loading.service';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import {XnUtils} from '../../../../common/xn-utils';
import XnFlowUtils from '../../../../common/xn-flow-utils';

// import {XnUtils} from "../../../../common/xn-utils";

export class FactoringSignContractFlow implements IFlowCustom {

    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
        // if (svrConfig.procedure.procedureId === '@begin') {
        //     this.handleSvrConfigWhenBegin(svrConfig);
        // }
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        // 这个默认值要加上
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
                json.data.flowId = 'factoring_sign_contract';
                const contracts = json.data;
                return {
                    action: 'modal',
                    modal: FinancingFactoringModalComponent,
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
