import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import CommUtils from '../../../../public/component/comm-utils';
import VankeFactorTabConfig from '../../common/table.config';
import { HwModeService } from '../../../../services/hw-mode.service';
import { XNCurrency } from '../../../xncurrency';
import { DynamicForm } from '../../dynamic.decorators';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'dragon-table',
    templateUrl: './table-input.component.html',
    styles: [`
    .table-head table,.table-body table{width:100%;border-collapse:collapse;margin-bottom: 0px;}
    .table-head{background-color:white}
    .table-body{width:100%; max-height:600px;overflow-y:auto;min-height:50px;}
    .table-body table tr:nth-child(2n+1){background-color:#f2f2f2;}
    .headstyle  tr th{
        border:1px solid #cccccc30;
        text-align: center;
    }
    table thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;
        word-wrap: break-word;
        word-break: break-all;
        }
    .table-body table tr td{
        border:1px solid #cccccc30;
        text-align: center;
        max-width: 70px;
        word-wrap:break-word
    }
    .table-head table tr th {
        border:1px solid #cccccc30;
        text-align: center;
    }
    `]
})
@DynamicForm({
    type: [
        'paltformMsg',
        'businessFactor',
        'historyLoan',
        'holdersInfo',
        'litigationInfo',
    ], formModule: 'dragon-input'
})
export class DragonTableComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig?: any;
    memo: any;
    tabConfig: any;
    items: any[] = [];
    heads: any[] = [];
    allheads: any[] = [];
    public debtUnit = '';
    subResize: any;
    public amountReceive: number;
    public averagePrice: number;
    public ctrl: AbstractControl;
    public xnOptions: XnInputOptions;


    constructor(public hwModeService: HwModeService,
        private er: ElementRef, ) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);

        this.tabConfig = VankeFactorTabConfig[this.row.type];
        if (this.row.type === 'paltformMsg' || this.row.type === 'businessFactor') {
            this.heads = CommUtils.getListFields(this.tabConfig.heads);
        } else {
            let allheads = this.tabConfig.allheads;
            allheads.forEach((x, index) => {
                this.heads = CommUtils.getListFields(x.heads);
                this.allheads.push({ title: x.title, heads: this.heads, label: x.label });
            });

        }
        if (this.svrConfig.procedure.procedureId === 'review') {
            this.items = JSON.parse(this.row.data);

        } else {
            if (this.row.type === 'historyLoan') {
                this.items = JSON.parse(this.row.value);
                this.debtUnit = this.items.map(x => x.debtUnit)[0];
                let amount = new XNCurrency(0);
                this.items.forEach(x => {
                    amount = amount.add(x.receive);
                });
                this.amountReceive = amount.value;
                let average = new XNCurrency(this.amountReceive / this.items.length);
                this.averagePrice = average.value;
            } else {
                this.items = JSON.parse(this.row.value);

            }
        }
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
        this.subResize = Observable.fromEvent(window, 'resize').subscribe((event) => {
            this.formResize();
        });
    }
    ngAfterViewInit() {
        this.formResize();
    }
    ngOnDestroy() {
        // 在组件生命周期销毁里取消事件，防止出现页面多次执行之后卡顿
        if (this.subResize) {
            this.subResize.unsubscribe();
        }
    }
    formResize() {
        if (this.row.type === 'litigationInfo') {
            this.tabConfig.allheads.map((heads) => {
                let scrollBarWidth = $('.' + heads['label'] + '>.table-body', this.er.nativeElement).outerWidth(true) - $('.' + heads['label'] + '>.table-body>table').outerWidth(true);
                $('.' + heads['label'] + '>.table-head', this.er.nativeElement).attr("style", `width: calc(100% - ${scrollBarWidth}px`);
            })
        } else if (this.row.type === 'historyLoan') {
            let scrollBarWidth = $('.historyDetail>.table-body', this.er.nativeElement).outerWidth(true) - $('.historyDetail>.table-body>table').outerWidth(true);
            $('.historyDetail>.table-head', this.er.nativeElement).attr("style", `width: calc(100% - ${scrollBarWidth}px`);
        }
    }
}
