import { ChangeDetectionStrategy, Component, OnInit, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { XnService } from '../../../../../../services/xn.service';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { PublicCommunicateService } from '../../../../../../services/public-communicate.service';
import { LocalStorageService } from '../../../../../../services/local-storage.service';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { ignoreElements } from 'rxjs/operator/ignoreElements';


@Component({
    selector: 'dragon-search-select-input',
    template: `
    <div [formGroup]="form">
        <select class="form-control xn-input-font"  [formControlName]="row.name" 
            (change)="onSelectChange($event)" [ngClass]="myClass">
            <option value="">请选择</option>
            <option *ngFor="let option of row.selectOptions" value="{{option.value}}">{{option.label}}</option>
        </select>
    </div>
    <span class="xn-input-alert">{{alert}}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,

})
@DynamicForm({ type: 'search-select', formModule: 'dragon-input' })
export class DragonSearchSelectInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig?: any;

    myClass = '';
    alert = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;
    config: any = {
        post_url: '/contract/first_contract_info/get_org_project',
        post_url_vk: '/contract/first_contract_info/get_wk_project'
    };
    constructor(private er: ElementRef, private xn: XnService,
        private publicCommunicateService: PublicCommunicateService,
        private cdr: ChangeDetectorRef,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        console.log(this.svrConfig);
        this.ctrl = this.form.get(this.row.name);
        this.onInitOptions();
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    public onInitOptions() {
        let params: any = {};
        let url = this.config.post_url;
        if(this.svrConfig && this.svrConfig.flowId === 'vanke_financing_pre'){
            //万科预录入
            url = this.config.post_url_vk;
        }
        this.xn.dragon.post(url, params).subscribe(x => {
            if (x.ret === 0 && x.data && x.data[this.row.checkerId]) {
                this.row.selectOptions = x.data[this.row.checkerId].map((option) => {
                    return { label: option, value: option };
                });
            }else {
                this.row.selectOptions = [];
            }
        }, () => {
            this.row.selectOptions = [];
        }, () => {
            this.cdr.markForCheck();
        });
    }

    public onSelectChange(e) {
        // console.log(e);
    }
}
