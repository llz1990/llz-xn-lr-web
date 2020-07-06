
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：customer-template-component.ts
 * @summary：资产池执行信息查看
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing             添加         2019-08-28
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent, ModalSize } from '../../../../common/modal/components/modal';
import { XnService } from '../../../../services/xn.service';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { BankCardAddComponent } from './bank-card-add.component';
import { Observable } from 'rxjs/Observable';
import { DeletematerialEditModalComponent } from './delete-material-modal.component';
import { EditModalComponent } from './edit-modal.component';
import { CapitalPoolIntermediaryAgencyModalComponent } from './capital-pool-intermediary-agency-modal.component';
declare const moment: any;

@Component({
    templateUrl: `./capital-set-execution-info-modal.component.html`,
    selector: 'chose-capitalPool-modal',
    styles: [`
    .modal-title{
        height:50px;
    }
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

        .table-head .sorting, .table-head .sorting_asc, .table-head .sorting_desc {
            /*position: relative;*/
            cursor: pointer
        }

        .table-head .sorting:after, .table-head .sorting_asc:after, .table-head .sorting_desc:after {
            font-family: 'Glyphicons Halflings';
            opacity: 0.5;
        }

        .table-head .sorting:after {
            content: "\\e150";
            opacity: 0.2
        }

        .table-head .sorting_asc:after {
            content: "\\e155"
        }

        .table-head .sorting_desc:after {
            content: "\\e156"
        }
    `]
})
export class CapitalSetexecutionInfoComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    // 数据
    // tslint:disable-next-line: no-use-before-declare
    // 数组字段
    private observer: any;
    datalist01: etexecutionInfoList[] = [];
    public params: any;
    first = 0;
    paging = 0; // 共享该变量
    pagingnext = 0;
    pageSize = 10;
    beginTime: any;
    endTime: any;
    total = 0;
    totalReceive = 0;
    paramType: number;
    executeTime: ''; // 执行时间
    executionText: ''; // 执行内容
    project_manage_id: '';
    list: any[] = [];

    constructor(private xn: XnService,
        private vcr: ViewContainerRef, private er: ElementRef, ) {
    }

    ngOnInit(): void {

    }





    /**
     *  打开模态框
     * @param params
     */
    open(params: any): Observable<any> {
        this.params = params.param;
        this.project_manage_id = params.project_manage_id;
        this.xn.dragon.post('/project_manage/agency/project_agency_list',
            { project_manage_id: this.project_manage_id }).subscribe(x => {
                if (x.ret === 0) {
                    this.list = x.data.rows;
                }
            });
        this.onPage(1);
        this.modal.open(ModalSize.Large);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }
    public selectedDate(value: any, key: string) {
        this.executeTime = value.format();
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
        const params = this.buildParams();
        this.xn.dragon.post('/project_manage/agency/list_execute_agency', params).subscribe(x => {
            if (x.ret === 0) {
                this.datalist01 = x.data.rows;
                this.total = x.data.count;
            }
        });
    }

    oncancel() {
        this.modal.close();
    }
    onOk() {
        this.modal.close();
    }

    // 修改层级
    changeExecution(paramInfo) {
        const checkers = [
            {
                checkerId: 'executeTime',
                name: 'executeTime',
                required: 0,
                type: 'date',
                title: '执行时间 ',
                memo: '',
                value: moment(paramInfo.executeTime).format('YYYY-MM-DD')
            },
            {
                checkerId: 'executeDesc',
                name: 'executeDesc',
                required: 0,
                type: 'text',
                title: '执行内容 ',
                memo: '',
                value: paramInfo.executeDesc
            }
        ];
        const params = {
            checker: checkers,
            title: '修改执行信息',
            buttons: ['取消', '确定'],
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {
                if (v === null) {
                    return;
                } else {
                    this.xn.dragon.post('/project_manage/agency/alter_execute_agency',
                        { execute_id: paramInfo.execute_id,
                            executeTime: moment(v.executeTime).valueOf(), executeDesc: v.executeDesc })
                        .subscribe(x => {
                            if (x.ret === 0) {
                                this.onPage({ page: this.paging });
                            }
                        });
                }

            });

    }
    // 添加执行信息
    addCeil() {
        const checkers = [
            {
                checkerId: 'vankeAgency',
                name: 'vankeAgency',
                required: 1,
                type: 'vankeAgency-select',
                title: '中介机构 ',
                options: { ref: 'contractRules' },
                value1: this.list,
            },
            {
                checkerId: 'executeTime',
                name: 'executeTime',
                required: 0,
                type: 'date',
                title: '执行时间 ',
                memo: '',
                value: ''
            },
            {
                checkerId: 'executeDesc',
                name: 'executeDesc',
                required: 0,
                type: 'text',
                title: '执行内容 ',
                memo: '',
                value: ''
            }
        ];
        const params = {
            checker: checkers,
            title: '添加执行信息',
            buttons: ['取消', '确定'],
        };
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            EditModalComponent,
            params
        ).subscribe(data => {
            console.log('agency', data);
            let vankeAgency = [data.vankeAgency];
            this.xn.dragon.post('/project_manage/agency/add_execute_agency',
                {
                    capitalPoolId: this.params,
                    appIds: vankeAgency, executeTime: moment(data.executeTime).valueOf(), executeDesc: data.executeDesc
                }).subscribe(x => {
                    if (x.ret === 0) {
                        this.onPage({ page: this.paging });
                    }
                });

        });
    }


    delete(paramInfo) {
        this.xn.dragon.post('/project_manage/agency/del_execute_agency', { execute_id: paramInfo }).subscribe(x => {
            if (x.ret === 0) {
                this.onPage({ page: this.paging });
            }
        });

    }
    private buildParams() {
        // 分页处理
        const params: any = {
            start: (this.paging - 1) * this.pageSize,
            length: this.pageSize,
            beginTime: this.beginTime,
            endTime: this.endTime,
            capitalPoolId: this.params,
        };
        return params;
    }


}
class etexecutionInfoList {
    "orgName": string; 	 	  // 机构名字
    "executeTime": number;	  // 执行时间（时间戳）
    "executeDesc": string;	  // 执行内容
    "createTime": number;		  // 创建时间（时间戳）
}