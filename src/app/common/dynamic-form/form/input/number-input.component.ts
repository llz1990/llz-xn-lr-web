import { ChangeDetectionStrategy, Component, OnInit, Input, ElementRef, ViewChild, OnChanges, AfterViewChecked } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { AmountControlCommService } from '../../../../pages/console/risk-control/transaction-control/amount/amount-control-comm.service';
import { XnFormUtils } from '../../../xn-form-utils';
import { DynamicForm } from '../../dynamic.decorators';
import { XnUtils } from '../../../xn-utils';

@Component({
    selector: 'vanke-number-input',
    templateUrl: './number-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `.inMemo {
            padding: 5px 0px;
            color: #f20000
        }
        .xn-money-alert {
            color: #8d4bbb;
            font-size: 12px;
        }
        `
    ]
})
@DynamicForm({ type: 'number-input', formModule: 'default-input' })
export class TextNumberInputComponent implements OnInit, AfterViewChecked {

    @Input() row: any;
    @Input() form: FormGroup;
    @ViewChild('input') input: ElementRef;
    @ViewChild('moneyAlertRef') moneyAlertRef: ElementRef;

    myClass = '';
    alert = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;
    inMemo = '';
    public ctrlWith = false; // 特殊属性

    constructor(private er: ElementRef, private amountControlCommService: AmountControlCommService) {
    }


    ngOnInit() {
        if (!this.row.placeholder) {
            this.row.placeholder = '';
            if (this.row.type === 'text' && this.row.value === 0) {
                this.row.placeholder = 0;
            }
        }
        this.inMemo = !!this.row.options && this.row.options !== '' && this.row.options.inMemo || '';
        this.ctrl = this.form.get(this.row.name);
        this.fromValue();
        this.ctrl.valueChanges.subscribe(v => {
            if (v === '') {
                return;
               // this.ctrl.setValue('');
            } else if (!!this.isNumber(v)) {
                this.moneyFormat(); // 将拉取到的数据进行money格式化
                this.calcAlertClass();
            }
        });
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    onBlur(event: any): void {
        if (!this.isNumber(event.target.value)) {
            this.ctrl.setValue('');
        } else {
        }
    }
    /**
       *  初始值
       */
    private fromValue() {
        if (!this.input.nativeElement.value && this.input.nativeElement.value !== '') {
            return;
        }
        this.input.nativeElement.value = this.ctrl.value;
        this.moneyFormat(); // 将拉取到的数据进行money格式化
        this.calcAlertClass();
        // this.toValue();
    }
    ngAfterViewChecked() {
        if (this.ctrl && !!this.ctrl.value && !this.input.nativeElement.value) {
            const a = setTimeout(() => {
                clearTimeout(a);
                this.fromValue();
                this.calcAlertClass();
                return;
            }, 0);
        }

        if (this.ctrlWith) {
            if (this.input.nativeElement.value === '') {
                setTimeout(() => {
                    if (this.input.nativeElement.value === '') {
                        this.alert = '';
                    }
                }, 0);
                return;
            }
            if (isNaN(parseInt(this.ctrl.value, 0)) && this.input.nativeElement.value !== '') {
                this.input.nativeElement.value = 0;
                const ret = XnUtils.convertCurrency(this.input.nativeElement.value);
                const a = setTimeout(() => {
                    this.alert = ret[1];
                    clearTimeout(a);
                    return;
                });
                return;
            }

            if (parseInt(this.ctrl.value, 0) !== parseInt(this.input.nativeElement.value.replace(/,/g, ''), 0)) {
                const a = setTimeout(() => {
                    clearTimeout(a);
                    this.fromValue();
                    this.calcAlertClass();
                    return;
                }, 0);
            }
        }
    }
    /**
      *  提示判断
      */
    private calcAlertClass(): void {
        this.input.nativeElement.disabled = this.ctrl.disabled;
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
        if (this.input.nativeElement.value) {
            const ret = XnUtils.convertCurrency(this.input.nativeElement.value);
            this.alert = ret[1];
            if (!ret[0]) {
                $(this.moneyAlertRef.nativeElement).addClass('red');
            } else {
                $(this.moneyAlertRef.nativeElement).removeClass('red');
            }
        }
    }
    isNumber(value) {
        let currentValue = this.ReceiveData(value);
        let y = String(currentValue).indexOf('.') + 1; // 获取小数点的位置
        let count = String(currentValue).length - y; // 获取小数点后的个数
        if (isNaN(currentValue)) {
            this.alert = '格式错误，请输入数字';
            return false;
        }
        if (y > 0 && count > 2) {
            this.alert = '格式错误，只保留两位小数';
            return false;
        }
        if (Number(currentValue) > 10000000000) {
            this.alert = `请输入0-${XnUtils.formatMoney(10000000000)}的数字`;
            return false;
        } else {
            return true;
        }
    }
    /**
     *  金额显示格式化，加千分位
     */
    private moneyFormat() {
        this.input.nativeElement.value = XnUtils.formatMoney(this.input.nativeElement.value);
    }
    // 计算应收账款转让金额
    public ReceiveData(item: any) {
        let tempValue = item.replace(/,/g, '');
        tempValue = parseFloat(tempValue).toFixed(2);
        return Number(tempValue);
    }

}
