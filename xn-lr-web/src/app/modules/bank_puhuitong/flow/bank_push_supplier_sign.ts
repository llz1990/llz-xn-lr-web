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
import XnFlowUtils from '../../../common/xn-flow-utils';
import { XnUtils } from '../../../common/xn-utils';
import { BankFinancingContractModalComponent } from '../share/modal/bank-asign-contract.modal';

export class BankPushSupplier implements IFlowCustom {
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
        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }

        const params: any = {
            flowId: svrConfig.flow.flowId,
            procedureId: svrConfig.procedure.procedureId,
            recordId: svrConfig.record && svrConfig.record.recordId || '',
            title: formValue.title,
            memo: formValue.memo,
            checkers: XnFlowUtils.buildSubmitCheckers(svrConfig.checkers, formValue)
        };

        console.log('preSubmit', params);
        XnUtils.checkLoading(this);
        return this.xn.avenger.post('/flow/preSubmit', params)
            .map(json => {
                console.log(json, 'pre_submit');
                json.data.flowId = 'sub_bank_push_supplier_sign';
                const contracts = json.data;
                contracts.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                contracts.forEach(x => {
                    if (x.label.includes ('链融科技供应链服务平台合作协议')) {
                        x['config']['text'] = '乙方（电子签章、数字签名）';
                    } else if (x.label.includes('企业信用信息采集授权书')) {
                        x['config']['text'] = '授权人（或本公司）';
                    } else {
                        x['config']['text'] = '（盖章）';
                    }
                });
                return {
                    action: 'modal',
                    modal: BankFinancingContractModalComponent,
                    params: contracts
                };
            });
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '签署协议'
        };
    }
}
