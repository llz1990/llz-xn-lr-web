import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
@Component({
    template: `
   <div>
   <ul class='ul-style'>
   <li *ngFor='let item of items'>
   <input type="checkbox" name="single" [checked]="item['checked']"
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
@DynamicForm({ type: 'change-program', formModule: 'dragon-input' })
export class MachinechangeInfoComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    ctrl: AbstractControl;


    public items = [{
        label: '应收账款金额', value: 'isReceive', checked: false
    },
    {
        label: '转让价款', value: 'isChangePrice', checked: false
    },
    {
        label: '项目名称', value: 'isProjectName', checked: false
    }
    ];


    constructor(
        private xn: XnService,
        private vcr: ViewContainerRef) {
    }


    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        if (!!this.row.value) {
            let data = JSON.parse(this.row.value);
            data.map((val)=>{
                val['label'] = this.items.find(item=>item['value']===val['value']).label;
            });
            this.items = data;
        }
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
        this.toValue();
    }
    toValue() {
        let currentItem = this.items.filter(x => x.checked === true);
        if (currentItem.length === 0) {
            this.ctrl.setValue('');
        } else {
            let value = [];
            this.deepCopy(this.items, value);
            value.forEach(x => {
                delete x.label;
            });
            this.ctrl.setValue(JSON.stringify(value));
        }



    }
    deepCopy(obj, c?: any) {
        c = c || {};
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                c[i] = obj[i].constructor === Array ? [] : {};
                this.deepCopy(obj[i], c[i]);
            } else {
                c[i] = obj[i];
            }
        }
        return c;
    }



}
