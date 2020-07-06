import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {XnModalUtils} from '../../../common/xn-modal-utils';
import {PdfSignModalComponent} from '../../../public/modal/pdf-sign-modal.component';

@Component({
    templateUrl: './message.component.html',
    styles: [
            `.table {
            font-size: 13px;
        }`,
    ]
})
export class MessageComponent implements OnInit {

    pageTitle = '系统消息';
    pageDesc = '';
    tableTitle = '系统消息';

    total = 0;
    pageSize = 10;
    items: any[] = [];
    page: number;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.onPage(1);
    }

    onPage(page: number) {
        this.page = page || 1;
        this.xn.api.post('/message/get_msg', {
            start: (this.page - 1) * this.pageSize,
            length: this.pageSize
        }).subscribe(json => {
            console.log(json);
            this.total = json.data.recordsTotal;
            this.items = json.data.data;
            for (let item of this.items) {
                item.msgObj = JSON.parse(item.msg);
            }
        });
    }

    onViewMainFlow(mainFlowId: string) {
        this.xn.router.navigate([`/console/flow/detail/${mainFlowId}`]);
    }

    onViewContract(item: any, id: string, secret: string, label: string) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, PdfSignModalComponent, {
            id: id,
            secret: secret,
            label: label,
            readonly: true
        }).subscribe(() => {
            if (item.status !== 1) {
                this.xn.api.post('/message/read_msg', {
                    systemMessageIds: [item.systemMessageId]
                }).subscribe(() => {
                    // 更新状态
                    item.status = 1;
                });
            }
        });
    }

    setRead() {
        let ids = this.items.filter(item => item.status === 0).map(item => item.systemMessageId);
        if (ids.length === 0) {
            return;
        }

        this.xn.api.post('/message/read_msg', {
            systemMessageIds: ids
        }).subscribe(() => {
            // 刷新页面
            this.onPage(this.page);
        });
    }
}
