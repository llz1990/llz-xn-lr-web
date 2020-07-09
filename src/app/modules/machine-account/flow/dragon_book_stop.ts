/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary：保理商提单预录入
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          增加功能1         2019-08-28
 * **********************************************************************
 */
import 'rxjs/add/observable/of';
import { XnService } from '../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from '../../../services/loading.service';
import { IFlowCustom } from './flow-custom';
import { FormGroup } from '@angular/forms';

export class DragonbookStop implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any, mainForm: FormGroup): Observable<any> {
        // let routeparams = mainForm.get('mainFlowId').value;
        // let self = this;
        // setTimeout(() => {
        //     let textId = document.getElementById("text-id");
        //     console.log(textId);
        //     textId.onclick = function viewProcess() {
        //         self.xn.router.navigate([
        //             `machine-account/main-list/detail/${routeparams}`
        //         ]);
        //     }
        // }, 300);
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
            def: '中止'
        };
    }
}
