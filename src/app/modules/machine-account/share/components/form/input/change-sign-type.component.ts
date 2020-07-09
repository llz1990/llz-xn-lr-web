import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
import { XnUtils } from '../../../../../../common/xn-utils';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { ViewInvoiceSingleModalComponent } from '../../../modal/invoice-view-single.modal';

declare const moment: any;

@Component({
    template: `
    <table class="table table-bordered table-hover file-row-table" width="100%">
    <thead>
      <tr>
        <th>序号</th>
        <th>交易id</th>
        <th>收款单位</th>
        <th>项目公司</th>
        <th>应收账款金额</th>
        <th>签署方式</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of items;let i=index">
        <td>{{i+1}}</td>
        <td>{{item.mainFlowId}}</td>
        <td>{{item.debtUnit}}</td>
        <td>{{ item.projectCompany }}</td>
        <td>{{ item.receive.toFixed(2)|xnMoney }}</td>
        <td>{{item.signType | xnSelectTransform:'signType'}}</td>
      </tr>
    </tbody>
  </table>
    `,
    //styleUrls: ['../show-avenger-input.component.css']
})
@DynamicForm({ type: 'set-signType', formModule: 'dragon-input' })
export class setSignTypeComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    amountAll = 0;
    dateCheckTemp = false;

    public items: any[] = [];


    constructor(
        private xn: XnService,
        private vcr: ViewContainerRef) {
    }


    ngOnInit() {
        this.items = this.row.value;
    }



}
