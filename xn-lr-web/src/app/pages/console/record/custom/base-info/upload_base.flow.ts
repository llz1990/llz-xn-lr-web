
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {IFlowCustom} from '../../flow.custom';
import {XnService} from '../../../../../services/xn.service';

/**
 *  企业上传基本资料
 */
export class UploadBaseFlow implements IFlowCustom {
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
            def: '上传基本资料'
        };
    }
}
