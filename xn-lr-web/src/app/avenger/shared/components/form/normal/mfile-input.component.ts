import { OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：AvengerMFileInputComponent
 * @summary：文件上传，批量 type = 'mfile'
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-04-22
 * **********************************************************************
 */

import {
    Component,
    Input,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../../../../common/dynamic-form/dynamic.decorators';
import { XnInputOptions } from '../../../../../public/form/xn-input.options';
import { PublicCommunicateService } from '../../../../../services/public-communicate.service';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';

declare let $: any;

@Component({
    selector: 'xn-avenger-mfile-input-component',
    template: `
        <app-xn-mfile-input [row]="row" [form]="form" [svrConfig]='svrConfig'></app-xn-mfile-input>
        `
})
@DynamicForm({ type: 'mfile', formModule: 'avenger-input' })
export class AvengerMFileInputComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    public ctrl: AbstractControl;
    public ctrl1: AbstractControl;
    public xnOptions: XnInputOptions;

    constructor(
        private er: ElementRef,
        private cdr: ChangeDetectorRef,
        private publicCommunicateService: PublicCommunicateService) {
    }
    ngOnInit(): void {
        this.ctrl = this.form.get(this.row.name);
        if (this.row.name === 'tripleAgreement') {
            this.ctrl1 = this.form.get('debtCompare');
            if (!!this.ctrl1 && !!this.ctrl1.value && JSON.parse(this.ctrl1.value).changeReason === '5') {
                this.showRow();
            } else {
                this.hideRow();
            }
            this.publicCommunicateService.change.subscribe(x => {
                if (this.row.name === 'tripleAgreement' && x === '5') {
                    this.row.required = true;
                    this.ctrl.setErrors({ 'required': true });
                    this.showRow();
                } else if (this.row.name === 'tripleAgreement') {
                    this.row.required = false;
                    this.ctrl.setErrors({ 'required': false });
                    this.hideRow();
                }
                this.ctrl.updateValueAndValidity();
                this.cdr.markForCheck();
            });
        }

        this.row = { ...this.row, isAvenger: true };
    }
    private showRow(): void {
        $(this.er.nativeElement).parents('.form-group').show();
        if (!this.row.options.readonly) {
            this.ctrl.enable({ onlySelf: false, emitEvent: true });
            this.ctrl.updateValueAndValidity();
        }
    }

    private hideRow(): void {
        $(this.er.nativeElement).parents('.form-group').hide();
        if (!this.row.options.readonly) {
            this.ctrl.disable();
        }
    }
}
