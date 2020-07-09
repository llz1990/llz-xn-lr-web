/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：invoice-edit-modal.component
 * @summary：补充发票信息，两票一合同
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          补充发票信息      2019-03-22
 *                                       文件显示修改
 * **********************************************************************
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent, ModalSize } from '../../common/modal/components/modal';
import { Observable } from 'rxjs/Observable';
import { XnService } from '../../services/xn.service';
import { InvoiceUtils } from '../../common/invoice-utils';
import { XnUtils } from '../../common/xn-utils';
import { setTimeout } from 'core-js/library/web/timers';
import { PdfViewService } from '../../services/pdf-view.service';

@Component({
    templateUrl: './invoice-edit-modal.component.html',
    styleUrls: ['./invoice-view-modal.component.css'],
    providers: [
        PdfViewService
    ]
})
export class InvoiceEditModalComponent implements OnInit {
    @ViewChild('modal')
    private modal: ModalComponent;
    @ViewChild('dateInput')
    public dateInput: ElementRef;

    @ViewChild('innerImg')
    public innerImg: ElementRef;
    @ViewChild('outerImg')
    public outerImg: ElementRef;
    @ViewChild('imgContainer')
    public imgContainer: ElementRef;
    // 按钮状态控制
    public disabled: boolean;
    public errorMsg = '';
    public dateCheckTemp = false;
    public dateAlert: any;
    public isProduction = true;
    // 默认存在发票
    public isInvoice = true;
    public fileImg: any; // 发票图像
    private degree = 0;
    public params: any;
    public status: any;
    public fileSrc: string;
    // 流程
    public fileId: string; // 传过来的发票图像信息fileId
    private observer: any;
    private observable: any;
    private processing: boolean;
    private fpdm: any; // 发票代码
    private fphm: any; // 发票号码
    private kprq: any; // 开票日期
    private kpje: any; // 开票金额及其他可能的校验信息
    private sdje: any; // 手动输入金额

    private kpjeLable: any; //
    private kpjeMemo: any;

    // 没有图片id 不可以进行图片验证
    public imgVerStatus = true;
    public hsMoneyShow = false;

    public jindieDetail: any;
    private currentScale: number = .6;

    constructor(private xn: XnService, private pdfViewService: PdfViewService) {
        this.isProduction = this.xn.user.env === 'production';

    }

    ngOnInit() {
        this.isInvoice = parseInt(this.xn.user.isInvoice, 10) === 1;
        console.log(': this.xn.user.isInvoice: ', this.isInvoice);
        // 获取页面dom元素
        this.fpdm = $('input[name="fpdm"]', this.modal.element.nativeElement);
        this.fphm = $('input[name="fphm"]', this.modal.element.nativeElement);
        this.kprq = $('input[name="kprq"]', this.modal.element.nativeElement);
        this.fileImg = $('.this-img', this.modal.element.nativeElement);

        this.observable = Observable.create(observer => {
            this.observer = observer;
        });
    }

    /**
     * 打开验证窗口
     * @param params
     * @returns {any}
     */
    open(params: any): Observable<any> {
        console.log('打开模态框带入的发票信息params: ', params);
        this.params = params;

        this.fileId = params.fileId;
        if (!!this.fileId) {
            this.imgVerStatus = false;
        }

        this.fpdm.val(params.invoiceCode || '');
        this.fphm.val(params.invoiceNum || '');
        this.kprq.val(params.invoiceDate || '');
        this.disabled = true;
        this.processing = false;
        // 如果发票代码不为空
        if (this.fpdm.val !== '') {
            this.onFpdmChange();
        }

        // 如果是批量上传的excel，则不能编辑
        this.disableExcelData(params);
        // 详细信息
        this.showJdDetail(params.invoiceNum, params.invoiceCode);
        // 发票地址
        this.fileSrc = params.fileId !== '' ? '/api/attachment/view?key=' + this.fileId : '';

        this.modal.open(ModalSize.XLarge);
        return this.observable;
    }

