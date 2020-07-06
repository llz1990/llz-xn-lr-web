
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：customer-template-component.ts
 * @summary：台账自定义列表
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing             添加         2020-01-06
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent, ModalSize } from '../../../../common/modal/components/modal';
import { XnService } from '../../../../services/xn.service';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { BankCardAddComponent } from './bank-card-add.component';
import { Observable } from 'rxjs/Observable';
import { XnUtils } from '../../../../common/xn-utils';
import { SortablejsOptions } from 'angular-sortablejs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    templateUrl: `./custom-list-modal.component.html`,
    selector: 'dragon-custom-list',
    styles: [`

        .title {
            font-weight:bold;
        }
        ul>li{
            list-style:none;
            font-weight:bold;
        }
        .label {
            font-weight: normal;
            flex: 1;
            color: black;
        }

        .flex {
            display: flex;
        }

        .input-check {
            width: 100px;
        }

        .table-display tr td {
            vertical-align: middle;
        }

        .table {
            table-layout: fixed;
            width: 100%;
        }

        .table-height {
            max-height: 380px;
            overflow-y: auto;
        }

        .head-height {
            position: relative;
            overflow: hidden;
        }

        .table-display {
            margin: 0;
        }

        .relative {
            position: relative
        }

        .red {
            color: #f20000
        }

        .table tbody tr td:nth-child(5) {
            word-wrap: break-word
        }
    `]
})
export class DragongetCustomListComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    // 数据
    // tslint:disable-next-line: no-use-before-declare
    label: string;
    // 数组字段
    heads: any[] = [];
    private observer: any;
    datalist01: any[] = [];
    orgName: string = '';
    appId: string = '';
    selectedItems: any[] = [];
    public params: any;
    first = 0;
    paging = 0; // 共享该变量
    pageSize = 10;
    beginTime: any;
    endTime: any;
    sorting = ''; // 共享该变量
    naming = ''; // 共享该变量
    total = 0;
    headLeft = 0;
    options: SortablejsOptions;

    constructor(private xn: XnService,
        private vcr: ViewContainerRef, private er: ElementRef, ) {

    }

    ngOnInit(): void {

    }


    /**
     *  判断列表项是否全部选中
     */
    public isAllChecked(): boolean {
        return !(this.datalist01.some(x => !x['checked'] || x['checked'] && x['checked'] === false) || this.datalist01.length === 0);
    }
    // 滚动表头
    onScroll($event: Event) {
        this.headLeft = $event.srcElement.scrollLeft * -1;
    }

    /**
 *  全选
 */
    public checkAll() {
        if (!this.isAllChecked()) {
            this.datalist01.forEach(item => item['checked'] = true);
            this.selectedItems = XnUtils.distinctArray2([...this.selectedItems, ...this.datalist01], 'label');
        } else {
            this.datalist01.forEach(item => item['checked'] = false);
            this.selectedItems = [];
        }

    }
    /**
 * 单选
 * @param paramItem
 * @param index
 */
    public singleChecked(paramItem) {

        if (paramItem['checked'] && paramItem['checked'] === true) {
            paramItem['checked'] = false;
            this.selectedItems = this.selectedItems.filter(x => x.label !== paramItem.label);
        } else {
            paramItem['checked'] = true;
            this.selectedItems.push(paramItem);
            this.selectedItems = XnUtils.distinctArray2(this.selectedItems, 'label'); // 去除相同的项
        }
    }



    getData() {
    }
    setData() {
        //console.info('datalistsetdata=>', this.datalist01);

    }
    /**
     *  打开模态框
     * @param params
     */
    open(params: any): Observable<any> {
        this.selectedItems = [];
        this.params = params;
        this.datalist01 = params.headText;
        let selectHead = params.selectHead;
        this.datalist01.forEach((x) => {
            x.checked = false;
        });
        selectHead.forEach((x: any) => {
            this.datalist01.forEach((t: any) => {
                if (t.value === x.value) {
                    t.checked = true;
                    this.selectedItems.push(t);
                }
            });

        });
        console.log('this.selectedItems', this.selectedItems);

        this.modal.open(ModalSize.Small);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }



    /**
  *  @param event
  *       event.page: 新页码
  *       event.pageSize: 页面显示行数
  *       event.first: 新页面之前的总行数,下一页开始下标
  *       event.pageCount : 页码总数
  */
    onPage(event: any): void {
        this.paging = event.page || 1;
        this.pageSize = event.pageSize || this.pageSize;
        // 后退按钮的处理
        this.first = (this.paging - 1) * this.pageSize;
    }

    oncancel() {
        this.modal.close();
    }
    onOk() {
        this.modal.close();
        this.xn.dragon.post('/trade/set_column',
            { column: JSON.stringify(this.selectedItems.map(x => x.value)), status: this.params.status }).subscribe(x => {
                if (x.ret === 0) {

                }
            });
        this.observer.next(this.selectedItems);
        this.observer.complete();
    }
}
