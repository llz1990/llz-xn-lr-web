import { Component, OnInit, ElementRef, Input, ChangeDetectionStrategy, ViewChild, AfterViewChecked } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { DynamicForm } from '../../dynamic.decorators';
import { XnFormUtils } from '../../../xn-form-utils';
import { XnUtils } from '../../../xn-utils';


@Component({
    template: `
    <div [formGroup]="form">
    <input #input class="form-control xn-input-font xn-input-border-radius"  style='display:inline;width:99%' type="text"
    autocomplete="off" readonly [value]="label">
   <span style='display: block;
   width: 1%;float: right;font-weight:200;padding-top:5px'>%</span>
 </div>
    `,

})
// 查看二维码checker项
@DynamicForm({ type: 'text-rate', formModule: 'default-show' })
export class VankeTextRateShowComponent implements  OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    label: any;

    constructor() {
    }

    ngOnInit() {
        this.label = this.row.data;
    }
}
