import { FormGroup, FormControl, Validators } from '@angular/forms';
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary：平台签署协议
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
import { BankFinancingContractModalComponent } from '../share/modal/bank-asign-contract.modal';
import XnFlowUtils from '../../../common/xn-flow-utils';
import { XnUtils } from '../../../common/xn-utils';

export class BankPushplatSupplier implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any, form: FormGroup): Observable<any> {
        // console.log('post show svrConfig :', svrConfig, form);

        // form.get('enterprise').valueChanges.subscribe(val => {
        //     if (!val) {
        //         form.get('enterprise').reset('');
        //         return;
        //     }

        //     form.addControl('new', new FormControl('enterprise1', Validators.required));
        //     console.log('enterprise value changes :', val);
        // });

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
                        x['config']['text'] = '甲方（电子签章、数字签名）';
                    } else if (x.label.includes('企业信用信息采集授权书')) {
                        x['config']['text'] = '甲方（电子签章、数字签名）';
                    }  else {
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
            def: '平台签署协议'
        };
    }
}
