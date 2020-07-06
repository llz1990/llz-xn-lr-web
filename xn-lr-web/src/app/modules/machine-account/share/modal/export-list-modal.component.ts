import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormGroup } from '@angular/forms';
import { ModalComponent, ModalSize } from '../../../../common/modal/components/modal';
import { XnService } from '../../../../services/xn.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';


/**
 *  资产池导出清单
 */
@Component({
    templateUrl: './export-list-modal.component.html'
})
export class ExportListModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal')
    modal: ModalComponent;
    private observer: any;
    public shows: any;
    public formModule: string = 'dragon-input';

    public constructor(private xn: XnService) {
    }

    open(params: any): Observable<string> {
        this.shows = [
            {
                checkerId: 'exportList',
                name: 'exportList',
                required: true,
                type: 'radio',
                title: '导出清单范围',
                selectOptions: [
                    {
                        value: 'all',
                        label: '当前列表所有交易'
                    },
                    {
                        value: 'selected',
                        label: '勾选交易'
                    }
                ]
            }
        ];
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
