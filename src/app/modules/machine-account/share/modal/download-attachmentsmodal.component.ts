import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ModalComponent, ModalSize } from '../../../../common/modal/components/modal';
import { XnService } from '../../../../services/xn.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';


/**
 *  台账下载附件
 */
@Component({
    templateUrl: './download-attachments-modal.component.html'
})
export class DownloadAttachmentsModalComponent implements OnInit {
    public params: any;
    public form: FormGroup;
    @ViewChild('modal')
    modal: ModalComponent;
    private observer: any;
    public shows: any;
    public oldShows: any;
    public newShows: any;
    private selectItem: any;
    private oldSelectItem: any;
    public formModule: string = 'dragon-input';

    public constructor(private xn: XnService) {
    }

    open(params: any): Observable<string> {
        this.params = params;
        let hasOldInList = params.listInfo.some(y => y.isProxy !== 52 && y.isProxy !== 53 && y.isProxy !== 50); // 老业务
        let hasNewInList = params.listInfo.some(z => z.isProxy === 50 || z.isProxy === 52 || z.isProxy === 53);
        let hasOldInSel = params.selectedItems.some(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
        // let hasNewInSel = params.selectedItems.some(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53);
        
        let isAllOldInList = params.listInfo.every(y => y.isProxy !== 52 && y.isProxy !== 53 && y.isProxy !== 50); // 老业务
        let isAllNewInList = params.listInfo.every(z => z.isProxy === 50 || z.isProxy === 52 || z.isProxy === 53); // 老业务

        this.shows = [{
            checkerId: 'downloadRange',
            name: 'downloadRange',
            required: true,
            type: 'radio',
            title: '下载范围',
            selectOptions: [
                {
                    value: 'all',
                    label: '当前筛选条件下的所有交易'
                },
                {
                    value: 'selected',
                    label: '勾选交易'
                }
            ]
        }];

        this.newShows = [
            {
                checkerId: 'chooseFile',
                name: 'chooseFile',
                required: true,
                type: 'checkbox',
                title: '新万科下载内容',
                selectOptions: [
                    {
                        value: 1,
                        label: '《致总部公司通知书（二次转让）》'
                    },
                    {
                        value: 2,
                        label: '《总部公司回执（二次转让）》'
                    },
                    {
                        value: 3,
                        label: '《致项目公司通知书（二次转让）》'
                    },
                    {
                        value: 4,
                        label: '《项目公司回执（二次转让）》'
                    },
                    {
                        value: 5,
                        label: '《项目公司回执（一次转让）》'
                    },
                    {
                        value: 6,
                        label: '《付款确认书（总部致券商）》'
                    },
                    {
                        value: 7,
                        label: '《付款确认书（项目公司致保理商）》'
                    },
                    {
                        value: 8,
                        label: '一次转让签署的合同文件'
                    },
                    {
                        value: 9,
                        label: '中登登记证明文件'
                    },
                    {
                        value: 10,
                        label: '查询证明文件'
                    },
                    {
                        value: 11,
                        label: '基础资料(指交易流程中上传的合同,发票等文件)'
                    },
                    {
                        value: 12,
                        label: '《债权转让及账户变更通知的补充说明》'
                    },
                ]
            }];
        this.oldShows = [
            {
                checkerId: 'oldchooseFile',
                name: 'oldchooseFile',
                required: true,
                type: 'checkbox',
                title: '老ABS业务下载内容',
                selectOptions: [
                    {
                        value: 'capitalPoolContract01',
                        label: '《致总部公司通知书（二次转让）》'
                    },
                    {
                        value: 'capitalPoolContract02',
                        label: '《致项目公司通知书（二次转让）》'
                    },
                    {
                        value: 'capitalPoolContract03',
                        label: '《总部公司回执（二次转让）》'
                    },
                    {
                        value: 'capitalPoolContract04',
                        label: '《项目公司回执（二次转让）》'
                    },
                    {
                        value: 'headquartersReceipt',
                        label: '《总部公司回执（一次转让）》'
                    },
                    {
                        value: 'projectReceipt',
                        label: '《项目公司回执（一次转让）》'
                    },
                    {
                        value: 'pdfProjectFiles',
                        label: '《付款确认书（总部致保理商）》'
                    },
                    {
                        value: 'projectQrs',
                        label: '《付款确认书（项目公司致供应商）》'
                    },
                    {
                        value: 'tradersQrs',
                        label: '《付款确认书（总部致券商）》'
                    },
                    {
                        value: 'pdfProjectFiles',
                        label: '《付款确认书（总部致供应商）》'
                    },
                    {
                        value: 'confirmFile',
                        label: '《确认函》'
                    }
                ]
            }
        ];
        // 是否有勾选列表中某行
        if (!params.hasSelect) {
            this.shows[0].selectOptions[1].disable = true;
            if(hasNewInList){
                this.shows.push(...this.newShows);
            }
            if(hasOldInList){
                this.shows.push(...this.oldShows);
            }
        }else{
            if(isAllNewInList){
                this.shows.push(...this.newShows);
            }else if(isAllOldInList){
                this.shows.push(...this.oldShows);
            }else{
                this.shows.push(...this.newShows,...this.oldShows);
            }
        }
        if(hasOldInList || hasOldInSel){
            // 老ABS业务根据 this.shows 中 selectOptions 的顺序，从0开始,包含即disable
            this.oldSelectItem = {
                '万科': [2, 4, 5, 7, 8, 9], // 0 1 3 6
                '金地（集团）股份有限公司': [2, 4, 5, 7, 8, 9, 10],
                '雅居乐地产控股有限公司': [6, 8, 10],
                '深圳市龙光控股有限公司': [0, 2, 4, 7, 9, 10],
                'notConsiderCompany': [0, 2, 4, 6, 8, 9, 10] // 1 3 5 7
            };
            let index = this.shows.findIndex((a)=>a.checkerId==='oldchooseFile');
            this.oldSelectItem[params.selectedCompany].forEach(c => {
                this.shows[index].selectOptions = this.shows[index].selectOptions.map((v, i) => {
                    if (i === c) {
                        v.disable = true;
                    }
                    return v;
                });
            });
        }
        // console.log(this.shows);
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
