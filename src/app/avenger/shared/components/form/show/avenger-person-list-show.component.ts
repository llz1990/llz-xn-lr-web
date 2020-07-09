import { Component, OnInit,OnDestroy, AfterViewInit, Input, ElementRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { DynamicForm } from '../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../services/xn.service';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';
import { XnFormUtils } from '../../../../../common/xn-form-utils';
import { XnUtils } from '../../../../../common/xn-utils';
import { XnInputOptions } from '../../../../../public/form/xn-input.options';
import DragonInvoiceTabConfig from '../../../../invoice-management/invoice-management';
import { HwModeService } from '../../../../../services/hw-mode.service';
import { AvengerMfilesViewModalComponent } from '../../modal/mfiles-view-modal.component';
import { JsonTransForm } from '../../../../../public/pipe/xn-json.pipe';

@Component({
    selector: 'dragon-person-list-show',
    template:  `
    <div style="width:100%;">
        <div class="table-head">
            <table class="table">
                <thead>
                    <tr>
                        <!-- 全选按钮 -->
                        <!-- title -->
                        <th style='width:4%'>序号</th>
                        <th *ngFor="let head of currentTab.heads"
                            [ngStyle]="{'width':head.width}">
                            {{head.label}}
                        </th>
                        <!-- 行操作 -->
                    </tr>
                </thead>
            </table>
        </div>
        <div class="table-body">
            <table class="table">
                <tbody>
                    <ng-container *ngIf="items.length>0;">
                        <tr *ngFor="let item of items;let i=index">
                        <td style='width:4%'>{{i+1}}</td>
                            <td *ngFor="let head of currentTab.heads"
                                [ngStyle]="{'width':head.width}"
                                style="max-width: 70px;word-wrap:break-word">
                                <ng-container [ngSwitch]="head.type">
                                    <ng-container *ngSwitchCase="'mainFlowId'">
                                        <a href="javaScript:void(0)"
                                            (click)="hwModeService.DragonviewProcess(item[head.value])">{{item[head.value]}}
                                        </a>
                                    </ng-container>
                                    <ng-container *ngSwitchCase="'file'">
                                        <ng-container *ngIf=" item[head.value]&& item[head.value]!==''">
                                            <div *ngFor="let sub of item[head.value] | xnJson">
                                                <a href="javaScript:void(0)" (click)="viewFiles(sub)">{{sub.fileName}}</a>
                                            </div>
                                        </ng-container>
                                    </ng-container>
                                    <ng-container *ngSwitchCase="'result'">
                                        <div *ngIf='item.flag===0 || item.isMatching===0'  style='color: red;'>未匹配</div>
                                        <div *ngIf='item.flag===1 || item.flag===2 || item.isMatching===1'>匹配成功</div>
                                        <div *ngIf='item.isMatching===2'>账号变更</div>
                                    </ng-container>
                                    <ng-container *ngSwitchCase="'invoice'">
                                        <ng-container *ngIf=" item[head.value]&& item[head.value]!==''">
                                            <div>{{item[head.value]}}</div>
                                        </ng-container>
                                    </ng-container>
                                    <ng-container *ngSwitchCase="'date'">
                                        <ng-container *ngIf="item[head.value] && item[head.value]!==''">
                                        <div>
                                            {{item[head.value] | xnDate: 'date'}}
                                        </div>
                                        </ng-container>
                                    </ng-container>
                                    <!-- 应收账款金额 -->
                                    <ng-container *ngSwitchCase="'receive'">
                                        <ng-container *ngIf=" item[head.value] !==undefiend &&item[head.value] !==null && item[head.value]!==0">
                                            <div>{{item[head.value].toFixed(2) | xnMoney}}</div>
                                        </ng-container>
                                    </ng-container>
                                    <ng-container *ngSwitchDefault>
                                        <div [innerHTML]="item[head.value] | xnGatherType: {head:head,row:item}"></div>
                                    </ng-container>
                                </ng-container>
                            </td>
                        </tr>
                    </ng-container>
                </tbody>
            </table>
        </div>
    </div>
      `,
    styles: [
        `
        .table-head table,.table-body table{
            margin-bottom: 0px
        }
        .table-body{
            width:100%; 
            max-height:1770px;
            overflow-y:auto;
            min-height:50px;
        }
        .table-body table tr:nth-child(2n+1){
            background-color:#f9f9f9;
        }
        table thead,tbody tr {
            display:table;
            width:100%;
            table-layout:fixed;
        }
        .table-head table tr th {
            border:1px solid #cccccc30;
            text-align: center;
        }
        .table-body table tr td{
            border:1px solid #cccccc30;
            text-align: center;
        }
        .ocrinfo {
            background-color: #cbecee;
            color:red;
        }
        `
    ]
})
@DynamicForm({ type: 'person-list', formModule: 'avenger-show' })
export class AvengerPersonListShowComponent implements OnInit,AfterViewInit,OnDestroy {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;

    public items: any[] = [];
    public ctrl_file: AbstractControl;
    public ctrl: AbstractControl;
    currentTab: any; // 当前标签页
    subResize: any;
    fileUploadData:any;
    public allHeads = {
        sub_nuonuocs_blue: DragonInvoiceTabConfig.nuonuocs_blue,
        sub_nuonuocs_red: DragonInvoiceTabConfig.nuonuocs_red,
    }
    constructor(private xn: XnService, private vcr: ViewContainerRef, 
        private cdr: ChangeDetectorRef, private er: ElementRef, 
        public hwModeService: HwModeService) {
    }
    ngOnInit() {
        this.currentTab = this.allHeads[this.row.flowId];
        if (!!this.row.data) {
            this.items = JSON.parse(this.row.data);
        }
        this.subResize = Observable.fromEvent(window,'resize').subscribe((event) => {
            this.formResize();
        });
    }
    //查看文件
    viewFiles(params) {
        //上传文件调用的是采购融资的接口，isAvenger为true
        params.isAvenger = true;
        XnModalUtils.openInViewContainer(this.xn, this.vcr, AvengerMfilesViewModalComponent, [params]).subscribe(v => {
            if (v.action === 'cancel') {
                return;
            } else {
            }
        });
    }
    
    ngAfterViewInit(){
        this.formResize();
    }
    ngOnDestroy() {
        // 在组件生命周期销毁里取消事件，防止出现页面多次执行之后卡顿
        if(this.subResize){
            this.subResize.unsubscribe();
        }
    }
    formResize(){
        let scrollBarWidth = $('.table-body',this.er.nativeElement).outerWidth(true) - $('.table-body>table').outerWidth(true);
        $('.table-head',this.er.nativeElement).css({'padding-right':scrollBarWidth ? scrollBarWidth+'px':'0px'});
    }
    /**
     * 特殊字段处理
     * @parmas str
     */
    private strFormat(str:string):string{
        return str.match(/\d+\.*\d*/g)[1] || '';
    }
    private deepCopy(obj, c) {
        c = c || {};
        for (let i in obj) {
          if (typeof obj[i] === 'object') {
              c[i] = obj[i].constructor === Array ? [] : {};
              this.deepCopy(obj[i], c[i]);
          } else {
              c[i] = obj[i];
          }
        }
        return c;
    }
}