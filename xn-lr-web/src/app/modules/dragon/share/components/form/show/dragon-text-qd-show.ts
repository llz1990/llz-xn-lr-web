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
    selector: 'dragon-text-qd-show',
    template: `
    <div style='width:100%'>
        <div class="form-control xn-input-font xn-input-border-radius">
            <div class="label-line">
                {{label | xnSelectDeepTransform:'productType_dw'}}
            </div>
        </div>
    </div>
    `,
})
// 查看二维码checker项
@DynamicForm({ type: 'text-qd', formModule: 'dragon-show' })
export class VanketextQdShowComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    label: any;

    constructor(private xn: XnService,
        private er: ElementRef,
        private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        console.log(this.row);
        if (!!this.row.data) {
            this.label = JSON.parse(this.row.data);
        }
    }
}

