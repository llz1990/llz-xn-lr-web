import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ModalComponent, ModalSize } from '../../../../common/modal/ng2-bs3-modal';
import { XnService } from '../../../../services/xn.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { DragonContentType, SelectRange } from '../../pages/capital-pool/emus';

/**
 *  资产池下载附件
 */
@Component({
    templateUrl: './capital-pool-download-attachments-modal.component.html'
})
export class CapitalPoolDownloadAttachmentsModalComponent implements OnInit {
    public params: any;
    public form: FormGroup;
    @ViewChild('modal')
    modal: ModalComponent;
    private observer: any;
    public shows: any;
    private selectItem: any;
    public formModule = 'dragon-input';
    public dragonFileList = [{
        value: DragonContentType.CodeNotice2,
        label: '《致总部公司通知书（二次转让）》'
    },
    {
        value: DragonContentType.CodeReceipt2,
        label: '《总部公司回执（二次转让）》'
    },
    {
        value: DragonContentType.CodeProjectNotice2,
        label: '《致项目公司通知书（二次转让）》'
    },
    {
        value: DragonContentType.CodeProjectReceipt2,
        label: '《项目公司回执（二次转让）》'
    },
    {
        value: DragonContentType.CodeProjectReceipt1,
        label: '《项目公司回执（一次转让）》'
    },
    {
        value: DragonContentType.CodeBrokerPayConfirm,
        label: '《付款确认书（总部致券商）》'
    },
    {
        value: DragonContentType.CodeFactoringPayConfirm,
        label: '《付款确认书（总部致保理商）》'
    },
    {
        value: DragonContentType.CodeAssignment,
        label: '一次转让签署的合同文件'
    },
    {
        value: DragonContentType.CodeCertificate,
        label: '中登登记证明文件'
    },
    {
        value: DragonContentType.CodeSearcherCertificate,
        label: '查询证明文件'
    },
    {
        value: DragonContentType.CodeBaseResource,
        label: '基础资料'
    },
    {
        value: DragonContentType.CodeCreditAccountChange,
        label: '《债权转让及账户变更通知的补充说明》'
    }];

    public constructor(private xn: XnService) {
    }

    open(params: any): Observable<string> {
        this.params = params;


        this.shows = [
            {
                checkerId: 'scope',
                name: 'scope',
                required: true,
                type: 'radio',
                title: '下载范围',
                selectOptions: [
                    {
                        value: SelectRange.All,
                        label: '当前筛选条件下的所有交易'
                    },
                    {
                        value: SelectRange.Select,
                        label: '勾选交易'
                    }
                ]
            },
            {
                checkerId: 'contentType',
                name: 'contentType',
                required: true,
                type: 'checkbox',
                title: '下载内容',
                selectOptions: [
                ]
            }
        ];
        if (this.params.fileList !== undefined) {
            this.shows[1].selectOptions = this.params.fileList;


        } else {
            this.shows[1].selectOptions = this.dragonFileList;
            this.selectItem = {
                '深圳市龙光控股有限公司': [
                    DragonContentType.CodeNotice2,
                    DragonContentType.CodeReceipt2,
                    DragonContentType.CodeProjectNotice2,
                    DragonContentType.CodeProjectReceipt2,
                    DragonContentType.CodeProjectReceipt1,
                    DragonContentType.CodeBrokerPayConfirm,
                    DragonContentType.CodeFactoringPayConfirm,
                    DragonContentType.CodeAssignment,
                    DragonContentType.CodeCertificate,
                    DragonContentType.CodeSearcherCertificate,
                    DragonContentType.CodeBaseResource,
                    DragonContentType.CodeCreditAccountChange,
                ],
            };
            this.shows[1].selectOptions
                .filter(x => !this.selectItem[params.selectedCompany].includes(x.value))
                .forEach((v) => v.disable = true);
        }

        // 根据 this.shows 中 selectOptions 配置


        if (!params.hasSelect) {
            this.shows[0].selectOptions[1].disable = true;
        }



        this.form = XnFormUtils.buildFormGroup(this.shows);
        this.modal.open(ModalSize.Large);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    public ngOnInit() {
    }

    public onSubmit() {
        this.close(this.form.value);
    }

    public onCancel() {
        this.close('');
    }

    private close(value) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }
}
