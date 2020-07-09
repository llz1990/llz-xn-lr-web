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

export class VankeFinancingSign implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }
    afterSubmitandGettip(svrConfig: any) { }

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

        XnUtils.checkLoading(this);
        return this.xn.dragon.post('/flow/preSubmit', params)
            .map(json => {
                if (json.data.length === 0) {
                    this.xn.msgBox.open(false, '无合同可签署');
                    return Observable.of({
                        action: 'stop',
                    });
                } else {
                    json.data.flowId = 'vanke_financing_sign';
                    const contracts = json.data;
                    contracts.forEach(element => {
                        if (!element['config']) {
                            element['config'] = {
                                text: ''
                            };
                        }
                    });
                    contracts.forEach(x => {
                        if (x.label.includes('国内无追索权商业保理合同')) {
                            x['config']['text'] = '甲方（债权人、出让人）数字签名';
                        } else if (x.label.includes('应收账款转让协议书') || x.label.includes('应收账款转让登记协议')) {
                            x['config']['text'] = '甲方（出让方）';
                        } else if (x.label.includes('应收账款债权转让通知书')) {
                            x['config']['text'] = '卖方：';
                        } else if (x.label === '保理合同-国寿') {
                            x['config']['text'] = '卖方（盖章）：';
                        } else if (x.label.includes('邮储')) {
                            x['config']['text'] = '卖方： （公章）';
                        } else if (x.label.includes('农行')) {
                            x['config']['text'] = '卖 方 ： （  公 章 （ 含 电 子 章 ））';
                        } else {
                            x['config']['text'] = '（盖章）';
                        }
                    });
                    return {
                        action: 'modal',
                        modal: DragonFinancingContractModalComponent,
                        params: contracts
                    };
                }

            });
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '供应商签署合同'
        };
    }
}
