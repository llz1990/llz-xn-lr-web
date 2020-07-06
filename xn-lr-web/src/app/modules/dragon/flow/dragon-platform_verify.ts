/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary：平台审核
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
import { XNCurrency } from '../../../common/xncurrency';

export class DragonPlatformVerify implements IFlowCustom {
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
        if (svrConfig.procedure.procedureId === 'operate') {
            let payable = formValue.receive.toString().replace(/,/g, '');
            let payables = new XNCurrency(payable).value;
            let contractFile = formValue.dealContract;
            let transferAll = JSON.parse(formValue.invoice);
            console.info('formValue===>', formValue);
            let alert = [];
            try {
                let invoiceAmount = new XNCurrency(0);
                transferAll.forEach(x => {
                    invoiceAmount = invoiceAmount.add(x.transferMoney);
                });
                if (invoiceAmount.value !== payables) {
                    alert.push(`${alert.length + 1}、发票转让金额总和${invoiceAmount.value}不等于应收账款金额${payables}`);
                }
                contractFile = JSON.parse(contractFile);
                let amountTotal = contractFile.filter(x =>
                    x.contractMoney !== ''
                );
                let contractFileAmount = new XNCurrency(0);
                if (amountTotal.length > 0) {
                    contractFile.forEach(x => {
                        contractFileAmount = contractFileAmount.add(x.contractMoney);
                    });
                }
                if (contractFile[0].contractFile === '') {
                    alert.push(`${alert.length + 1}、交易合同文件未上传`);
                }
                // contractFile = JSON.parse(contractFile);
                // contractFile.forEach(c => {
                //     parseFloat(c.contractMoney) ? amount += parseFloat(c.contractMoney) : amount += 0;
                // });
                // console.info('invoiceAmount==>', invoiceAmount.value);
                // console.info('contractFileAmount==>', contractFileAmount.value, payables);

                if (payables > contractFileAmount.value) {
                    alert.push(`${alert.length + 1}、合同金额${contractFileAmount.value}小于应收账款金额${payables}`);
                    // this.xn.msgBox.open(false, '合同金额小于应收账款金额，无法提交');
                    // return Observable.of({
                    //     action: 'stop',
                    // });
                }
                if (alert.length) {
                    alert[alert.length - 1] = alert[alert.length - 1] + '，无法提交';
                    this.xn.msgBox.open(false, alert);
                    return Observable.of({
                        action: 'stop',
                    });
                }
            } catch (e) {

            }

            return Observable.of(null);

        } else {
            return Observable.of(null);
        }

        // if (svrConfig.procedure.procedureId !== 'review') {
        //     return Observable.of(null);
        // }
        //  return Observable.of(null);
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '平台审核'
        };
    }
    // 计算应收账款转让金额
    public ReceiveData(item: any) {
        let tempValue = item.replace(/,/g, '');
        tempValue = parseFloat(tempValue).toFixed(2);
        return Number(tempValue);
    }
    private computeSum(array) {
        return array.reduce((prev, curr, idx, arr) => {
            return prev + curr;
        });
    }
}
