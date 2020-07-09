/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary:供应商签署合同
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
import XnFlowUtils from '../../../common/xn-flow-utils';
import { XnUtils } from '../../../common/xn-utils';
import { DragonFinancingContractModalComponent } from '../share/modal/dragon-asign-contract.modal';

export class DragonSupplierSign implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }
    afterSubmitandGettip(svrConfig: any) {

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
        return this.xn.dragon.post('/flow/preSubmit', params)
            .map(json => {
                console.log(json, 'pre_submit');
                json.data.flowId = 'dragon_supplier_sign';
                const contracts = json.data;
                contracts.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                contracts.forEach(x => {
                    if (x.label === '国内无追索权商业保理合同（ABS版本）') {
                        x['config']['text'] = '甲方（债权人、出让人）数字签名';
                    } else if (x.label === '应收账款转让协议书' || x.label === '应收账款转让登记协议') {
                        x['config']['text'] = '甲方（出让方）';
                    } else {
                        x['config']['text'] = '（盖章）';
                    }
                });
                return {
                    action: 'modal',
                    modal: DragonFinancingContractModalComponent,
                    params: contracts
                };
            });
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: `供应商签署合同`
        };
    }
}
