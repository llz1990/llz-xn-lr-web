import {IFlowCustom} from '../../flow.custom';
import {XnService} from '../../../../../services/xn.service';
import {Observable} from '../../../../../../../node_modules/rxjs';

/**
 *  万科abs 应收账款转让金额
 */
export class EntryRegistrationCode6Flow implements IFlowCustom {

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
