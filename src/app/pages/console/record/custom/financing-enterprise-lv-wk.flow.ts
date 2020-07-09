import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs';

export class FinancingEnterpriseLvWkFlow implements IFlowCustom {

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
            formValue.title = '《' + formValue.enterprise + '》的额度调整';
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
