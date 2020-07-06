import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import {XnFormUtils} from '../../common/xn-form-utils';
import {XnInputOptions} from './xn-input.options';

@Component({
    selector: 'xn-radio-input',
    templateUrl: './radio-input.component.html',
    styles: [
            `.xn-radio-row {
            padding-top: 7px;
        }`,
            `.xn-radio-row label {
            font-weight: normal;
            margin: 0 10px;
        }`,
            `.xn-radio-row button:focus {
            outline: none
        }`, // 去掉点击后产生的边框
    ]
})
export class RadioInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    myClass: string = '';
    alert: string = '';
    showClearBtn: boolean = false;
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;

    constructor(private er: ElementRef) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.calcAlertClass();

        this.ctrl.valueChanges.subscribe(v => {
            this.showClearBtn = true;
            this.calcAlertClass();
        });
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    private calcAlertClass() {
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    onClear() {
        this.showClearBtn = false;
        this.ctrl.setValue(null);

    }
}
