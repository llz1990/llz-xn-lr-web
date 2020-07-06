/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：profit-table-input.component.ts
 * @summary：龙光供应商上传资料平台初审交易合同
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing            增加             2019-08-30
 * **********************************************************************
 */

import { Component, OnInit, Input, ElementRef, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import DragonInfos from '../../bean/checkers.tab';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { EditModalComponent } from '../../../modal/edit-modal.component';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { XnUtils } from '../../../../../../common/xn-utils';
import { PublicCommunicateService } from '../../../../../../services/public-communicate.service';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { VankeInvoiceViewModalComponent } from '../../../modal/invoice-view-modal.component';
import { HwModeService } from '../../../../../../services/hw-mode.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';



@Component({
    selector: 'dragon-plat-invoice',
    template: `
    <div style="width:100%;">
    <div class="table-head" [ngStyle]="{'padding-right':items.length>=5?'17px':'0px'}">
    <table class="table table-bordered table-striped text-center" style='margin-bottom:0px !important'>
    <thead class='headstyle'>
      <tr class="table-head">
        <!-- 全选按钮 -->
        <!-- title -->
        <th>序号</th>
        <th *ngFor="let head of currentTab.heads">
          {{head.label}}
        </th>
        <!-- 行操作 -->
        <th *ngIf="svrConfig.flow.flowId!=='dragon_supplier_sign' && svrConfig.flow.flowId!=='vanke_financing_sign'">操作</th>
      </tr>
    </thead>
    </table>
    </div>
    <div class="table-body">
    <table class="table table-bordered table-hover text-center table-display">
    <tbody>
        <ng-container  *ngIf="items.length;else block" >
            <tr *ngFor="let item of items;let i=index" >
              <td>{{i+1}}</td>
              <td *ngFor="let head of currentTab.heads">
              <ng-container [ngSwitch]="head.type">
              <ng-container *ngSwitchCase="'file'">
              <ng-container *ngIf="item[head.value]&& item[head.value]!==''">
                <div>
                  <a href="javaScript:void(0)" (click)="onOpenImage(i)">文件</a>
                </div>
              </ng-container>
              </ng-container>
              <ng-container *ngSwitchCase="'status'">
              <ng-container
              *ngIf="(item?.tag&&item?.tag==='artificial') || (item?.away && item?.away==='edit');else block1">
              <span class="tag-color">人工验证</span>
            </ng-container>
            <ng-template #block1>
              <span [ngClass]="{'tag-color':item.status===4 || item.status===2}">{{item.status | xnInvoiceStatus}}</span>
            </ng-template>
              </ng-container>
              <ng-container *ngSwitchCase="'money'">
              <div *ngIf="item[head.value] && item[head.value] !==''">
                  {{item[head.value] | xnMoney}}
            </div>
              </ng-container>
              <ng-container *ngSwitchCase="'mainFlowId'">
              <p *ngFor='let sub of item[head.value] | xnJson; let i=index'>

                <ng-container *ngIf="sub.endsWith('cg')">
                    <a href="javaScript:void(0)"
                  (click)="hwModeService.viewProcess(sub,50)">{{sub}}</a>
                </ng-container>
                <ng-container *ngIf="!sub.endsWith('cg')&& !sub.endsWith('lg') && !sub.endsWith('wk')">
                    <a href="javaScript:void(0)"
                  (click)="hwModeService.viewProcess(sub)">{{sub}}</a>
                </ng-container>
                <ng-container *ngIf="sub.endsWith('lg')|| sub.endsWith('wk')">
                    <a href="javaScript:void(0)"
                  (click)="hwModeService.DragonviewProcess(sub)">{{sub}}</a>
                </ng-container>
              </p>
            </ng-container>

              <ng-container *ngSwitchDefault>
              <div [innerHTML]="item[head.value] | xnGatherType: {head:head,row:item}"></div>
            </ng-container>
              </ng-container>
             </td>
            <td *ngIf="svrConfig.flow.flowId!=='dragon_supplier_sign'
            && svrConfig.flow.flowId!=='vanke_financing_sign'">
            <a href="javaScript:void (0)" (click)='changeTransferMoney(item)' >修改转让金额</a></td>
            </tr>
          </ng-container>
          <tr *ngIf="items.length>0">
              <td>合计</td>
              <td>/</td>
              <td>/</td>
              <td>/</td>
              <td>/</td>
              <td class="money-color">{{preAmountAll || '' | xnMoney}}</td>
              <td class="money-color">{{ amountAll || '' | xnMoney}}</td>
              <td class="money-color">{{transferAmount  | xnMoney}}</td>
              <td>/</td>
              <td>/</td>
              <td *ngIf="svrConfig.flow.flowId!=='dragon_supplier_sign' && svrConfig.flow.flowId!=='vanke_financing_sign'">/</td>
            </tr>

    </tbody>
  </table>
  </div>
</div>
<span class="xn-input-alert">{{alert}}</span>

<ng-template #block>
  <tr>
    <td [attr.colspan]="11">
      <div class="empty-message"></div>
    </td>
  </tr>
</ng-template>
    `,
    styles: [
        `
        .table-head table,.table-body table{width:100%;border-collapse:collapse;}
        .table-head{background-color:white}
        .table-body{width:100%; max-height:400px;overflow-y:auto;min-height:50px;}
        .table-body table tr:nth-child(2n+1){background-color:#f2f2f2;}
        .headstyle  tr th{
            border:1px solid #cccccc30;
            text-align: center;
        }
        table thead, tbody tr {
            display:table;
            width:100%;
            table-layout:fixed;
            }
        .table-body table tr td{
            border:1px solid #cccccc30;
            text-align: center;
            max-width: 70px;
            word-wrap:break-word
        }
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
            .table tbody tr td:nth-child(5) {
                word-wrap: break-word
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
@DynamicForm({ type: 'invoice-transfer', formModule: 'dragon-input' })
export class DragonPlatInvoiceComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    private ctrl: AbstractControl;
    private ctrl1: AbstractControl;

    public items: any[] = [];
    public Tabconfig: any;
    currentTab: any; // 当前标签页
    // 含税
    public amountAll = 0;
    public alert = '';
    private xnOptions: XnInputOptions;
    public transferAmount = 0;
    headLeft = 0;
    scroll_x = 0;
    // 不含税
    public preAmountAll = 0;
    constructor(private xn: XnService,
        private vcr: ViewContainerRef, private er: ElementRef,
        private publicCommunicateService: PublicCommunicateService, private hwModeService: HwModeService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.currentTab = DragonInfos.platInvoice;
        this.ctrl = this.form.get(this.row.name);
        this.items = JSON.parse(this.row.value);
        this.ctrl1 = this.form.get('receive');
        this.ctrl.statusChanges.subscribe(v => {
            this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
        });
        const mainFlowIds$ = this.items.map(temp =>
            this.xn.dragon.post('/file/allHistoryList',
                {
                    mainFlowId: this.svrConfig.record.mainFlowId,
                    invoiceNum: temp.invoiceNum, invoiceCode: temp.invoiceCode
                }));
        forkJoin(mainFlowIds$).subscribe(async (x: any) => {
            this.items.forEach((item, index) => {
                item.mainFlowId = x[index].data;
            });

            await this.fromValue();
            this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
            this.cdr.markForCheck();

        });
    }
    // 修改转让金额
    changeTransferMoney(item) {
        let params = {
            title: '发票转让金额',
            checker: [
                {
                    checkerId: 'transferMoney',
                    required: 1,
                    type: 'money',
                    options: {},
                    title: '发票转让金额',
                    value: item.transferMoney,
                },
            ]
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params).subscribe(x => {
            let transfer = this.ReceiveData(x.transferMoney);
            if (x === null) {
                return;
            } else if (transfer < 0) {
                this.xn.msgBox.open(false, '转让金额不可以为负数');
                return;
            } else if (transfer > parseFloat(item.invoiceAmount)) {
                this.xn.msgBox.open(false, '转让金额不可以大于税收金额');
                return;

            } else {
                item['transferMoney'] = transfer.toFixed(2);
                this.toValue();
                this.cdr.markForCheck();

            }

        });

    }

    // 滚动表头
    onScroll($event: Event) {
        this.headLeft = $event.srcElement.scrollLeft * -1;
        console.log(this.headLeft);
    }

    // 上传完后取回值
    private toValue() {
        if (this.items.length === 0) {
            this.ctrl.setValue('');
            this.amountAll = 0;
            this.transferAmount = 0;
            this.preAmountAll = 0;
        } else {
            const contractTypeBool = []; // 必须每张发票都包含发票号，金额，开票日期
            for (let i = 0; i < this.items.length; i++) {
                contractTypeBool.push(!!(this.items[i].invoiceAmount) && !!(this.items[i].invoiceNum && !!this.items[i].invoiceDate));
                this.items[i].invoiceAmount = Number(this.items[i].invoiceAmount).toFixed(2);
                this.items[i].amount = Number(this.items[i].amount).toFixed(2);
                this.items[i].transferMoney = Number(this.items[i].transferMoney).toFixed(2);
                this.cdr.markForCheck();

            }
            contractTypeBool.indexOf(false) > -1 ? this.ctrl.setValue('') : this.ctrl.setValue(JSON.stringify(this.items));
            if (this.items.filter(v => v && v.invoiceAmount).length > 0) {
                this.amountAll = this.computeSum(this.items.filter(v =>
                    v && v.invoiceAmount).map(v => Number(v.invoiceAmount))).toFixed(2) || 0;
                this.transferAmount = this.computeSum(this.items.filter(v =>
                    v && v.transferMoney).map(v => Number(v.transferMoney))).toFixed(2) || 0;
                this.preAmountAll = this.computeSum(this.items.filter(v =>
                    v && v.amount).map(v => Number(v.amount))).toFixed(2) || 0;


            } else {
                this.amountAll = 0;
                this.transferAmount = 0;
                this.preAmountAll = 0;
            }
        }
        // 计算完金额后向外抛出的值
        this.publicCommunicateService.change.emit(this.amountAll);
        this.ctrl.markAsTouched();
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }
    private fromValue() {
        this.items = XnUtils.parseObject(this.items, []);
        this.items = this.items.sort((a, b) => a['invoiceNum'] - b['invoiceNum']);

        this.items.map(item => {
            console.info('transfer==>', item.transferMoney);
            if (item.transferMoney !== undefined) {
                this.toValue();
                return;

            } else {
                this.firstcaclate(this.items);
                this.toValue();
            }
        });
    }
    firstcaclate(item: any) {
        console.info('this.ctrl1===>', this.ctrl1.value);
        let totalinvoiceAmount = 0;
        let previnvoiceAmount = 0;
        let bcontinue = false;
        for (let i = 0; i < item.length; i++) {
            if (bcontinue) {
                item[i].transferMoney = 0;
            } else {
                if (this.ReceiveData(this.ctrl1.value) > this.calculateData(item[i].invoiceAmount) &&
                    totalinvoiceAmount < this.ReceiveData(this.ctrl1.value)) {
                    previnvoiceAmount = totalinvoiceAmount;
                    totalinvoiceAmount += this.calculateData(item[i].invoiceAmount);
                    if (totalinvoiceAmount > this.ReceiveData(this.ctrl1.value)) {
                        item[i].transferMoney = this.calculateData(this.ReceiveData(this.ctrl1.value) - previnvoiceAmount);
                        bcontinue = true;
                    } else {
                        item[i].transferMoney = this.calculateData(item[i].invoiceAmount);
                    }
                } else {
                    if (this.ReceiveData(this.ctrl1.value) < this.calculateData(item[i].invoiceAmount) && i === 0) {
                        item[i].transferMoney = this.ReceiveData(this.ctrl1.value).toFixed(2);
                        bcontinue = true;
                    } else {
                        item[i].transferMoney = this.calculateData(this.ReceiveData(this.ctrl1.value) - totalinvoiceAmount);
                        bcontinue = true;

                    }
                }
            }
        }

    }
    public onOpenImage(index: number) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, VankeInvoiceViewModalComponent, { fileList: this.items, paramIndex: index }).subscribe(() => {
        });
    }
    // 计算转让金额
    public calculateData(item: any) {
        return Number(parseFloat(item).toFixed(2));
    }

    // 计算应收账款转让金额
    public ReceiveData(item: any) {
        let tempValue = item.replace(/,/g, '');
        tempValue = parseFloat(tempValue).toFixed(2);
        return Number(tempValue);
    }
    // 具体到单个数组的求和
    private computeSum(array) {
        return array.reduce((prev, curr, idx, arr) => {
            return prev + curr;
        });
    }



}