    /**
     * 发票代码有变化时
     */
    public onFpdmChange() {
        if (!this.isInvoice) {
            this.sdje = $('input[name="sdje"]', this.modal.element.nativeElement);
            return;
        }

        this.onInputChange();
        console.log('发票代码this.fpdm.val(): ', this.fpdm.val());
        if (InvoiceUtils.isValidInvoiceCode(this.fpdm.val())) {
            setTimeout(() => {
                this.kpje = $('input[name="kpje"]', this.modal.element.nativeElement);

                this.kpjeLable = $('.kpje-label', this.modal.element.nativeElement);
                this.kpjeMemo = $('.kpje-memo', this.modal.element.nativeElement);

                this.showAdditionalValidator();
            }, 0);
        }
    }

    /**
     * 输入改变时
     */
    public onInputChange() {
        this.errorMsg = '';
        if (!this.isInvoice) {
            this.personCalcDisabled();
        } else {
            this.calcDisabled();
        }
    }

    public onOk() {
        this.processing = true;
        this.calcDisabled();

        // 检查重复发票号码
        const repeatChecked = this.repeatCheck(this.fphm.val(), this.params);
        if (!repeatChecked) {
            return;
        }
        // 判断是金额或校验码
        const valid = InvoiceUtils.getAdditionalValidator(this.fpdm.val());
        // 调接口去验证
        let params: any;
        let retVerify: boolean;
        if (valid.number === '11') {
            params = {
                invoiceCode: this.fpdm.val(), // 发票代码
                invoiceNum: this.fphm.val(), // 发票号码
                invoiceDate: this.kprq.val(), // 发票日期 YYYYMMDD
                invoiceTypeString: this.kpje.val() && this.kpje.val().replace(/\s/g, ''), // 根据type选定的字符串，开具金额，校验码后6位等
                invoiceAmount: '',
            };
            // 先自己检查下，避免无谓的错误使税务局网站封我们IP
            retVerify = InvoiceUtils.verifyAdditionalValidator(params.invoiceCode,
                params && params.invoiceTypeString && params.invoiceTypeString.replace(/\s/g, ''));
        } else {
            params = {
                invoiceCode: this.fpdm.val(), // 发票代码
                invoiceNum: this.fphm.val(), // 发票号码
                invoiceDate: this.kprq.val(), // 发票日期 YYYYMMDD
                invoiceAmount: this.kpje.val() && this.kpje.val().replace(/\s/g, ''), // 根据type选定的字符串，开具金额，校验码后6位等
            };
            retVerify = InvoiceUtils.verifyAdditionalValidator(params.invoiceCode,
                params && params.invoiceAmount && params.invoiceAmount.replace(/\s/g, ''));
        }
        console.log('params', params);
        if (!retVerify) {
            const validator = InvoiceUtils.getAdditionalValidator(params.invoiceCode);
            this.processing = false;
            this.errorMsg = validator.error;
        } else {
            this.errorMsg = '';

            this.processing = false;
            // 发票验证
            this.xn.api.postMap('/ljx/invoice/invoice_check', params).subscribe(json => {
                console.log('发票验证返回信息invoice_check', json);
                console.log(json.data);
                if (json.ret === 0) {
                    if (json.data.type === 'single') {  // 老发票验证
                        const invoiceResult = InvoiceUtils.handleInvoideResponse(json.data.data);
                        this.xn.msgBox.open(false, '发票验证成功', () => {
                            this.xn.api.post('/custom/invoice/invoice/invoice_check', {
                                invoiceNum: params.invoiceNum ,
                                invoiceCode: params.invoiceCode
                            }).subscribe(x => {
                                this.close({
                                    action: 'ok',
                                    invoiceCode: params.invoiceCode,
                                    invoiceNum: params.invoiceNum,
                                    invoiceDate: params.invoiceDate,
                                    invoiceAmount: invoiceResult.invoiceAmount,
                                    status: x.data.status || 1,
                                    fileId: this.fileId,
                                });
                            });
                        });
                    } else if (json.data.type === 'jindie') { // 金蝶验证
                        this.xn.msgBox.open(false, '发票验证成功', () => {
                            this.close({
                                action: 'ok',
                                invoiceCode: json.data.data.invoiceCode,
                                invoiceNum: json.data.data.invoiceNum,
                                invoiceDate: json.data.data.invoiceDate,
                                invoiceAmount: json.data.data.invoiceAmount,
                                status: json.data.data.status, // 1表示验证成功
                                fileId: this.fileId,
                            });
                        });
                    }

                } else {
                    // 验证失败
                    this.status = 2;
                    const html = `
                        <dl>
                          <!--<dt>${json.msg}</dt>-->
                          <dt>录入的发票信息可能有误，请检查所录入的发票信息是否正确：</dt>
                          <dd>1、正确，开启人工审核</dd>
                          <dd>2、错误，修正录入的信息后，再次点击“去验证发票”进行验证。</dd>
                        </dl>
                    `;
                    this.xn.msgBox.open(false, [html]);
                    return;
                }
            });
        }
    }

