import { Component, Input, OnInit, ViewContainerRef, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnService } from '../../../../../../services/xn.service';
import { XnUtils } from '../../../../../../common/xn-utils';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { ViewInvoiceSingleModalComponent } from '../../../modal/invoice-view-single.modal';
import { EditModalComponent } from '../../../../../dragon/share/modal/edit-modal.component';
import { HwModeService } from '../../../../../../services/hw-mode.service';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import { LoadingPercentService } from '../../../../../../services/loading-percent.service';
import { UploadPicService } from '../../../../../../services/upload-pic.service';
import { isNullOrUndefined } from 'util';
import { DragonMfilesViewModalComponent } from '../../../../../dragon/share/modal/mfiles-view-modal.component';

declare const moment: any;

@Component({
    template: `
    <table class="table table-bordered table-hover file-row-table" width="100%">
    <thead>
      <tr>
        <th>序号</th>
        <th>交易id</th>
        <th>付款确认书编号</th>
        <th>收款单位</th>
        <th>申请付款单位</th>
        <th>交易状态</th>
        <th>应收账款金额</th>
        <th>退单原因</th>
        <th *ngIf="row.flowId==='sub_platform_check_retreat'
        || row.flowId==='sub_factoring_verify_retreat' ">撤销登记证明文件</th>
        <th *ngIf="row.flowId!=='sub_factoring_verify_retreat'">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of items;let i=index">
        <td>{{i+1}}</td>
        <td style='word-break:break-all'><a href="javaScript:void(0)"
        (click)="hwModeService.DragonviewProcess(item.mainFlowId)">{{item.mainFlowId}}</a></td>
        <td>{{item?.payConfirmId}}</td>
        <td>{{ item?.debtUnit }}</td>
        <td>{{ item?.projectCompany }}</td>
        <td>
            <ng-container *ngIf="item['mainFlowId'].endsWith('lg')">
                {{ item?.tradeStatus | xnSelectTransform:'dragonType' }}
            </ng-container>
            <ng-container *ngIf="item['mainFlowId'].endsWith('wk')">
                {{ item?.tradeStatus | xnSelectTransform:'newVankeType' }}
            </ng-container>
        </td>
        <td style='word-break:break-all'>{{ item?.receive.toFixed(2)| xnMoney}}</td>
        <td style='word-break:break-all'><div style='height:80px;max-height:120px;overflow-y:auto'>{{ item?.stopReason }}</div></td>
        <ng-container *ngIf="row.flowId==='sub_platform_check_retreat'
        || row.flowId==='sub_factoring_verify_retreat'" >
        <td *ngIf="!item.certificateFile || item.certificateFile==''"></td>
        <td *ngIf="item.certificateFile!==''"><a class='xn-click-a' (click)='ViewFile(item.certificateFile)'>
        {{(item.certificateFile | xnJson).length>1 ? (item.certificateFile | xnJson)[0].fileName + '，...' : (item.certificateFile | xnJson)[0].fileName}}
        </a></td>
        </ng-container>
        <ng-container *ngIf="row.flowId!=='sub_factoring_verify_retreat'">

        <td *ngIf="row.flowId!=='sub_platform_check_retreat'">
        <a class="xn-click-a" href="javaScript:void(0)" (click)='getRejectReson(item?.stopReason,i)'>填写退单原因</a></td>
        <td *ngIf="row.flowId==='sub_platform_check_retreat'" style='word-break:break-all'>
        <div style="padding: 2px 5px;" class="btn btn-default btn-file xn-table-upload block">
      <span class="hidden-xs xn-input-font" style='overflow: hidden !important;white-space: normal !important;    display: block;
      width: 50px;'>上传撤销登记证明</span>
      <input type="file" (change)="onSelect($event,i)" (click)="onBeforeSelect($event)" multiple>
    </div>
    </td>
    </ng-container>
      </tr>
    </tbody>
  </table>
    `,
    styles: [`
    table tbody {
        display:block;
        max-height: 200px;
        overflow-y:scroll;
        word-break: break-all;
        -webkit-overflow-scrolling: touch; // 为了滚动顺畅
    }
    table tbody::-webkit-scrollbar {
        display: none; // 隐藏滚动条
    }
    table thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;
    }
    table tbody tr td{
        max-width: 150px;
        word-wrap:break-word"
    }
     `

    ]
})
@DynamicForm({ type: 'retreat-list', formModule: 'dragon-input' })
export class RejectPersonListComponent implements OnInit {
    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig: any;
    public items: any[] = [];
    ctrl: AbstractControl;
    mainForm: FormGroup;
    public files: any[] = [];

    public xnOptions: XnInputOptions;
    public alert = '';

    constructor(
        private xn: XnService,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        public hwModeService: HwModeService,
        private er: ElementRef,
        private loading: LoadingPercentService,
        private uploadPicService: UploadPicService,

    ) {
    }

