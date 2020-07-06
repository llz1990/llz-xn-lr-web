import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {XnModalUtils} from '../../../common/xn-modal-utils';
import {InvoiceFactoryEditModalComponent} from '../../../public/modal/invoice-factory-edit-modal.component';

@Component({
    templateUrl: './invoice-manage.component.html',
    styles: [
        `.table { font-size: 13px; }`,
        `.xn-click-a { display: inline-block; padding-left: 5px; padding-right: 5px;}`,
        `.btn-more { margin-top: 10px;}`,
        `.btn-more-a {  position: relative; left: 50%; transform: translateX(-50%) }`,
        `.btn {padding: 1px 12px; font-size: 12px}`,
        `.btn.disabled.btn-primary { background: #666 }`
    ]
})
export class InvoiceManageComponent implements OnInit {

    pageTitle = '待补发票';
    pageDesc = '';
    tableTitle = '待补发票';
    cardNo = '';

    total = 0;
    pageSize = 10;
    start = 10;
    items: any[] = [];
    readonlyMan = '只读用户';
    showBtn = false;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.onload(0);
    }

    onload(start: number) {
        console.log('startNumber: ', start);
        this.xn.api.post('/invoice_upload/list', {
            start: start || 0
        }).subscribe(json => {
            console.log('invoicelist: ', json);
            // 将数组遍历添加
            for (var i in json.data.dataList) {
                this.items.push(json.data.dataList[i]);
            }
            this.start = json.data.start;
            if (json.data.start >= json.data.count) {
                this.showBtn = false;
            } else {
                this.showBtn = true;
            }
        });
    }

    onViewEdit(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, InvoiceFactoryEditModalComponent, item).subscribe(v => {
            console.log('closeV: ', v);
            if (v.billAmounts <= v.invoiceAmounts) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].mainFlowId === v.mainFlowId) {
                        this.items.splice(i, 1);
                    }
                }
            } else {
                this.items.toString();
            }
        });
    }

    onSms(i, mainFlowId) {
        console.log('index: ', i);
        this.xn.api.post('/invoice_upload/sms_remind', {
            mainFlowId: mainFlowId
        }).subscribe(json => {
            console.log('invoiceSms: ', json);
            if (json.ret === 0) {
                this.items[i].isSms !== 1 ? this.items[i].isSms = 1 : this.items[i].isSms = 0;
            }
        });
    }

    onCssClass(isSms) {
        if (isSms === 1) {
            return 'disabled';
        }
        if (isSms === 0) {
            return 'active';
        }
    }
}
