/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：picker-input.component.ts
 * @summary：列表选择项   type = 'picker'
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-04-22
 * **********************************************************************
 */

import { Component, OnInit, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { DynamicForm } from '../../dynamic.decorators';
import { XnService } from '../../../../services/xn.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { PublicCommunicateService } from '../../../../services/public-communicate.service';
import { XnUtils } from '../../../xn-utils';
import { DataTablePicker } from '../../../data-table-picker';
import { EnterpriseTypeEnum } from '../../../../config/enum/enterprise-enum';
import { XnFormUtils } from '../../../xn-form-utils';
import { XnModalUtils } from '../../../xn-modal-utils';
import { VankeAddAgencyModalComponent } from '../../../../modules/dragon/share/modal/vanke-addAgency.modal.component';


@Component({
    selector: 'xn-avenger-picker-input-component',
    templateUrl: './picker-input.component.html',
    styles: [
        `.picker-row {
            background-color: #ffffff
        }

        .form-control button:focus {
            outline: none
        }

        .xn-picker-label {
            display: inline-block;
            max-width: 95%
        }

        .span-disabled {
            background-color: #eee
        }

        .input-class {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 6px 10px;
            border: 0;
        }

        .inMemo {
            padding: 5px 0px;
            color: #f20000
        }`
    ]
})
@DynamicForm({ type: 'picker', formModule: 'default-input' })
export class VankePickerInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @ViewChild('input') input: ElementRef;

    label;
    myClass = '';
    labelClass = '';
    alert = '';
    showClearBtn = false;
    ctrl: AbstractControl;
    ctrlChange: AbstractControl;
    lv: AbstractControl;
    xnOptions: XnInputOptions;
    pickerObj: any;
    isCard = false;
    isArray = false;
    inMemo = '';
    changeGetNewDataApi = '';

    constructor(private xn: XnService, private er: ElementRef,
        private localStorageService: LocalStorageService,
        private publicCommunicateService: PublicCommunicateService,
        private vcr: ViewContainerRef,) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.ctrl.statusChanges.subscribe(status => {
        });
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    public onPicker() {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, VankeAddAgencyModalComponent, {})
            .subscribe((v) => {

                if (v === null) {
                    return;
                } else {

                }
            });

    }


    private calcAlertClass() {
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.labelClass = this.ctrl.disabled ? 'span-disabled' : '';
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    onBlur(): void {
        this.calcAlertClass();
    }
}
