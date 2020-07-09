import { Component, OnInit, ElementRef, Input, ChangeDetectionStrategy, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { CheckersOutputModel } from '../../../../../../config/checkers';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { DragonViewContractModalComponent } from '../../../modal/dragon-mfile-detail.modal';
import { XnUtils } from '../../../../../../common/xn-utils';
import { XnService } from '../../../../../../services/xn.service';
import { LocalStorageService } from '../../../../../../services/local-storage.service';
import { PublicCommunicateService } from '../../../../../../services/public-communicate.service';
declare const moment: any;
@Component({
  template: `
    <div class="input-group" style="width: 100%" [formGroup]="form">
    <table class="table table-bordered table-hover file-row-table text-center" width="100%" >
      <thead>
      <tr>
        <th>
          <span class="span-line">供应商</span>
        </th>
        <td>
          <span class="span-line">{{items.debtUnit}}</span>
        </td>
        <th>
          <span class="span-line">企业类型</span>
        </th>
        <td>
        <span class="span-line">{{items.econKind}}</span>
      </td>
      </tr>
      <tr>
        <th>
          <span class="span-line">统一社会信用代码</span>
        </th>
        <td>
          <span class="span-line">{{items.creditCode}}</span>
        </td>
        <th>
          <span class="span-line">营业期限</span>
        </th>
        <td>
        <span class="span-line">{{items.term}}</span>
      </td>
      </tr>
      <tr>
        <th>
          <span class="span-line">法定代表人</span>
        </th>
        <td>
          <span class="span-line">{{items.operName}}</span>
        </td>
        <th>
          <span class="span-line">成立日期</span>
        </th>
        <td>
        <span class="span-line">{{items.startDate}}</span>
      </td>
      </tr>
      <tr>
        <th>
          <span class="span-line">注册资本</span>
        </th>
        <td>
          <span class="span-line">{{items.registCapi}}</span>
        </td>
        <th>
          <span class="span-line">登记机关</span>
        </th>
        <td>
        <span class="span-line">{{items.belongOrg}}</span>
      </td>
      </tr>
      <tr>
        <th>
          <span class="span-line">所属行业</span>
        </th>
        <td colspan='3'>
          <span class="span-line">{{items.debtUnit}}</span>
        </td>

      </tr>
      <tr>
        <th>
          <span class="span-line">注册地址</span>
        </th>
        <td colspan='3'>
          <span class="span-line">{{items.address}}</span>
        </td>
      </tr>
      <tr>
      <th>
        <span class="span-line">经营范围</span>
      </th>
      <td colspan='3'>
        <span class="span-line">{{items.scope}}</span>
      </td>
    </tr>
      </thead>
    </table>
  </div>
  <span class="xn-input-alert">{{alert}}</span>

    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../show-dragon-input.component.css'],

})
// 获取移动端图片checker项
@DynamicForm({ type: 'businessInfo', formModule: 'dragon-input' })
export class VankeBusinessInfoComponent implements OnInit {
  @Input() row: any;
  @Input() form: FormGroup;
  @Input() svrConfig: any;
  public alert = '';
  public ctrl: AbstractControl;
  public xnOptions: XnInputOptions;

  public items: any;

  public constructor(private xn: XnService,
    private er: ElementRef,
    private vcr: ViewContainerRef, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.ctrl = this.form.get(this.row.name);
    this.items = JSON.parse(this.row.value);
  }
}