    /**
     *  金蝶 图片验证
     */
    public imageVerification() {
        const params = { fileId: this.fileId };
        this.xn.api.post('/ljx/invoice/invoice_checkocr', params).subscribe(x => {
            if (x.ret === 0) {
                this.xn.msgBox.open(false, '发票验证成功', () => {
                    this.close({
                        action: 'ok',
                        invoiceCode: x.data.data.invoiceCode,
                        invoiceNum: x.data.data.invoiceNum,
                        invoiceDate: x.data.data.invoiceDate,
                        invoiceAmount: x.data.data.invoiceAmount,
                        status: x.data.data.status, // 1表示验证成功
                        fileId: this.fileId,
                    });
                });
            } else {
                // 验证失败
                this.status = 2;
                this.xn.msgBox.open(false, '发票验证失败');
                return;
            }
        });
    }

    public onCancel() {
        console.log('cancel: ', this.status);
        this.xn.api.post('/custom/invoice/invoice/invoice_check', {
            invoiceNum: this.fphm.val(),
            invoiceCode: this.fpdm.val()
        })
            .subscribe(x => {
                this.close({
                    invoiceNum: this.fphm.val(),
                    status: x.data.status || 1,
                    action: 'cancel'
                });
            });
    }

    /**
     * 人工审核-添加人工审核状态
     */
    public onTest() {
        // 检查重复发票号码
        const repeatChecked = this.repeatCheck(this.fphm.val(), this.params);
        if (!repeatChecked) {
            return;
        }
        this.xn.api.post('/custom/invoice/invoice/invoice_check', {
            invoiceNum: this.fphm.val(),
            invoiceCode: this.fpdm.val()
        })
            .subscribe(x => {
                this.close({
                    action: 'ok',
                    tag: x.data && x.data.status && x.data.status === 1 ? 'artificial' : '', // 人工验证标记  如果重复则显示重复，无则显示人工验证
                    status: x.data.status || 1,
                    invoiceCode: this.fpdm.val(), // 发票代码
                    invoiceNum: this.fphm.val(), // 发票号码
                    invoiceDate: this.kprq.val(), // 发票日期 YYYYMMDD
                    invoiceAmount: this.sdje.val(), // params.invoiceAmount,  // test
                    fileId: this.fileId,
                });
            });
    }

    /**
     *  文件旋转
     * @param val 旋转方向 left:左转，right:右转
     */
    public rotateImg(val) {
        if (this.innerImg && this.innerImg.nativeElement
            && this.outerImg && this.outerImg.nativeElement
            && this.imgContainer && this.imgContainer.nativeElement
        ) {
            this.degree = this.pdfViewService.rotateImg(val, this.degree,
                this.innerImg.nativeElement, this.outerImg.nativeElement, this.imgContainer.nativeElement, this.currentScale);
        }
    }


    /**
     *  文件缩放
     * @param params 放大缩小  large:放大，small:缩小
     */
    public scaleImg(params: string) {
        if (this.innerImg && this.innerImg.nativeElement
            && this.outerImg && this.outerImg.nativeElement
            && this.imgContainer && this.imgContainer.nativeElement
        ) {
            // 缩放图片
            this.currentScale = this.pdfViewService.scaleImg(params,
                this.innerImg.nativeElement, this.outerImg.nativeElement, this.imgContainer.nativeElement);
        }
    }

