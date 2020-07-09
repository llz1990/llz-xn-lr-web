/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：invoce-single-info-component.ts
 * @summary：发票查询结果详情
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan             新增        2019-05-11
 * **********************************************************************
 */

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { XnService } from '../../../services/xn.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: `./invoce-single-info-component.html`,
    styles: [`.fr {
        float: right !important
    }

    .frdiv {
        clear: both;
        margin-top: 60px;
    }
    `]
})
export class InvoceSingleInfoComponent implements OnInit {
    @ViewChild('invoiceRecord') invoiceRecordInfo: ElementRef;
    public items: any;
    record_id: number = 0;
    paging = 1;
    detailRecord: any[] = [];
    pageSize = 10;
    total = 0;
    first = 0;
    tableTitle: string = '';
    pageConfig = {
        pageSize: 10,
        first: 0,
        total: 0,
    };

    constructor(public xn: XnService,
        private route: ActivatedRoute) {
    }


    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.record_id = x.record_id;
        });
        this.onPage({ page: this.paging });
    }

    public onPage(event: any): void {
        this.paging = event.page || 1;
        this.pageSize = event.pageSize || this.pageSize;
        this.first = (this.paging - 1) * this.pageSize;
        this.xn.api.post('/custom/zhongdeng/invoice/get_invoicesingle', {
            page: this.paging,
            size: this.pageSize,
            record_id: this.record_id,
            type: 1
        }).subscribe(json => {
            if (json.data.data.errcode !== 0) {
                this.xn.msgBox.open(true, json.data.data.errmsg);
            } else {
                this.items = json.data.data.record;
                this.detailRecord = json.data.data.detail_list;
                this.total = json.data.data.total;
            }

        });
    }

    /**
     * 下载记录详情
     */
    public onload_invoice() {
        this.invoiceRecordInfo.nativeElement.href = 'http://gateway.lrscft.com/api/zd/download/record/detail?xwappid=eb2812c67d0740c292f9f9f70c31b542&record_id=' + this.record_id;
    }

    /**
     *  返回
     */
    public onCancel() {
        this.xn.user.navigateBack();
    }
}
