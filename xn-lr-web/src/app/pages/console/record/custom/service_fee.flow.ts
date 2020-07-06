import { IFlowCustom } from '../flow.custom';
import { XnService } from '../../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class ServiceFeeFlow implements IFlowCustom {
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
            def: '平台服务费调整申请'
        };
    }
}
