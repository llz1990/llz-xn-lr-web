/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：mfile-input.component
 * @summary：批量上传文件
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          上传文件         2019-03-29
 * **********************************************************************
 */

import { Component, OnInit, Input, ElementRef, ViewContainerRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { isNullOrUndefined } from 'util';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnInputOptions } from '../../../../public/form/xn-input.options';
import { XnService } from '../../../../services/xn.service';
import { HwModeService } from '../../../../services/hw-mode.service';
import { LoadingPercentService } from '../../../../services/loading-percent.service';
import { UploadPicService } from '../../../../services/upload-pic.service';
import { XnUtils } from '../../../xn-utils';
import { XnModalUtils } from '../../../xn-modal-utils';
import { DragonPdfSignModalComponent } from '../../../../modules/dragon/share/modal/pdf-sign-modal.component';
import { XnFormUtils } from '../../../xn-form-utils';
import { DragonMfilesViewModalComponent } from '../../../../modules/dragon/share/modal/mfiles-view-modal.component';
import { DynamicForm } from '../../dynamic.decorators';
import { DragonViewContractModalComponent } from '../../../../modules/dragon/share/modal/dragon-mfile-detail.modal';
import { EditParamInputModel } from '../../../../modules/dragon/share/modal/edit-modal.component';
import { CheckersOutputModel } from '../../../../config/checkers';
import { PublicCommunicateService } from '../../../../services/public-communicate.service';


declare let $: any;
declare const moment: any;

