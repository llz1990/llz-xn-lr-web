import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import { DynamicForm } from '../../dynamic.decorators';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { XnFormUtils } from '../../../xn-form-utils';
import { ConsoleRoutingModule } from '../../../../pages/console/console-routing.module';

@Component({
    templateUrl: './textarea-files.component.html',
    styles: [
        `.label-files{
            color:#9d9b9b;
            font-size: 11px;
        }
        `
    ]
})
@DynamicForm({ type: 'supplier-text', formModule: 'default-input' })
export class TextareaFilesComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    myClass: string = '';
    alert: string = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;
    newRow: any;
    supplierCount: string = '';
    showP: boolean = true;

    constructor(private er: ElementRef) {
    }

    ngOnInit() {
        if (!this.row.placeholder) {
            this.row.placeholder = '';
        }
        this.newRow = this.row.value ? JSON.parse(this.row.value):[];
        if(this.newRow && this.newRow.length){
            this.supplierCount = `共${this.newRow.length}个供应商`;
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
