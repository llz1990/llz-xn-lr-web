import { IFlowCustom } from '../flow.custom';
import { XnService } from '../../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class BankDiscountFlow implements IFlowCustom {
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
            titleName: '流程标题',
            def: '银行保理保证管理费调整申请'
        };
    }
}