    /**
     * 日期输入格式验证
     */
    public onDateInput() {
        this.dateCheck(this.kprq.val());
    }

    private dateCheck(date) {
        if (!date) {
            return;
        }
        this.dateCheckTemp = XnUtils.toDateFromString(date);
        if (!this.dateCheckTemp) {
            $(this.dateInput.nativeElement).addClass('not-invalid');
            this.dateAlert = '很抱歉，您需要输入格式为20170731的日期';
        } else {
            $(this.dateInput.nativeElement).removeClass('not-invalid');
            this.dateAlert = '';
        }
    }

    /**
     *  检查发票代码
     * @param fphm
     * @param params
     */
    private repeatCheck(fphm, params): boolean {

        for (const temp of params.temps) {
            if (Number(temp.invoiceNum) === Number(fphm)) {
                this.xn.msgBox.open(false, `发票号码(${temp.invoiceNum})重复了，请您检查`);
                return false;
            }
        }
        return true;
    }

    /**
     * 显示金蝶验证详情
     * @param val
     */
    private showJdDetail(val: string, valCode: any) {
        if (!!val) {
            this.xn.api.post('/ljx/invoice/invoice_message', { invoiceNum: val , invoiceCode: valCode}).subscribe(x => {
                console.log('金蝶验证详情', x);
                this.jindieDetail = x.data;
            });
        }
    }

    private filterUndefined(params): string {
        return !!params && params !== 'undefined' ? params : '';
    }


    private disableExcelData(params) {
        if (params.invoiceCode
            && params.invoiceNum
            && params.invoiceDate
            && params.invoicePretaxAmount
            && params.invoicePosttaxAmount
            && params.invoicePosttaxAmount !== 'undefined'
            && params.invoicePretaxAmount !== 'undefined'
            && params.invoiceTypeString) {
            this.fpdm.attr('disabled', true);
            this.fphm.attr('disabled', true);
            this.kprq.attr('disabled', true);
        }
    }

    /**
     * 计算并显示附加检查项
     */
    private showAdditionalValidator() {
        const validator = InvoiceUtils.getAdditionalValidator(this.fpdm.val());
        this.kpjeLable.html('<span class="required-label">*</span>' + validator.title);
        this.kpjeMemo.html(validator.memo);
        switch (validator.number) {
            case '00':
                this.kpje.val(this.filterUndefined(this.params.invoicePosttaxAmount));
                break;  // 发票开具金额(税后)
            case '01':
                this.kpje.val(this.filterUndefined(this.params.invoicePretaxAmount));
                break; // 发票开具金额(税前)
            case '02':
                this.kpje.val(this.filterUndefined(this.params.invoicePosttaxAmount));
                break; // 发票开具金额(税后)
            case '03':
                this.kpje.val(this.filterUndefined(this.params.invoicePretaxAmount));
                break; // 发票开具金额(税前)
            case '11':
                this.kpje.val(this.params.invoiceTypeString || '');
                break; // 发票校验码
            default:
                this.kpje.val('');
                break;
        }
        if (this.kpje.val() !== '') {
            this.kpje.attr('disabled', true);
        }
    }

    private calcDisabled() {
        this.disabled = !(this.processing
            || InvoiceUtils.isValidInvoiceCode(this.fpdm && this.fpdm.val())
            && (this.fphm && this.fphm.val() && this.fphm.val().length !== 0)
            && (this.kprq && this.kprq.val() && this.kprq.val().length !== 0)
            && (this.kpje && this.kpje.val() && this.kpje.val().length !== 0));
    }

    // 人工审核状态
    private personCalcDisabled() {
        this.disabled = !(this.processing
            || InvoiceUtils.isValidInvoiceCode(this.fpdm && this.fpdm.val())
            && (this.fphm && this.fphm.val() && this.fphm.val().length !== 0)
            && (this.kprq && this.kprq.val() && this.kprq.val().length !== 0)
            && (this.sdje && this.sdje.val() && this.sdje.val().length !== 0));
    }

    private close(value) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }
}
