import { ChangeDetectionStrategy, Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { DynamicForm } from '../../dynamic.decorators';
import { PublicCommunicateService } from '../../../../services/public-communicate.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { XnFormUtils } from '../../../xn-form-utils';
import { XnService } from '../../../../services/xn.service';


@Component({
    templateUrl: './select-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
@DynamicForm({ type: 'select', formModule: 'default-input' })
export class SelectInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    myClass = '';
    alert = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;

    constructor(private xn: XnService, private er: ElementRef,
        private publicCommunicateService: PublicCommunicateService,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        if (this.row.name === 'vankeAgency') {
            this.xn.dragon.post('/project_manage/agency/project_agency_list',
                { project_manage_id: this.row.value1 }).subscribe(x => {
                    if (x.ret === 0) {
                        this.row.selectOptions = x.data.rows;
                    }
                });
        }
        // if (this.row.name === 'headquartersSelected') {
        //     this.ctrl.setValue('万科');
        // }
        this.calcAlertClass();
        this.ctrl.valueChanges.subscribe(v => {
            this.ctrl.markAsTouched();
            this.calcAlertClass();
            // 改变状态
            this.publicCommunicateService.change.emit(v);
        });
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    onBlur() {
        this.calcAlertClass();
    }

    private calcAlertClass() {
        // this.localStorageService.setCacheValue('headquarters', v);
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }
}
