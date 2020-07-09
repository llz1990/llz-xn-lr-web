import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {XnModalUtils} from '../../../../common/xn-modal-utils';
import {ViewContainerRef} from '@angular/core';
import {RepaymentInputModalComponent} from '../../../../public/modal/repayment-input-modal.component';

export class FactoringRepaymentFlow implements IFlowCustom {

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return XnModalUtils.openInViewContainer(this.xn, this.vcr, RepaymentInputModalComponent, null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId === '@begin') {
            (!!svrConfig.constParams) ? formValue.title = '《' + svrConfig.constParams.checkers['honourName'] + '》收款登记' :
                formValue.title = svrConfig.record.title;
        }

        if (svrConfig && svrConfig.constParams && svrConfig.constParams.checkers) {
            for (let key in svrConfig.constParams.checkers) {
                if (key === 'repaymentAmount') {
                    delete svrConfig.constParams.checkers[key];
                }
            }
        }

        return Observable.of(null);
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '默认标题'
        };
    }

}
