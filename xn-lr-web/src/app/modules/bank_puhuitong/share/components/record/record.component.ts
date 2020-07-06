/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：record.component.ts
 * @summary：流程记录
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          增加功能1         2019-08-28
 * **********************************************************************
 */

import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DataTableUtils } from '../../../../../common/data-table-utils';
import { XnService } from '../../../../../services/xn.service';
import { XnUtils } from '../../../../../common/xn-utils';
import { Tables } from '../../../../../config/tables';
import { BankDataTable } from '../../../common/data-table';


class MyDataTable extends BankDataTable {
    protected buildDom(): string {
        return '<\'row\'<\'col-sm-12\'tr>>' +
            '<\'row xn-dt-footer\'<\'col-sm-5\'i><\'col-sm-7\'p>>';
    }

    protected buildTableColumns(): any[] {
        const columns = DataTableUtils.buildTableColumns(this.config);
        const html = `<a href="javascript:void(0)" class="editor_view">查看处理</a>`;
        return columns.concat({
            title: '操作',
            data: null,
            defaultContent: html,
            orderable: false,
            searchable: false,
            width: '100px'
        });
    }
}

@Component({
    templateUrl: './record.component.html'
})
export class BankRecordComponent implements OnInit {

    datatable: MyDataTable;
    private flowId: string;

    pageTitle = '流程记录';
    pageDesc = '';
    tableTitle = '记录列表';
    newBtnText = '';
    showNew = false;

    constructor(private xn: XnService, private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            this.flowId = params['id'];

            [this.pageTitle, this.pageDesc, this.tableTitle, this.newBtnText] = Tables.getFlowDesc(this.flowId);

            // 经办并且newBtnText不为空, 才显示发起流程按钮
            this.showNew = (this.xn.user.roles.indexOf('operator') > -1) && (this.newBtnText.length > 0);
            if (this.datatable) {
                this.datatable.destroy();
            }
            // 获取流程信息

            this.datatable = new MyDataTable(this.xn, '#mainTable', 'flow-record', {
                ordering: false,
                where: {
                    flowId: this.flowId
                }
            });
            $('#mainTable').off();
            $('#mainTable').on('click', 'a.editor_view', e => this.editAction({ tag: e, value: 'edit_view' }));
            // const data = this.datatable.datatable.row($(val.tag.target).closest('tr')).data();

        });
    }

    editAction(val: any) {
        val.tag.preventDefault();
        const data = this.datatable.datatable.row($(val.tag.target).closest('tr')).data();
        console.log(data);
        // status：0, 1编辑，2 查看
        if ((data.status !== 1 && data.status !== 0) || !XnUtils.getRoleExist(data.nowRoleId, this.xn.user.roles, 1)) {
            this.xn.router.navigate([`/console/bank-puhuitong/record/${this.flowId}/view/${data.recordId}`]);
        } else {
            this.xn.router.navigate([`/console/bank-puhuitong/record/${this.flowId}/edit/${data.recordId}`]);
        }
    }

    onNewRecord() {
        this.xn.router.navigate([`/console/bank-puhuitong/record/new/${this.flowId}`]);
    }
}
