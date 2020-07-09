/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：profit-table-input.component.ts
 * @summary：供应商首页经办
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                    wq             增加             2019-06-10
 * **********************************************************************
 */

import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnUtils } from '../../../../../common/xn-utils';
import { XnFormUtils } from '../../../../../common/xn-form-utils';
import { XnInputOptions } from '../../../../../public/form/xn-input.options';
import { XnService } from '../../../../../services/xn.service';
import AvengerFormTable from './avenger-table';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';
import { EditModalComponent, EditParamInputModel } from '../../modal/edit-modal.component';
import { CheckersOutputModel } from '../../../../../config/checkers';
import { MfilesViewModalComponent } from '../../../../../public/modal/mfiles-view-modal.component';
import { JsonTransForm } from '../../../../../public/pipe/xn-json.pipe';
import { AvengeraddContractModalComponent } from '../../modal/avenger-contract-write.modal';
import { DynamicForm } from '../../../../../common/dynamic-form/dynamic.decorators';
import { LocalStorageService } from '../../../../../services/local-storage.service';
import { SelectOptions } from '../../../../../config/select-options';


@Component({
    selector: 'avenger-add-contract-component',
    templateUrl: './avenger-contract-upload.component.html',
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
        `
    ]
})
@DynamicForm({ type: 'contract', formModule: 'avenger-input' })
export class AvengerAddContractComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    public alert = ''; // 提示
    public ctrl: AbstractControl;
    public xnOptions: XnInputOptions;
    public contractitem: any; // 获取合同信息
    public Tabconfig: any;
    currentTab: any; // 当前标签页
    data: any[] = [];
    datalist: any[] = [];

    // 批量验证按钮状态
    // 全选按钮控制状态
    public unfill = false;



    constructor(private xn: XnService,
        private er: ElementRef,
        private vcr: ViewContainerRef,
        private localstorigeService: LocalStorageService
    ) {
    }



    public ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.Tabconfig = AvengerFormTable.tableFormlist;
        this.currentTab = this.Tabconfig.tabList[1]; // 当前标签页
        if (this.ctrl && this.ctrl.value && this.ctrl.value.status === 'unfill') {
            this.unfill = true;
        } else {
            this.unfill = false;
        }

        this.ctrl.statusChanges.subscribe(v => {
            this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
        });
        this.fromValue();
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }



    handleAdd() {
        const params: EditParamInputModel = {
            title: '新增合同',
            checker: <CheckersOutputModel[]>[
                {
                    title: '合同编号',
                    checkerId: 'contractId',
                    type: 'text',
                    required: 1,
                },
                {
                    title: '应收账款类型',
                    checkerId: 'receiveType',
                    type: 'moreselect',
                    required: 1,
                    options: { ref: 'moneyType' },
                    validators: {},
                },
                {
                    title: '合同文件图片',
                    checkerId: 'contractFile',
                    required: 1,
                    type: 'mfile',
                    validators: {},
                    isAvenger: true,
                }
            ],
            buttons: ['取消', '确定']
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params).subscribe(v => {
            if (v === null) {
                return;
            } else {
                this.contractitem = v;
                this.contractitem.contractAmt = '';
                this.contractitem.contractName = '';
                this.contractitem.contractJia = '';
                this.contractitem.contractYi = '';
                this.contractitem.contractSignTime = '';
                this.contractitem.contractJiesuan = '';
                this.contractitem.contractPayTime = '';
                this.contractitem.twoselect = v.receiveType.twoselect;
                this.contractitem.threeselect = v.receiveType.threeselect;
                this.contractitem.receiveType = JSON.stringify(v.receiveType.valueinfo);
                this.data.push(this.contractitem);
                this.data = XnUtils.distinctArray2(this.data, 'contractId');
                this.toValue();
            }
        });
    }

    private fromValue() {
        this.data = XnUtils.parseObject(this.ctrl.value, []);
        this.getcontracttype(this.data);
        this.toValue();
    }
    cleardata(item: number) {
        this.data.splice(item, 1);
    }
    getcontracttype(items) {
        this.row.selectOptions = SelectOptions.get('moneyType');
        items.map((item) => {
            this.row.selectOptions.map(itemone => {
                if (itemone.value === JSON.parse(item.receiveType).firstValue) {
                    itemone.children.map(itemtwo => {
                        if (itemtwo.value === JSON.parse(item.receiveType).secondValue) {
                            item.twoselect = itemone.children;
                        }
                    });
                }
            });
        });
        items.map(item => {
            item.twoselect.map(itemone => {
                if (itemone.value === JSON.parse(item.receiveType).secondValue) {
                    itemone.children.map(itemtwo => {
                        if (itemtwo.value === JSON.parse(item.receiveType).thirdValue) {
                            item.threeselect = itemone.children;
                        }
                    });
                }
            });
        });
    }
    ContractSupplement(item: any, index: number) {
        const checkers = [
            {
                title: '合同编号',
                checkerId: 'contractId',
                type: 'text',
                required: 0,
                value: item.contractId
            },
            {
                title: '合同金额',
                checkerId: 'contractAmt',
                type: 'money',
                required: 0,
                value: item.contractAmt
            },
            {
                title: '合同名称',
                checkerId: 'contractName',
                required: 0,
                type: 'text',
                value: item.contractName
            },
            {
                title: '合同甲方',
                checkerId: 'contractJia',
                type: 'text',
                required: 0,
                value: item.contractJia
            },
            {
                title: '合同结算方式',
                checkerId: 'contractJiesuan',
                type: 'text',
                required: 0,
                value: item.contractJiesuan,
            },
            {
                title: '合同乙方',
                checkerId: 'contractYi',
                type: 'text',
                required: 0,
                value: item.contractYi
            },
            {
                title: '合同签订时间',
                checkerId: 'contractSignTime',
                required: false,
                type: 'date',
                value: item.contractSignTime,
                placeholder: '请选择时间'
            },
            {
                title: '合同付款期限',
                checkerId: 'contractPayTime',
                type: 'text',
                required: 0,
                value: item.contractPayTime
            },
            {
                title: '应收账款类型',
                checkerId: 'receiveType',
                type: 'moreselect',
                required: 0,
                options: { ref: 'moneyType' },
                value: { twoselect: item.twoselect, threeselect: item.threeselect, valueinfo: item.receiveType }
            },

        ];
        const params = {
            checkers: checkers,
            value: item,
            title: '补充合同信息',
            type: 2,
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, AvengeraddContractModalComponent, params)
            .subscribe(v => {

                if (v.action === 'cancel') {
                    return;
                } else {
                    let contractFile = item.contractFile;
                    let receicevalueinfo = item.receiveType;
                    let itemtwoselect = item.twoselect;
                    let itemthreeselect = item.threeselect;
                    //let contratIds = item.contractId;
                    item = v.contractType;
                    item.contractFile = contractFile;
                    item.conrtactId = v.contratIds;
                    item.twoselect = v.contractType.receiveType === '' ? itemtwoselect : v.contractType.receiveType.twoselect;
                    item.threeselect = v.contractType.receiveType === '' ? itemthreeselect : v.contractType.receiveType.threeselect;
                    item.receiveType = v.contractType.receiveType === '' ?
                        receicevalueinfo : JSON.stringify(v.contractType.receiveType.valueinfo);
                    this.data[index] = item;
                    this.toValue();

                }
            });
    }
    // 上传完后取回值
    private toValue() {
        if (this.data.length === 0) {
            this.ctrl.setValue('');
        } else {
            const list = this.data.map(item => {
                const {
                    contractFile,
                    receiveType,
                    contractAmt,
                    contractName,
                    contractSignTime,
                    contractJia,
                    contractYi,
                    contractJiesuan,
                    contractPayTime,
                    contractId,
                } = item;
                return {
                    contractFile,
                    receiveType,
                    contractAmt,
                    contractName,
                    contractSignTime,
                    contractJia,
                    contractYi,
                    contractJiesuan,
                    contractPayTime,
                    contractId,
                };
            });

            this.ctrl.setValue(JSON.stringify(list));
            this.localstorigeService.setCacheValue('contractdata', this.data);
        }
        this.ctrl.markAsTouched();
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }
    public fileView(paramFiles) {
        let files = [{ fileId: paramFiles.filePath, isAvenger: true, }];
        XnModalUtils.openInViewContainer(this.xn, this.vcr, MfilesViewModalComponent, JsonTransForm(files))
            .subscribe(() => {
            });
    }
}
