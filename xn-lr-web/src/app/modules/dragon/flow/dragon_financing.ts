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

export class DragonFinancing implements IFlowCustom {
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
            let contractFile = formValue.dealContract;
            let invoiceFile = formValue.invoice;
            let certificateFile = formValue.certificateFile;
            let accountInfo = formValue.accountInfo;
            payables = new XNCurrency(payables).value;
            let alert = [];

            try {
                if (contractFile === '') {
                    alert.push(`${alert.length + 1}、交易合同没上传`);
                    // let others = JSON.parse(svrConfig.checkers.filter(x => x.checkerId === 'dealContract')[0].other);
                    // others.show = true;
                    // svrConfig.checkers.filter(x => x.checkerId === 'dealContract')[0].other = JSON.stringify(others);
                } else {

                }
                if (certificateFile === '') {
                    alert.push(`${alert.length + 1}、资质证明文件没上传`);
                    // let others = JSON.parse(svrConfig.checkers.filter(x => x.checkerId === 'certificateFile')[0].other);
                    // others.show = true;
                    // svrConfig.checkers.filter(x => x.checkerId === 'certificateFile')[0].other = JSON.stringify(others);
                } else {

                }

                if (invoiceFile === '') {
                    alert.push(`${alert.length + 1}、发票没上传`);
                    // let others = JSON.parse(svrConfig.checkers.filter(x => x.checkerId === 'invoice')[0].other);
                    // others.show = true;
                    // svrConfig.checkers.filter(x => x.checkerId === 'invoice')[0].other = JSON.stringify(others);
                }
                invoiceFile = JSON.parse(invoiceFile);
                let invoiceAmount = new XNCurrency(0);

                invoiceFile.forEach(x => {
                    invoiceAmount = invoiceAmount.add(x.invoiceAmount);
                });

                if (payables > invoiceAmount.value) {
                    alert.push(`${alert.length + 1}、发票金额${invoiceAmount.value}小于应收账款金额${payables}`);
                }
                if (alert.length) {
                    alert[alert.length - 1] = alert[alert.length - 1] + '，无法提交';
                    this.xn.msgBox.open(false, alert);
                    return Observable.of({
                        action: 'stop',
                    });
                }
                // 只有在填了合同金额时，比较合同金额和应收账款金额大小

            } catch (e) {
                console.log('msg:', e);
            }
            // 不做操作
            return Observable.of(null);
        } else {
            return Observable.of(null);
        }

    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: `供应商提交资料`
        };
    }
    afterSubmitandGettip(svrConfig: any) {


    }
    // 计算应收账款转让金额
    public ReceiveData(item: any) {
        let tempValue = item.replace(/,/g, '');
        tempValue = parseFloat(tempValue).toFixed(2);
        return Number(tempValue);
    }
}
