/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：contract-input.component.ts
 * @summary：合同文件
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-04-22
 * **********************************************************************
 */
import 'rxjs/add/observable/of';
import { XnService } from '../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import { IFlowCustom } from '../flow-custom';
import { LoadingService } from '../../../services/loading.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import * as lodashall from 'lodash';
import { CalendarData } from '../../../config/calendar';
import { XnUtils } from '../../../common/xn-utils';
import { AvengeruploadErrorInfoComponent } from '../../shared/components/modal/avenger-upload-errorinfo.modal';
declare const moment: any;

export class Financing500 implements IFlowCustom {
    vanke = {
        contract: '',
        invoiceticket: '',
    };
    upstream = {
        contract: '',
        invoiceticket: '',
    };
    constructor(private xn: XnService, private loading: LoadingService, private localservice: LocalStorageService, ) {
    }

    preShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {//供应商
        if (svrConfig.procedure.procedureId === '@begin') {
            let datalist = Number(formValue.receiveDate.replace(/-/g, ''));
            let addday = Number(JSON.parse(svrConfig.checkers[0].value)[4].value);
            let controlday = this.calcDate(datalist, moment().format('YYYY-MM-DD'), addday);
            if (controlday) {
                this.xn.msgBox.open(false, '保理融资到期日大于融资期限范围，无法提交');
                return Observable.of({ action: 'stop' });
            } else {
                if (svrConfig.record && svrConfig.record.mainFlowId !== '') {
                    let params: any = {
                        mainFlowId: svrConfig.record.mainFlowId,
                    };
                    return this.xn.avenger.post('/apply/applyInfo/compare', params).map(x => {
                        if (x.data) {
                            this.vanke.contract = x.data.supplierContract;
                            this.vanke.invoiceticket = x.data.supplierInvoice;
                            this.upstream.invoiceticket = x.data.upstreamInvoice;
                            this.upstream.contract = x.data.upstreamContract;
                            let contractarray = lodashall.intersection(this.vanke.contract, this.upstream.contract);
                            let invoicefit = lodashall.intersection(this.vanke.invoiceticket, this.upstream.invoiceticket);
                            if (contractarray.length === 0 || invoicefit.length === 0 ||
                                this.vanke.contract.length !== this.upstream.contract.length
                                || this.vanke.invoiceticket.length !== this.upstream.invoiceticket.length
                                || contractarray.length !== this.vanke.contract.length
                                || contractarray.length !== this.upstream.contract.length
                                || invoicefit.length !== this.vanke.invoiceticket.length
                                || invoicefit.length !== this.upstream.invoiceticket.length) {// 判断上游客户与供应商发票号或者合同号是否相等
                                return {
                                    action: 'modal',
                                    modal: AvengeruploadErrorInfoComponent,
                                    params: { vanke: this.vanke, upstream: this.upstream }
                                };
                            } else {
                                return Observable.of(null);
                            }
                        }
                    });
                } else {
                    return Observable.of(null);

                }
            }
        } else {
            return Observable.of(null);

        }

    }


    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '供应商发起申请'
        };
    }
    replaceStr(str): string {
        return str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    private calcDate(currentday, current, add) {
        let date1 = 0;
        CalendarData.getAllDate().subscribe(y => {
            // y 2018年所有假期
            const find = y.find(day => new Date(this.replaceStr(day.dateTime)).getTime() === new Date(current).getTime());
            date1 = parseInt(XnUtils.dateSalculate(1 + find.extended + add, current, 1).replace(/-/g, ''));
            //return date1.replace('-', '');
        });
        if (currentday > date1) {
            return true;
        } else {
            return false;
        }

    }
}
