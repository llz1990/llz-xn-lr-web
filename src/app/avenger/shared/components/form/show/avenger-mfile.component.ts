import { Component, Input, OnInit, ViewContainerRef,ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicForm } from '../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../services/xn.service';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';
import { FileViewModalComponent } from '../../../../../public/modal/file-view-modal.component';
import { ShowViewModalComponent } from '../../../../../public/modal/show-view-modal.component';
import { AvengerPdfSignModalComponent } from '../../modal/pdf-sign-modal.component';
import { DragonMfilesViewModalComponent } from '../../../../../modules/dragon/share/modal/mfiles-view-modal.component';

@Component({
    template: `
    <div class="form-control xn-input-font xn-input-border-radius" style='height:auto;min-height:35px'>
      <div *ngFor="let item of items" class="label-line">
      <ng-container *ngIf="!!item.fileName">
          <td>
            <a class="xn-click-a" (click)="onView(item)">{{item?.fileName}}</a>
          </td>
        </ng-container>
        <ng-container *ngIf="!!item.url">
          <a class="xn-click-a" (click)="onView(item)">{{item.label}}</a>
        </ng-container>
        <ng-container *ngIf="!!item.secret">
          <a class="xn-click-a" (click)="showContract(item)">{{item.label}}</a>
        </ng-container>
      </div>
    </div>
    `,
  //  styleUrls: ['../show-avenger-input.component.css']
})
@DynamicForm({ type: 'mfile', formModule: 'avenger-show' })
export class AvengerMultiFileComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig?: any;

    public items: any[] = [];

    constructor(
        private xn: XnService,private er: ElementRef,
        private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        const data = this.row.data;
        if (!!data) {
            const json = JSON.parse(data);

            if (!!this.svrConfig.record.mainFlowId
                && (this.svrConfig.record.mainFlowId.endsWith('wk') || this.svrConfig.record.mainFlowId.endsWith('lg'))) {
                // console.info('data==>', data);
                if (this.row.name === 'tripleAgreement') {
                    this.showRow();
                    this.items = json;
                } else {
                    this.items = json;
                }
            } else if (this.svrConfig.record.flowId === 'sub_factoring_change_520'
                && this.svrConfig.procedure.procedureId === 'review') {
                let mainFlowId = this.svrConfig.actions[0].checkers.filter(x => x.checkerId === 'mainFlowId')[0].data;
                if (mainFlowId.endsWith('wk') || mainFlowId.endsWith('lg')) {
                    this.items = json;
                } else {
                    this.items = [];
                    for (const item of json) {
                        if (item.secret) {
                            this.items.push(item);
                        } else {
                            this.items.push({
                                url: this.xn.file.view({ ...item, isAvenger: true }),
                                label: item.fileName
                            });
                        }
                    }
                }
                // console.info('eee==>', this.form.value);
            } else {
                this.items = [];
                for (const item of json) {
                    if (item.secret) {
                        this.items.push(item);
                    } else {
                        this.items.push({
                            url: this.xn.file.view({ ...item, isAvenger: true }),
                            label: item.fileName
                        });
                    }
                }
            }
        }else if (this.row.name === 'tripleAgreement') {
            this.hideRow();
        }
    }

    /**
     *  查看文件
     * @param paramFile
     */
    public onView(paramFile: any): void {
        if (this.row.name === 'ipoFile') {
            const params = { ...JSON.parse(this.row.data)[0], isAvenger: false };
            XnModalUtils.openInViewContainer(this.xn, this.vcr, FileViewModalComponent, params).subscribe(() => {
            });
        }

        if (!!this.svrConfig.record.mainFlowId &&
            (this.svrConfig.record.mainFlowId.endsWith('wk') || this.svrConfig.record.mainFlowId.endsWith('lg'))) {
            XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, [paramFile]).subscribe(x => {

            });
        } else if (this.svrConfig.record.flowId === 'sub_factoring_change_520'
            && this.svrConfig.procedure.procedureId === 'review') {
            let mainFlowId = this.svrConfig.actions[0].checkers.filter(x => x.checkerId === 'mainFlowId')[0].data;
            if (mainFlowId.endsWith('wk') || mainFlowId.endsWith('lg')) {
                XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, [paramFile]).subscribe(x => {

                });
            }

        } else {
            XnModalUtils.openInViewContainer(this.xn, this.vcr, ShowViewModalComponent, paramFile).subscribe();

        }

    }

    /**
     *  查看合同
     * @param paramContract
     */
    public showContract(paramContract: any) {
        const params = Object.assign({}, paramContract, { readonly: true });
        XnModalUtils.openInViewContainer(this.xn, this.vcr, AvengerPdfSignModalComponent, params).subscribe();
    }

    private showRow(): void {
        $(this.er.nativeElement).parents('.form-group').show();
    }

    private hideRow(): void {
        $(this.er.nativeElement).parents('.form-group').hide();
    }
}
