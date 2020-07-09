/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary：供应商提交资料
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
import { XNCurrency } from '../../../common/xncurrency';

export class VankeFinancing implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any, mainForm: FormGroup): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId === 'operate') {
            let payables = formValue.receive.toString().replace(/,/g, '');
            payables = new XNCurrency(payables).value;
            let contractFile = formValue.dealContract;
            let invoiceFile = formValue.invoice;
            let performanceFile = formValue.performanceFile;
            let certificateFile = formValue.certificateFile;
            let alert = [];
            try {
                if (contractFile === '') {
                    alert.push(`${alert.length + 1}、交易合同未上传`);
                }
                if (performanceFile === '') {
                    alert.push(`${alert.length + 1}、履约证明文件未上传`);
                }
                if (certificateFile === '') {
                    alert.push(`${alert.length + 1}、资质证明文件未上传`);
                }
                if (invoiceFile === '') {
                    alert.push(`${alert.length + 1}、发票未上传`);
                } else {
                    invoiceFile = JSON.parse(invoiceFile);
                    let invoiceAmount = new XNCurrency(0);
                    invoiceFile.forEach(x => {
                        invoiceAmount = invoiceAmount.add(x.invoiceAmount);
                    });
                    const contractTypeBool = []; // 必须每张发票都包含发票号，金额，开票日期
                    for (let i = 0; i < invoiceFile.length; i++) {
                        contractTypeBool.push(!!(invoiceFile[i].invoiceAmount) && !!(invoiceFile[i].invoiceNum) && !!invoiceFile[i].invoiceDate);
                    }
                    contractTypeBool.indexOf(false) > -1 ? alert.push(`${alert.length + 1}、发票沒进行验证，请验证`) : '';
                    if (payables > invoiceAmount.value) {
                        alert.push(`${alert.length + 1}、发票金额${invoiceAmount.value}小于应收账款金额${payables}`);
                    }
                }
                if (alert.length) {
                    alert[alert.length - 1] = alert[alert.length - 1] + '，无法提交';
                    this.xn.msgBox.open(false, alert);
                    return Observable.of({
                        action: 'vankestop',

                    });
                } else {
                    return Observable.of(null);
                }
            } catch (e) {
                console.log('msg:', e);
            }
        } else {
            return Observable.of(null);
        }

    }


    afterSubmitandGettip(svrConfig: any) {
        if (svrConfig.procedure.procedureId === 'operate') {
            this.xn.msgBox.open(false, '提交成功,下一步请复核人在【首页-待办任务】中完成【复核】的待办任务');
        }

    }
    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '供应商上传资料'
        };
    }


}
