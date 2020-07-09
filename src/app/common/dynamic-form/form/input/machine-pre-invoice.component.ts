import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../dynamic.decorators';
import { InvoiceUploadService } from '../../../../services/invoice-upload.service';
import { XnUtils } from '../../../xn-utils';

@Component({
  template: `

  <div [formGroup]="form">
  <table class="table table-bordered text-center table-hover">
    <thead>
    <tr>
      <td>发票号码</td>
      <td>是否已上传</td>
    </tr>
    </thead>
  </table>
  <div class="scroll-height">
    <table class="table table-bordered text-center table-hover">
      <ng-container *ngIf="items?.list&&items.list.length">
        <tr *ngFor="let item of items?.list">
          <td>{{item.invoiceNum}}</td>
          <td [ngClass]="{'red':item.status !== 1}">{{item.status===1?'√':'X'}}</td>
        </tr>
      </ng-container>
    </table>
  </div>
  <table class="table table-bordered text-center table-hover"  *ngIf="items?.list&&items.list.length">
    <tr>
      <td>总额</td>
      <td>{{items?.amountAll | xnMoney}}</td>
    </tr>
  </table>
</div>

    `,
  styles: [`
    table {
      table-layout: fixed;
      margin: 0;
  }

  table tr td:first-child {
      width: 300px;
  }

  .scroll-height {
      max-height: 300px;
      overflow-y: auto;
  }

  .scroll-height > table {
      border-bottom: none;
      border-top: none;
  }

  .scroll-height > table tr:first-child td {
      border-top: 0;
  }

  .scroll-height > table tr:last-child td {
      border-bottom: 0;
  }
`]
})
@DynamicForm({ type: 'pre-invoice', formModule: 'default-input' })
export class PreInvoiceComponent implements OnInit {
  @Input() row: any;
  @Input() form: FormGroup;
  private ctrl: AbstractControl;

  public items: any;

  constructor(private invoiceUpload: InvoiceUploadService) {
    this.invoiceUpload.change.subscribe(x => {
      console.log('提单的发票', this.items, '已上传并验证的发票==>', x);
      this.items.list.forEach(ele => {
        if (ele.invoiceNum && ele.invoiceNum === x.value) {
          ele.status = x.change;
        }
      });
      this.ctrl.setValue(JSON.stringify(this.items));
    });
  }

  public ngOnInit() {
    this.ctrl = this.form.get(this.row.name);
    this.items = XnUtils.parseObject(this.ctrl.value, []);
  }
}
