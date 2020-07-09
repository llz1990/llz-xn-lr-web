/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：profit-table-input.component.ts
 * @summary：龙光供应商上传资料复核交易合同控件
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing            增加             2019-08-29
 * **********************************************************************
 */

import { Component, OnInit, Input, ElementRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import DragonInfos from '../../bean/checkers.tab';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
import { DragonViewContractModalComponent } from '../../../modal/dragon-mfile-detail.modal';
import { UploadPicService } from '../../../../../../services/upload-pic.service';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { EditModalComponent } from '../../../modal/edit-modal.component';
import { DragonMfilesViewModalComponent } from '../../../modal/mfiles-view-modal.component';
import { JsonTransForm } from '../../../../../../public/pipe/xn-json.pipe';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { s } from '@angular/core/src/render3';



@Component({
    selector: 'dragon-contract-show',
    template: `
  <table class="table table-bordered text-center" style='float:left'>
  <thead>
    <tr class="table-head" *ngFor='let item of items;let i=index'>

      <th>{{item.label}}</th>
      <th>
      <app-dynamic-show [row]="item" [form]="form" [svrConfig]="svrConfig" [formModule]="fromModule">
      </app-dynamic-show></th>

  </thead>

  <tbody>
  </tbody>
</table>
    `,
    styles: [
        `
            .button-reset-style {
                font-size: 12px;
                padding: 5px 35px;
                color: #3c8dbc;
            }

            .tip-memo {
                color: #9A9A9A;
            }
            .tag-color {
                color: #f20000;;
            }
        `
    ]
})
@DynamicForm({ type: 'contractList', formModule: 'dragon-show' })
export class VankeContractbackUploadshowComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    public items: any[] = [];
    fromModule: string = 'dragon-show';

    // public amountAll: number;// 合同总金额
    constructor(private xn: XnService,
        private vcr: ViewContainerRef, private uploadPicService: UploadPicService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.items = JSON.parse(this.row.data);
        this.items.forEach((x, index) => {
            x.checkerId = 'file' + index;
            x.name = x.name;
            x.type = 'mfile-info';
            x.title = x.name;
            x.data = x.file;
            x.label = x.name;
            x.options = '{"filename": "交易合同","fileext": "jpg, jpeg, png, pdf", "picSize": "500"}';
            // XnFormUtils.convertChecker(x);
        },
        );
        // console.info('file==>', this.items);
    }
}
