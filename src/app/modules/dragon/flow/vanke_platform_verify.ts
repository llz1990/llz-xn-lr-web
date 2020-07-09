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

export class VankePlatformVerify implements IFlowCustom {
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
            // let pdfProjectFiles = formValue.pdfProjectFiles;
            let checkCertFile = formValue.checkCertFile;
            let registerCertFile = formValue.registerCertFile;
            let isAddFiles = formValue.isAddFiles;
            let certificateFile = formValue.certificateFile;
            let hasDealContract = JSON.parse(formValue.dealContract).every(contract => !!contract.contractName && !!contract.contractId && contract.contractMoney !== '' && !!contract.payRate && !!contract.contractType && !!contract.contractJia && !!contract.contractYi);
            let hasPerformanceFile = JSON.parse(formValue.performanceFile)
                .every(performance => !!performance.payType && performance.percentOutputValue !== '');
            // let reg = new RegExp(',', 'g');
            let payables = formValue.receive.toString().replace(/,/g, '');
            payables = new XNCurrency(payables).value;

            let contractFile = JSON.parse(formValue.dealContract);
            let transferAll = JSON.parse(formValue.invoice);
            let alert = [];
            try {
                // if (pdfProjectFiles === '') {
                //     alert.push(`${alert.length + 1}、付款确认书文件未上传`);
                // }
                if (checkCertFile === '') {
                    alert.push(`${alert.length + 1}、查询证明文件未上传，`);
                }
                if (certificateFile === '') {
                    alert.push(`${alert.length + 1}、资质证明文件未上传，`);
                }
                if (registerCertFile === '') {
                    alert.push(`${alert.length + 1}、登记证明文件未上传`);
                }
                if (!hasDealContract) {
                    alert.push(`${alert.length + 1}、交易合同补录未完成，`);
                }
                if (!hasPerformanceFile) {
                    alert.push(`${alert.length + 1}、履约证明补录未完成，`);
                }
                if (isAddFiles === '') {
                    alert.push(`${alert.length + 1}、未确定是否需要后补资料，`);
                }
                let transferAmount = new XNCurrency(0);
                transferAll.forEach(x => {
                    transferAmount = transferAmount.add(x.transferMoney);
                });
                if (transferAmount.value !== payables) {
                    alert.push(`${alert.length + 1}、发票转让金额总和${transferAmount.value}不等于应收账款金额${payables}`);
                }
                let contractAmount = new XNCurrency(0);
                contractFile.forEach(x => {
                    contractAmount = contractAmount.add(x.contractMoney);
                });
                console.info('contractFile===>', contractFile[0]);
                if (contractFile[0].contractFile === '') {
                    alert.push(`${alert.length + 1}、交易合同文件未上传`);
                }
                if (payables > contractAmount.value) {
                    alert.push(`${alert.length + 1}、合同金额${contractAmount.value}小于应收账款金额${payables}`);
                }
                if (alert.length > 0) {
                    alert[alert.length - 1] = alert[alert.length - 1] + '，无法提交';
                    this.xn.msgBox.open(false, alert);
                    return Observable.of({
                        action: 'vankestop',

                    });
                } else {
                    return Observable.of(null);
                }
            } catch (e) {

            }

            //  return Observable.of(null);

        } else {
            return Observable.of(null);
        }
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
