/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：invoce-Search-component.ts
 * @summary：发票批量查询记录表
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wq                  新增         2019-05-11
 * **********************************************************************
 */

import {Component, OnInit} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: `./invoce-Search-component.html`,
    styles: [`
        table {
            border: 1px solid #ddd !important
        }

        th {
            border-color: #d2d6de !important;
            border-bottom-width: 1px !important;

        }

        td {
            padding: 6px;
            border-color: #d2d6de !important;
            font-size: 12px !important;
        }

        tr th, tr td {
            vertical-align: middle !important;
        }
    `,
    ]
})
export class InvoceSearchRecordComponent implements OnInit {
    public items: any[];
    paging = 1;
    json: any;
    pageSize = 10;
    total = 0;
    first = 0;
    pageConfig = {
        pageSize: 10,
        first: 0,
        total: 0,
    };

    constructor(public xn: XnService, private route: ActivatedRoute) {
        this.items = [];
    }


    ngOnInit() {
        this.onPage({page: this.paging});
    }

    /**
     *  查看记录详情
     * @param paramCurrentInfo
     */
    public checkDetailInfo(paramCurrentInfo: any) {
        this.xn.router.navigate([`console/search/invoice-search/record/single`], {
            queryParams: {record_id: paramCurrentInfo.id}
        });

    }

    /**
     * @param event  event.page: 新页码 <br> event.pageSize: 页面显示行数<br>event.first: 新页面之前的总行数<br>event.pageCount : 页码总数
     */
    public onPage(event: any): void {
        this.paging = event.page || 1;
        this.pageSize = event.pageSize || this.pageSize;
        this.first = (this.paging - 1) * this.pageSize;
        this.onUrlData();
        this.xn.api.post('/custom/zhongdeng/invoice/get_invoicerecord', {
            page: this.paging,
            size: this.pageSize
        }).subscribe(json => {
            if (json.data.errcode !== 0) {
                this.xn.msgBox.open(true, json.data.errmsg);
            } else {
                this.items = json.data.record_list;
                this.total = json.data.total;
            }
        });
    }

    /**
     *  返回
     */
    public onCancel() {
        this.xn.user.navigateBack();
    }

    // 回退操作
    private onUrlData(data?) {
        const urlData = this.xn.user.getUrlData(this.xn.router.url);
        if (urlData && urlData.pop) {
            this.paging = urlData.data.paging || this.paging;
            this.pageSize = urlData.data.pageSize || this.pageSize;
            this.first = urlData.data.first || this.first;
        } else {
            this.xn.user.setUrlData(this.xn.router.url, {
                pageSize: this.pageSize,
                paging: this.paging,
                first: this.first,
            });
        }
    }


}
