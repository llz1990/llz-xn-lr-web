
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：profit-table-input.component.ts
 * @summary： 账号变更
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                    wq             增加             2020-02-14
 * **********************************************************************
 */

import { Component, ElementRef, Input, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { XnService } from '../../../../../../services/xn.service';
import { SelectOptions } from '../../../../../../config/select-options';
import { XnUtils } from '../../../../../../common/xn-utils';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { DragonChoseAccountinfoComponent } from '../../../modal/dragon-chose-accountinfo.modal';
import { PublicCommunicateService } from '../../../../../../services/public-communicate.service';



@Component({
    selector: 'vanke-compare-info-component',
    templateUrl: './vanke-compare-info.component.html',
    styles: [
        `
            .button-reset-style {
                font-size: 12px;
                padding: 5px 35px;
                color: #3c8dbc;
            }

            .tip-memo {
                color: #9A9A9A;
            }
            .tag-color {
                color: #f20000;;
            }
            .noneborder  td{
                width: 700px;
                padding-top: 8px;
                padding: 8px;
                line-height: 1.42857143;
                vertical-align: top;
            }
            .noneborder th{
                width: 700px;
                padding-top: 8px;
                padding: 8px;
                line-height: 1.42857143;
                vertical-align: top;
            }
            .required-star:after {
                content: '*';
                color: red;
            }
            .table-height {
                max-height: 600px;
                overflow: scroll;
            }

        `
    ]
})
@DynamicForm({
    type: [
        'compare-info',
    ], formModule: 'dragon-input'
})
export class VankechangeAccountComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    public alert = ''; // 提示
    public alert1 = ''; // 提示
    public ctrl: AbstractControl;
    public ctrl1: AbstractControl;

    public xnOptions: XnInputOptions;
    public certificateitem: any; // 获取合同信息
    public Tabconfig: any;
    currentTab: any; // 当前标签页
    data: any[] = [];
    datavalue: any;
    selectOptions: any[] = [];
    selectValue: string = '';
    // 判断是否是excel格式
    isExcel = false;
    successnum: number;
    failnum: number;
    // 批量验证按钮状态
    // 全选按钮控制状态
    public unfill = false;
    headLeft = 0;

    constructor(private xn: XnService,
        private er: ElementRef,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private publicCommunicateService: PublicCommunicateService,
    ) {
    }

    public ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.ctrl1 = this.form.get('tripleAgreement');
        this.selectOptions = SelectOptions.get('changeReason');
        this.datavalue = JSON.parse(this.row.value);
        this.fromValue();

    }

    private fromValue() {
        this.datavalue = XnUtils.parseObject(this.ctrl.value, []);
        this.toValue();
    }
    // 上传完后取回值
    private toValue() {
        let isOk = [this.datavalue.new].some(val=> val['receiveOrg']!=='' && val['receiveAccount']!=='' && val['receiveBank']!=='');
        this.alert1 = this.datavalue.changeReason !==''?'':'请选择变更原因';
        if(isOk && this.datavalue.changeReason !==''){
            this.ctrl.setValue(JSON.stringify(this.datavalue));
        }else{
            this.ctrl.setValue('');
        }
        this.ctrl.markAsTouched();
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    public inputChange(e) {
        this.datavalue.changeReason = e.target.value;
        this.publicCommunicateService.change.emit(e.target.value);
        this.toValue();
    }
    public onBlur() {
        // if (this.datavalue.receiveOrg === '' || this.datavalue.receiveAccount === ''
        //     || this.datavalue.receiveBank === '' || this.datavalue.receiveBankNo === '') {
        //     this.datavalue = XnUtils.parseObject(this.ctrl.value, []);

        // } else {
        //     //this.toValue();
        // }
    }
    /**
    * 计算表格合并项
    * currentSubTab.headText.length + 可选择1 + 序号1 + 行操作+1
    */
    public calcAttrColspan(tabconfig): number {
        let nums: number = tabconfig.headText.length + 1;
        return nums;
    }

    // 选择收款账户
    handleAdd() {
        if(!this.datavalue.changeReason){
            this.alert1 = '请选择变更原因';
            return ;
        }
        this.alert1 = '';
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonChoseAccountinfoComponent, {})
            .subscribe(v => {
                if (!v || v === null || !v.length) {
                    return;
                } else {
                    this.datavalue.new.receiveOrg = v[0].accountName;
                    this.datavalue.new.receiveAccount = v[0].cardCode;
                    this.datavalue.new.receiveBank = v[0].bankName;
                    this.datavalue.new.receiveBankNo = v[0].bankCode;
                    // this.datavalue.new.bankId = v[0].bankCode;
                    this.toValue();
                    this.cdr.markForCheck();
                }
            });
    }
}
