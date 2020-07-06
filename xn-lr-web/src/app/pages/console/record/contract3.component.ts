import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import {XnUtils} from '../../../common/xn-utils';
import {XnModalUtils} from '../../../common/xn-modal-utils';
import {PdfSignModalComponent} from '../../../public/modal/pdf-sign-modal.component';
import {XnService} from '../../../services/xn.service';

@Component({
    selector: 'xn-contract3',
    templateUrl: './contract3.component.html',
    styles: [
            `.control-label {
            font-size: 12px;
            font-weight: bold
        }`,
            `.control-desc {
            font-size: 12px;
            padding-top: 7px;
            margin-bottom: 0;
            color: #999
        }`,
            `.download {
            padding-left: 20px
        }`
    ]
})
export class Contract3Component implements OnInit {

    @Input() contracts: string;
    @Input() flow?: string;
    rows: any[] = [];

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        if (XnUtils.isEmpty(this.contracts)) {
            this.rows = [];
        } else {
            this.rows = JSON.parse(this.contracts);
        }
    }

    showContract(id, secret, label) {
        console.log('showContract');
        XnModalUtils.openInViewContainer(this.xn, this.vcr, PdfSignModalComponent, {
            id: id,
            secret: secret,
            label: label,
            readonly: true
        }).subscribe(v2 => {
            // 啥也不做
        });
    }

    downContract(id, secret, label) {
        const filename = label + '.pdf';
        this.xn.api.download('/contract/pdf', {
            id: id,
            secret: secret,
        }).subscribe((v: any) => {
            console.log('download subscribe');
            this.xn.api.save(v._body, filename);
        });
    }
}