    getRejectReson(param, index: number) {
        const checkers = [{
            title: '填写退单原因',
            checkerId: 'stopReason',
            type: 'textarea',
            value: param || '',
        }];
        const params = {
            checker: checkers,
            title: '填写退单原因',
            buttons: ['取消', '确定'],
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params).subscribe(x => {
            if (x === null) {
                return;
            } else {
                param = x.stopReason;
                this.items[index].stopReason = x.stopReason;
                this.cdr.markForCheck();
                this.ctrl.setValue(JSON.stringify(this.items));

            }
        });
    }
    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);

        this.items = JSON.parse(this.row.value);
        if (this.row.flowId === 'sub_factoring_retreat') {
            this.items.forEach(x => {
                x.stopReason = '';
            });
        } else if (this.row.flowId === 'sub_platform_check_retreat') {
            this.items.forEach(x => {
                x.certificateFile = '';
            });

        }
        // if (this.row.flowId === 'sub_platform_check_retreat') {
        //     this.ctrl.valueChanges.subscribe(x => {
        //         console.info('xxx=>', x);
        //         if()
        //     });
        // }

    }
    public onBeforeSelect(e) {
        if (e.target.files.length === 0) {
            return;
        }
        this.ctrl.markAsTouched();
    }
    public onSelect(e, paramIndex: number) {
        if (e.target.files.length === 0) {
            return;
        }
        if (e.target.files.length > 10) {
            this.xn.msgBox.open(false, '允许上传文件不能超过10个');
        } else {
            const data = [];
            for (const file of e.target.files) {
                const err = this.validateFileExt(file.name);
                if (!XnUtils.isEmpty(err)) {
                    this.alert = err;
                    // 把file input的值置为空，这样下次选择同一个文件还能触发这个请求
                    $(e.target).val('');
                    return;
                }
                data.push(file);
            }
            this.uploadImg(data, 0, paramIndex);
            $(e.target).val('');
        }

    }
    /**
   *  上传图片
   * @param files
   * @param index
   */
    private uploadImg(files: any[], index: number, paramIndex: number) {
        if (files.length === index) {
            this.files.sort((a: any, b: any): number => {
                if (Number(a.fileName.substr(0, a.fileName.lastIndexOf('.'))) > Number(b.fileName.substr(0, b.fileName.lastIndexOf('.')))) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this.setValueByFiles(paramIndex);
            // 已上传完毕关闭
            this.loading.close();
            return;
        }
        // 打开loading,传入上传的总数，和当前上传的图片
        this.loading.open(files.length, index);
        this.uploadPicService.compressImage(files[index], this.alert, this.row, (blob, file) => {
            const fd = new FormData();
            fd.append('checkerId', this.row.checkerId);
            // FormData.append中如果不带第三个参数，则默认filename属性为blob, file && file.name是为了检测file是否存在
            fd.append('file_data', blob, file && file.name);
            this.xn.file.dragonUpload(fd).subscribe({
                next: v => {
                    if (v.type === 'progress') {
                        this.alert = this.uploadPicService.onProgress(v.data.originalEvent);
                    } else if (v.type === 'complete') {
                        if (v.data.ret === 0) {
                            v.data.data.prevName = (file && file.name) || (blob && blob.name); // filename不存在则检测blobname
                            this.files.push(v.data.data);
                        } else {
                            this.xn.msgBox.open(false, v.data.msg);
                            // 上传失败
                        }
                        index++;
                        setTimeout(() => {
                            this.uploadImg(files, index, paramIndex);
                        }, 1000);
                    } else {
                        // 上传失败
                        this.xn.msgBox.open(false, v.data.msg);
                    }
                },
                error: errs => {
                    this.xn.msgBox.open(false, errs);
                },
                complete: () => {
                    this.ctrl.markAsDirty();
                    this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
                }
            });
        });
    }
    /**
 *  验证文件格式
 * @param s
 */
    private validateFileExt(s: string): string {
        if (!isNullOrUndefined(this.row.options)) {
            if ('fileext' in this.row.options) {
                const exts = this.row.options.fileext.replace(/,/g, '|')
                    .replace(/\s+/g, ''); // 删除所有空格
                if (s.match(new RegExp('\\.(' + exts + ')$', 'i'))) {
                    return '';
                } else {
                    return `只支持以下文件格式: ${this.row.options.fileext}`;
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
    private setValueByFiles(paramIndex) {
        if (this.files.length === 0) {
            this.ctrl.setValue('');


        } else {
            let filesUpload = JSON.stringify(this.files.map(v => {
                return {
                    fileId: v.fileId,
                    fileName: v.fileName,
                    filePath: v.filePath,
                };
            }));
            this.items[paramIndex].certificateFile = filesUpload;
            this.files = [];
            this.ctrl.setValue(JSON.stringify(this.items));



        }
        this.cdr.detectChanges();
    }
    ViewFile(pramFile) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, JSON.parse(pramFile))
            .subscribe(() => {
            });
    }

}
