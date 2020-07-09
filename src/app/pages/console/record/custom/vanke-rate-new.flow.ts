import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from '../../../../../../node_modules/rxjs';
// import {Observable} from 'rxjs';

// 万科利率修改，新增页面页面配置
export class VankeRateNewFlowComponent implements IFlowCustom {

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
            titleName: '',
            def: '默认标题'
        };
    }

}
