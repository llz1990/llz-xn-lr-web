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

import { Component, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import DragonInfos from '../../bean/checkers.tab';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
import { DragonViewContractModalComponent } from '../../../modal/dragon-mfile-detail.modal';
import { UploadPicService } from '../../../../../../services/upload-pic.service';



@Component({
  selector: 'dragon-contract-show',
  template: `
  <table class="table table-bordered text-center" style='float:left'>
  <thead>
    <tr class="table-head">
      <!-- 全选按钮 -->
      <!-- title -->
      <th>序号</th>
      <th>
        合同扫描件
      </th>
      <!-- 行操作 -->
  </thead>

  <tbody>
    <ng-container *ngIf="items.length>0">
      <tr *ngFor="let sub of items;let i=index">
        <ng-container>
          <td>
            <span>{{i+1}}</span>
          </td>
          <td><a href='javascript:void(0)' (click)="fileView(sub)">
            {{(sub | xnJson).length>1 ? (sub | xnJson)[0].fileName + '，...' : (sub | xnJson)[0].fileName}}</a>
          </td>
        </ng-container>
      </tr>
    </ng-container>

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
@DynamicForm({ type: 'deal-contract', formModule: 'dragon-show' })
export class DragonContractShowComponent implements OnInit {

  @Input() row: any;
  @Input() form: FormGroup;
  @Input() svrConfig: any;

  public items: any[] = [];
  public Tabconfig: any;
  // public amountAll: number;// 合同总金额

  constructor(private xn: XnService,
    private vcr: ViewContainerRef, private uploadPicService: UploadPicService) {
  }

  ngOnInit() {
    this.items = JSON.parse(this.row.data);
    // if (this.items.filter(v => v && v.contractMoney).length > 0) {
    //   this.amountAll = this.computeSum(this.items.filter(v =>
    //     v && v.contractMoney).map(v => Number(this.ReceiveData(v.contractMoney)))).toFixed(2) || 0;
    //   this.items.forEach(item => item.contractMoney = Number(item.contractMoney).toFixed(2))
    // } else {
    //   this.amountAll = 0;
    // }
    // console.info('this.items', this.items);
  }
  // // 具体到单个数组的求和
  // private computeSum(array) {
  //   return array.reduce((prev, curr) => {
  //     return prev + curr;
  //   });
  // }
  // 计算应收账款转让金额
  // public ReceiveData(item: any) {
  //   let tempValue = item.replace(/,/g, '');
  //   tempValue = parseFloat(tempValue).toFixed(2);
  //   return Number(tempValue);
  // }
  fileView(paramsItem) {
    this.xn.dragon.post('/contract_temporary/view', { mainFlowId: this.svrConfig.record.mainFlowId }).subscribe(x => {
      if (x.ret === 0) {
        let datainfo = { contractFile: '' };
        if (x.data.data.contractType === undefined) {
          // datainfo = paramsItem;
          datainfo.contractFile = paramsItem;
        } else {
          datainfo = {...x.data.data,contractFile:paramsItem};
        }
        // datainfo.contractFile = JSON.stringify(paramsItem);
        this.uploadPicService.viewDetail(datainfo, this.vcr, DragonViewContractModalComponent);
      }

    });
  }




}
