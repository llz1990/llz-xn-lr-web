import {IFlowCustom} from '../../flow.custom';
import {XnService} from '../../../../../services/xn.service';
import {Observable} from '../../../../../../../node_modules/rxjs';

/**
 *  金地abs - 项目公司确认应收账款
 */
export class ProjectConfirmationFlow implements IFlowCustom {

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
        return Observable.of(null);
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            def: `《${this.xn.user.orgName}》的交易申请`
        };
    }
}
