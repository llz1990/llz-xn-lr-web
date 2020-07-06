import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {XnModalUtils} from '../../../common/xn-modal-utils';
import {ActivatedRoute, Params} from '@angular/router';
import {ContractViewModalComponent} from '../../../public/modal/contract-view-modal.component';
import {HonourViewModalComponent} from '../../../public/modal/honour-view-modal.component';
import {InvoiceViewModalComponent} from '../../../public/modal/invoice-view-modal.component';
import {ReportExcelModalComponent} from '../../../public/modal/report-excel-modal.component';

@Component({
    templateUrl: './report-form-detail.component.html',
    styles: [
        `.table { font-size: 13px; }`,
        `.btn-right { float: right }`,
        `.btn { padding: 4px 12px; }`,
        `.btn-export {  }`
    ]
})
export class ReportFormDetailComponent implements OnInit {

    pageTitle = '主流程信息';
    pageDesc = '';

    showEnterprise = true;

    total = 0;
    pageSize = 10;
    items: any[] = [];
    data: any = {};
    mainFlowId: any;
    honourNum: any;

    constructor(private xn: XnService, private vcr: ViewContainerRef, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            console.log('params: ', params);
            this.mainFlowId = params['mainFlowId'];
            this.honourNum = params['honourNum'];

            this.xn.api.post('/flow/bill_main/info', {
                mainFlowId: this.mainFlowId,
                honourNum: this.honourNum
            }).subscribe(json => {
                console.log('report-form-detail: ', json);
                this.data = json.data.data;

                // 解析JSON
                this.analyzeJson();

            });
        });
    }

    analyzeJson() {
        let orgInfos = ['supplierInfo', 'factoringInfo', 'enterpriseInfo'];
        for (let info of orgInfos) {
            if (this.data[info] && this.data[info] !== '') {
                this.data[info] = JSON.parse(this.data[info]);
            }
        }
    }

    onViewContract(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, ContractViewModalComponent, item).subscribe(() => {
        });
    }

    onViewHonour(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, HonourViewModalComponent, item).subscribe(() => {
        });
    }

    onViewInvoice(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, InvoiceViewModalComponent, item).subscribe(() => {
        });
    }

    exportExcel(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, ReportExcelModalComponent, item).subscribe(() => {
        });
    }
}
