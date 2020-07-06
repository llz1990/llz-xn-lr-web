import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { XnService } from '../../../../services/xn.service';
import { DynamicForm } from '../../dynamic.decorators';
import { HwModeService } from '../../../../services/hw-mode.service';


@Component({
    template: `
    <div style='width:100%'>
        <div class="form-control xn-input-font xn-input-border-radius" id="text-id">
            <a class="xn-click-a" (click)="onView(label, 50)">
                {{label}}
            </a>
        </div>
    </div>
    `,
    //styleUrls: ['../show-avenger-input.component.css']
})
@DynamicForm({ type: 'text-id', formModule: 'default-show' })
export class DragonTextIdComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;

    public label = '';

    constructor(private xn: XnService, public hwModeService: HwModeService) {
    }

    ngOnInit() {
        console.log("this row", this.row);
        this.label = this.row.data;
    }

    // /**
    //  * 查看交易详情
    //  * @param paramMainFlowId
    //  */
    // public onView(paramMainFlowId: string) {
    //     this.xn.router.navigate([
    //         `console/main-list/detail/${paramMainFlowId}`
    //     ]);

    // }

    /**
     * 查看流程记录
     * @param paramMainFloId
     */
    public onView(paramMainFloId: string, isProxy?: any, currentStatus?: string) {
        if (this.row.checkerId === 'specialVerify') {
            this.xn.router.navigate([`/dragon/record/todo/view/${paramMainFloId}`]);
        } else {
            this.xn.router.navigate([
                `dragon/main-list/detail/${paramMainFloId}`
            ]);
        }
    }
}
