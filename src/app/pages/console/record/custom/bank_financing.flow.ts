import { IFlowCustom } from '../flow.custom';
import { XnService } from '../../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class BankFinancingFlow implements IFlowCustom {
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
            def: '银行融资管费理调整申请'
        };
    }
}