@Component({
    selector: 'dragon-xn-mfile-input',
    templateUrl: './mfile-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `.file-row-table {
            margin-bottom: 0;
            max-height: 100%;
        }

        .table-box {
            max-height: 350px;
            overflow-y: auto;
        }

        .file-row-table td {
            padding: 6px;
        }

        .file-row-table button:focus {
            outline: none
        }

        .btn-position {
            position: absolute;
            right: -100px;
            top: 5px
        }

        .span-disabled-bg {
            background-color: #eee
        }
        .detailP {
            float: left;
            height: 25px;
            font-size: 14px;
            line-height: 25px;
            color: #ccc;
            margin-left: 30px;
        }

        .btn-td {
            outline: 0;
            border: none;
            background: transparent;
            padding: 0;
        }
        `
    ]
})
@DynamicForm({ type: 'dragonMfile', formModule: 'default-input' })
export class CommonMfileInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;
    @Input() svrConfig?: any;
    @Input() mainFlowId?: string;

    public label;
    public files: any[];

    public myClass = '';
    public alert = '';
    public ctrl: AbstractControl;
    public ctrl1: AbstractControl;

    public xnOptions: XnInputOptions;
    // 删除按钮的状态
    public delButtonStatus: boolean;
    public showP: boolean = true;
    imgType: any;

    constructor(private xn: XnService,
        private er: ElementRef,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private loading: LoadingPercentService,
        private uploadPicService: UploadPicService,
        private publicCommunicateService: PublicCommunicateService) {
    }

    ngOnInit() {
        if (this.row.checkerId === 'fileUpload') {
            this.showP = false;
        }
        this.delButtonStatus = this.row.options && this.row.options.readonly && this.row.options.readonly === true;
        this.ctrl = this.form.get(this.row.name);
        this.ctrl.statusChanges.subscribe(v => {
            this.calcAlertClass();
        });
        if (this.row.name === 'tripleAgreement') {
            this.ctrl1 = this.form.get('debtCompare');
            if (!!this.ctrl1 && !!this.ctrl1.value && JSON.parse(this.ctrl1.value).changeReason === '5') {
                this.showRow();
            } else {
                this.hideRow();
            }
            // let controls = this.form.controls[this.row.name].validator;
            this.publicCommunicateService.change.subscribe(x => {
                if (this.row.name === 'tripleAgreement' && x === '5') {
                    // this.form.controls[this.row.name].setValidators(controls);
                    // this.form.controls[this.row.name].updateValueAndValidity();
                    // this.row.required = true;
                    this.showRow();
                } else if (this.row.name === 'tripleAgreement') {
                    // this.form.controls[this.row.name].setValidators(null);
                    // this.form.controls[this.row.name].updateValueAndValidity();
                    // this.row.required = false;
                    this.hideRow();
                    // this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
                }
            });
        }
        this.imgType = this.row.options.fileext;

        if (this.row.options.fileext !== 'pdf') {
            let imgLength = this.imgType.split(',');
            if (this.imgType.includes('pdf') && imgLength.length > 1) {
                this.imgType = '请上传图片或PDF';
            } else if (!this.imgType.includes('pdf') && imgLength.length > 1) {
                this.imgType = '请上传图片';
            }
        } else {
            this.imgType = '请上传PDF';
        }
        // 设置初始值
        this.files = XnUtils.parseObject(this.ctrl.value, []);
        this.formatLabelByFiles();
        this.calcAlertClass();
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    public onBeforeSelect(e) {
        if (e.target.files.length === 0) {
            return;
        }
        this.ctrl.markAsTouched();
        this.calcAlertClass();
    }

    public onSelect(e) {
        if (e.target.files.length === 0) {
            return;
        }
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
        this.uploadImg(data, 0);
        $(e.target).val('');
    }
    /**
     *  查看合同
     * @param id
     * @param secret
     * @param label
     */
    public showContract(id: string, secret: string, label: string) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonPdfSignModalComponent, {
            id: id,
            secret: secret,
            label: label,
            readonly: true
        }).subscribe(() => {
        });
    }

    /**
     *  上传图片
     * @param files
     * @param index
     */
    private uploadImg(files: any[], index: number) {
        if (files.length === index) {
            this.files.sort((a: any, b: any): number => {
                if (Number(a.fileName.substr(0, a.fileName.lastIndexOf('.'))) > Number(b.fileName.substr(0, b.fileName.lastIndexOf('.')))) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this.setValueByFiles();
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
                            this.uploadImg(files, index);
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
                    this.formatLabelByFiles();
                    this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
                }
            });
        });
    }

    /**
     *  删除文件
     * @param fileId
     */
    public onRemove(fileId) {
        this.xn.msgBox.open(true, '是否删除文件？', () => {
            this.xn.file.remove(fileId, this.row.isAvenger).subscribe(json => {
                for (let i = 0; i < this.files.length; ++i) {
                    if (this.files[i].fileId === fileId) {
                        this.files.splice(i, 1);
                        this.setValueByFiles();
                        this.ctrl.markAsDirty();
                        this.calcAlertClass();
                        this.formatLabelByFiles();
                        break;
                    }
                }
            });
        }, () => {
            return;
        });

    }



    /**
        *  查看文件
        * @param paramFile
        */
    public onView(paramFile: any): void {
        let paramFiles = [];
        if (this.row.name === 'factoringOtherFile') {
            this.xn.dragon.post('/contract_temporary/view', { mainFlowId: this.svrConfig.record.mainFlowId }).subscribe(x => {
                if (x.ret === 0) {
                    let datainfo = x.data.data;
                    datainfo.contractFile = JSON.stringify([paramFile]);
                    this.uploadPicService.viewDetail(datainfo, this.vcr, DragonViewContractModalComponent);
                }
            });
        } else {
            paramFiles.push(paramFile);
            XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, paramFiles).subscribe(x => {

            });
        }
    }



    /**
     *  格式化提示信息
     */
    private formatLabelByFiles() {
        if (this.files.constructor.name === 'Array') {
            if (this.files.length === 0) {
                this.label = '请点击右边按钮上传文件';
            } else {
                this.label = `已上传${this.files.length}个文件`;
            }
            this.cdr.detectChanges();
        }
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
    private setValueByFiles() {
        if (this.files.length === 0) {
            this.ctrl.setValue('');
        } else {
            this.ctrl.setValue(JSON.stringify(this.files.map(v => {
                return {
                    fileId: v.fileId,
                    fileName: v.fileName,
                    filePath: v.filePath,
                };
            })));
            if (this.row.checkerId === 'contractUpload') {
                this.files = [];
            }
        }
        this.cdr.detectChanges();
    }


    private calcAlertClass() {
        this.myClass = XnFormUtils.getClass(this.ctrl);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    private showRow(): void {
        $(this.er.nativeElement).parents('.form-group').show();
        if (!this.row.options.readonly) {
            this.ctrl.enable({ onlySelf: false, emitEvent: true });
            this.ctrl.updateValueAndValidity();
        }
    }

    private hideRow(): void {
        $(this.er.nativeElement).parents('.form-group').hide();
        if (!this.row.options.readonly) {
            this.ctrl.disable();
        }
    }
}
