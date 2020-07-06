import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XnService } from '../../../../services/xn.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { FormGroup } from '@angular/forms';
import { ModalComponent, ModalSize } from '../../../../common/modal/components/modal';
import { XnUtils } from '../../../../common/xn-utils';
import { isNullOrUndefined } from 'util';

/**
 * 查看发票信息的模态框
 */
@Component({
    templateUrl: './invoice-search-company-modal.component.html',
    styles: [
        `
            @media screen and (min-height: 1000px) {
                .xn-content {
                    max-height: 600px
                }
            }

            @media (max-height: 1000px) {
                .xn-content {
                    max-height: 600px
                }
            }

            @media (max-height: 900px) {
                .xn-content {
                    max-height: 350px
                }
            }

            @media (max-height: 800px) {
                .xn-content {
                    max-height: 320px
                }
            }

            @media (max-height: 700px) {
                .xn-content {
                    max-height: 300px
                }
            }

            .xn-content {
                overflow-y: auto
            }`,
    ]
})
export class InvoiceSearchCompanyModalComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @Input() form: FormGroup;
    public items: any = [];
    private observer: any;
    row: any;
    mainForm: FormGroup;
    alert = '';
    public filename: string = "请点击右侧按钮上传文件";

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.row = {
            title: '特查询企业清单',
            checkerId: 'companyRecord',
            type: 'file',
            options: {
                filename: '请点击右侧按钮上传文件',
                fileext: '，txt,xls,xlsx',
                picSize: '500'
            }
        }


        XnFormUtils.buildSelectOptions(this.row);
        this.buildChecker(this.row);
        this.mainForm = XnFormUtils.buildFormGroup(this.row);
    }

    /**
     * 打开窗口
     * @param params
     * @returns {any}
     */
    open(params: any): Observable<any> {
        this.modal.open(ModalSize.Large);
        return Observable.create(observer => {
            this.observer = observer;
        });

    }
    public oncancel() {
        this.modal.close();
    }

    private validateExcelExt(s: string): string {
        if (isNullOrUndefined(this.row.options)) {
            return '';
        }
        if ('fileext' in this.row.options) {
            const exts = this.row.options.fileext.replace(/,/g, '|').replace(/\s+/g, ''); // 删除所有空格
            if (s.match(new RegExp('\\.(' + exts + ')$', 'i'))) {
                return '';
            } else {
                return `只支持以下文件格式: ${this.row.options.fileext}`;
            }
        } else {
            return '';
        }
    }



    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }

    public onUploadExcel(e) {
        if (e.target.files.length === 0) {
            return;
        }
        const err = this.validateExcelExt(e.target.files[0].name);
        if (!XnUtils.isEmpty(err)) {
            this.alert = err;
            $(e.target).val('');
            return;
        }

        const fd = new FormData();
        this.filename = e.target.files[0].name;
        fd.append('checkerId', this.row.checkerId);
        fd.append('file_data', e.target.files[0], e.target.files[0].name);
        // 上传excel
        this.xn.api.upload('/custom/zhongdeng/invoice/upload_excel', fd).subscribe(json => {
            console.log('json上传的excel', json);
            // this.ctrl.markAsDirty();
            // this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
        });
        $(e.target).val('');

    }
}
