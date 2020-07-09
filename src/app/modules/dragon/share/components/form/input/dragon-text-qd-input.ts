import { Component, OnInit, ElementRef, Input, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { SelectOptions } from '../../../../../../config/select-options';
import { XnService } from '../../../../../../services/xn.service';
import { DragonPdfSignModalComponent } from '../../../modal/pdf-sign-modal.component';

@Component({
    selector: 'dragon-text-qd',
    template: `
    <div style='width:100%'>
        <div class="form-control xn-input-font xn-input-border-radius readonlystyle">
            <div class="label-line">
                {{label | xnSelectDeepTransform:'productType_dw'}}
            </div>
        </div>
    </div>
    `,
    styles: [
        `
        .readonlystyle {
            background:#eee;
            pointer-events: none;
            cursor: not-allowed;
        }
        `
    ]
})
// 查看二维码checker项
@DynamicForm({ type: 'text-qd', formModule: 'dragon-input' })
export class VanketextQdInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    myClass = '';
    alert = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;
    label: any;
    readonly: boolean = false;

    constructor(private xn: XnService,
        private er: ElementRef,
        private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.readonly = this.row.options && this.row.options.readonly && (this.row.options.readonly === 1 || this.row.options.readonly === true)
            ? true : false;
        if (!!this.row.value) {
            this.label = JSON.parse(this.row.value);
        }
    }
}

