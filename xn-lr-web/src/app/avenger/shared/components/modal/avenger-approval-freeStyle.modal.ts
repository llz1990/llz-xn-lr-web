
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：customer-template-component.ts
 * @summary：多标签页列表项 根据TabConfig.ts中的配置
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing             添加         2019-05-13
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { XnService } from '../../../../services/xn.service';
import { ModalSize, ModalComponent } from '../../../../common/modal/components/modal';


@Component({
    templateUrl: `./avenger-approval-freeStyle.modal.html`,
    selector: 'customer-whiteStatus-table',
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
export class AvengerapprovalfreeStyleComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    private observer: any;
    items: bigFeeStyle = new bigFeeStyle();

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
        this.items = params;
        this.modal.open(ModalSize.Large);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    oncancel() {
        this.modal.close();
    }
    onOk() {
        this.modal.close();
        this.observer.next();
        this.observer.complete();
    }

}
class feeStyle {
    payableValue: string = '';
    realValue: string = '';
    realTime: string = '';
}
class bigFeeStyle {
    mainFlowId: string = '';
    receivable: string = '';
    valueDate: string = '';
    factoringEndDate: string = '';
    factoringUseFee: feeStyle = new feeStyle();
    factoringSerFee: feeStyle = new feeStyle();
    platformFee: feeStyle = new feeStyle();
    depositFee: feeStyle = new feeStyle();
    payableAmount: feeStyle = new feeStyle();
}
