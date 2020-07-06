import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import { XnUtils } from '../../../../../common/xn-utils';
import { XnService } from '../../../../../services/xn.service';
import { AvengerPdfSignModalComponent } from '../../modal/pdf-sign-modal.component';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';
import { HwModeService } from '../../../../../services/hw-mode.service';

@Component({
    selector: 'xn-avenger-contract',
    templateUrl: './contract.component.html',
    styles: [
            `.control-label {
            font-size: 12px;
            font-weight: bold
        }

        .control-desc {
            font-size: 12px;
            padding-top: 7px;
            margin-bottom: 0;
            color: #999
        }

        .row {
            margin-bottom: 15px;
        }

        .down-btn {
            margin-left: 20px;
        }
        `
    ]
})
export class AvengerContractComponent implements OnInit {

    @Input() set contracts(value) {
        if (XnUtils.isEmpty(value)) {
            this.rows = [];
        } else {
            this.rows = typeof value === 'string' ? JSON.parse(value) : value;
        }
    }

    public rows: any[] = [];

    constructor(private xn: XnService, private vcr: ViewContainerRef, private hwModeService: HwModeService) {
    }

    ngOnInit() {
        // if (XnUtils.isEmpty(this.contracts)) {
        //     this.rows = [];
        // } else {
        //     this.rows = JSON.parse(this.contracts);
        // }
        // this.rows = this.contracts;
        // console.log('合同显示', this.rows);
    }

    // 显示合同
    showContract(id, secret, label) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, AvengerPdfSignModalComponent, {
            id: id,
            secret: secret,
            label: label,
            readonly: true
        }).subscribe(v2 => {
            // 啥也不做
        });
    }

    // 下载合同
    downContract(val: any) {
        this.hwModeService.downContract(val.id, val.secret, val.label);
    }
}
