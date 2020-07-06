import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../dynamic.decorators';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { XnFormUtils } from '../../../xn-form-utils';
import { XnService } from '../../../../services/xn.service';
import { XnUtils } from '../../../xn-utils';
import XnFlowUtils from '../../../xn-flow-utils';
import { LoadingService } from '../../../../services/loading.service';

@Component({
    selector: 'xn-radio-input',
    templateUrl: './radio-input.component.html',
    styles: [
        `.xn-radio-row {
            padding-top: 7px;
        }`,
        `.xn-radio-row label {
            font-weight: normal;
            margin: 0 10px;
        }`,
        `.xn-radio-row button:focus {
            outline: none
        }`, // 去掉点击后产生的边框
    ]
})
@DynamicForm({ type: 'radio', formModule: 'default-input' })
export class RadioInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;

    myClass: string = '';
    alert: string = '';
    showClearBtn: boolean = false;
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;

    constructor(private er: ElementRef, private xn: XnService,
        private loading: LoadingService,
    ) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.calcAlertClass();

        this.ctrl.valueChanges.subscribe(v => {
            if (this.row.flowId === 'vanke_platform_verify' && v === '1') {
                this.xn.msgBox.open(true, '即将发起【特殊事项审批流程】', () => {
                    this.temporaryStorage();
                    this.xn.router.navigate([`/dragon/record/new/`],
                        {
                            queryParams: {
                                id: 'sub_special_start',
                                relate: 'mainFlowId',
                                relateValue: this.svrConfig.record.mainFlowId,
                            }
                        });
                }, () => {
                    this.ctrl.setValue('');

                });

            }
            this.showClearBtn = true;
            this.calcAlertClass();
        });
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    private calcAlertClass() {
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    onClear() {
        this.showClearBtn = false;
        this.ctrl.setValue(null);

    }
    /**
   *  暂存
*/
    temporaryStorage(): void {
        for (const checker of this.svrConfig.checkers) {
            if (checker.options && checker.options.readonly) {
                this.form.value[checker.checkerId] = checker.value;
            }
        }
        const formValue: any = this.form.value;
        const params: any = {
            recordId: this.svrConfig.record.recordId,
            flowId: this.svrConfig.flow.flowId,
            procedureId: this.svrConfig.procedure.procedureId,
            memo: formValue.memo,
            checkers: XnFlowUtils.buildSubmitCheckers(this.svrConfig.checkers, formValue),
            contracts: this.svrConfig.contracts,
        };
        XnUtils.checkLoading(this);
        this.xn.api.dragon.post(`/flow/temporarySave`, params)
            .subscribe(() => {
                this.loading.close();
                // this.afterSubmit(this.svrConfig.flow.flowId, this.svrConfig.record.mainFlowId, this.svrConfig.record.nowProcedureId);
            });
    }
}
