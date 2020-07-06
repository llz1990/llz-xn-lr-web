import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import 'rxjs/add/observable/of';
import {Observable} from '../../../../../../node_modules/rxjs';

export class SupplierFinanceFlow implements IFlowCustom {

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
        if (svrConfig.procedure.procedureId === '@begin') {
            formValue.title = '《' + this.xn.user.orgName + '》的财报更新';
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
