import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import { DynamicForm } from '../../dynamic.decorators';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { XnFormUtils } from '../../../xn-form-utils';

@Component({
    templateUrl: './textarea-input.component.html',
    styles: [
        `.xn-input-textarea {resize: none}`
    ]
})
@DynamicForm({ type: 'textarea', formModule: 'default-input' })
export class TextareaInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    myClass: string = '';
    alert: string = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;

    constructor(private er: ElementRef) {
    }

    ngOnInit() {
        if (!this.row.placeholder) {
            this.row.placeholder = '';
        }

        this.ctrl = this.form.get(this.row.name);
        this.calcAlertClass();

        this.ctrl.valueChanges.subscribe(v => {
            this.calcAlertClass();
        });

        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    onBlur() {
        this.calcAlertClass();
    }

    calcAlertClass() {
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }
}
