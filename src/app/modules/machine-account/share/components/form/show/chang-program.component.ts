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
   <div>
   <ul class='ul-style'>
   <li *ngFor='let item of items'>
   <input type="checkbox" name="single" disabled [checked]="item['checked']"
   (change)="singleChecked(item,i)" /><span>{{item.label}}</span>
   </li>
   </ul>
   </div>
    `,
    styles: [
        `.ul-style {
            list-style: none;
            padding-left: 0px;
        }
        `
    ]
})
@DynamicForm({ type: 'change-program', formModule: 'dragon-show' })
export class MachinechangeInfoShowComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;

    public items = [{
        label: '应收账款金额', value: 'receive', checked: false
    },
    {
        label: '转让价款', value: 'changePrice', checked: false
    },
    {
        label: '项目名称', value: 'programName', checked: false
    }
    ];


    constructor(
        private xn: XnService,
        private vcr: ViewContainerRef) {
    }


    ngOnInit() {
        const data = JSON.parse(this.row.data);
        this.items.forEach((item, index) => {
            item.checked = data[index].checked;
        });
        console.log(this.items);



    }

    /**
         * 单选
         * @param paramItem
         * @param index
         */
    public singleChecked(paramItem) {
        if (paramItem['checked'] && paramItem['checked'] === true) {
            paramItem['checked'] = false;
        } else {
            paramItem['checked'] = true;
        }
    }



}
