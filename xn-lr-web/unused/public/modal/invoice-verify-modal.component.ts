import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ModalComponent} from '../../../src/app/common/modal/components/modal';
import {XnService} from '../../../src/app/services/xn.service';
import {InvoiceUtils} from '../../../src/app/common/invoice-utils';

/**
 * 发票验证的模态框
 */
@Component({
    templateUrl: './invoice-verify-modal.component.html',
    styles: []
})
export class InvoiceVerifyModalComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;

    private observer: any;
    private observable: any;
    private xn: XnService;

    disabled: boolean;
    errorMsg: string = '';

    private processing: boolean;

    private invoice: any; // 传过来的发票信息
    private checker: any; // 获得的验证码信息

    private input: any;
    private memo: any;
    private img: any;

    private validatorTitle: any;
    private validatorInput: any;
    private validatorMemo: any;

    constructor() {
    }

    ngOnInit() {
        this.input = $('.invoiceInput', this.modal.element.nativeElement);
        this.memo = $('.invoiceMemo', this.modal.element.nativeElement);
        this.img = $('.invoiceImg', this.modal.element.nativeElement);
        this.validatorTitle = $('.invoiceValidatorTitle', this.modal.element.nativeElement);
        this.validatorInput = $('.invoiceValidatorInput', this.modal.element.nativeElement);
        this.validatorMemo = $('.invoiceValidatorMemo', this.modal.element.nativeElement);

        this.observable = Observable.create(observer => {
            this.observer = observer;
        });
    }

    /**
     * 打开验证窗口
     * @param xn
     * @param invoice
     * @returns {any}
     */
    open(xn: XnService, invoice: any): Observable<string> {
        this.xn = xn;
        this.invoice = invoice;

        this.showAdditionalValidator();
        this.refresh();
        this.modal.open();
        return this.observable;
    }

    /**
     * 计算并显示附加检查项
     */
    private showAdditionalValidator() {
        let validator = InvoiceUtils.getAdditionalValidator(this.invoice.invoiceCode);
        this.validatorTitle.text(validator.title);
        this.validatorMemo.html(validator.memo);
        this.validatorInput.val('');
    }

    /**
     * 刷新验证码
     */
    refresh() {
        // 请求验证码
        this.processing = true;
        this.calcDisabled();

        // let mock = {
        //     data: {
        //         callback: 'jQuery110205547805978594578_1491893835290',
        //         imgByte: 'data:image/png;base64,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',
        //         privateKey: 'c596fafcadf7a8f082b9e115a9ac0411',
        //         queryTime: 1498821461000,
        //         type: '03'
        //     }
        // };
        // Observable.of(mock).subscribe((json) => {
        let params: any = {
            invoiceCode: this.invoice.invoiceCode
        };
        this.xn.api.post('/third/invoice_vft', params).subscribe(json => {
            console.log('invoice_vft', json);

            this.input.val('');
            this.errorMsg = '';
            this.processing = false;
            this.calcDisabled();

            this.checker = json.data;
            this.memo.html(InvoiceUtils.getVcodeMemo(json.data.type));
            this.img.attr('src', json.data.imgByte);
        });
    }

    onInputChange() {
        this.errorMsg = '';
        this.calcDisabled();
    }

    private calcDisabled() {
        this.disabled = this.processing || (this.input.val().length === 0) || (this.validatorInput.val().length === 0);
    }

    private close(value: string) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }

    onOk() {
        //
        this.processing = true;
        this.calcDisabled();

        // 调接口去验证
        let params: any = {
            invoiceCode: this.invoice.invoiceCode, // 发票代码
            invoiceNum: this.invoice.invoiceNum, // 发票号码
            invoiceDate: this.invoice.invoiceDate, // 发票日期 YYYYMMDD
            callback: this.checker.callback, // 获取验证码时的 callback
            privateKey: this.checker.privateKey, // 获取验证码时的 privateKey
            queryTime: this.checker.queryTime, // 获取验证码时的 queryTime
            validationString: this.input.val(), // 验证码字符串
            invoiceAmount: this.validatorInput.val() // 根据type选定的字符串，开具金额，校验码后6位等
        };
        console.log('params', params);

        // 先自己检查下，避免无谓的错误使税务局网站封我们IP
        let retVerify = InvoiceUtils.verifyAdditionalValidator(params.invoiceCode, params.invoiceAmount);
        if (!retVerify) {
            let validator = InvoiceUtils.getAdditionalValidator(params.invoiceCode);
            this.processing = false;
            this.errorMsg = validator.error;
        }
        else {
            this.errorMsg = '';

            this.processing = false;
            this.close('ok');

            // this.xn.api.post('/third/invoice_check', params).subscribe(json => {
            //     console.log('invoice_check', json);
            //     if (json.ret === 0) {
            //         this.close('ok');
            //     }
            //     else {
            //         // 验证失败
            //     }
            // });
        }
    }
}
