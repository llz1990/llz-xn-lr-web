import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {IFlowCustom} from '../../flow.custom';
import {XnService} from '../../../../../services/xn.service';

/**
 *  金地模式3.0-应收账款转让信息
 */
export class EntryRegistration14Flow implements IFlowCustom {
    constructor(private xn: XnService) {}

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {}

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