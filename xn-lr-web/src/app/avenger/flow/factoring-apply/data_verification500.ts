/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：contract-input.component.ts
 * @summary：变更账号流程
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wq          增加功能1         2019-06-24
 * **********************************************************************
 */
import 'rxjs/add/observable/of';
import { XnService } from '../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import { IFlowCustom } from '../flow-custom';
import { LoadingService } from '../../../services/loading.service';
import { EditParamInputModel, EditModalComponent } from '../../../avenger/shared/components/modal/edit-modal.component';
import { CheckersOutputModel } from '../../../config/checkers';
import { XnModalUtils } from '../../../common/xn-modal-utils';




export class AvengerdataVerification500 implements IFlowCustom {
    public rejectdata: string[] = [];

    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(svrConfig: any): Observable<any> {
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
            titleName: '流程标题',
            def: '资料初审'
        };
    }
}
