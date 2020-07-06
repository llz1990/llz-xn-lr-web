import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ModalComponent, ModalSize } from '../../../../common/modal/ng2-bs3-modal';
import { XnService } from '../../../../services/xn.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { SelectRange } from '../../pages/capital-pool/emus';

/**
 *  资产池导出清单
 */
@Component({
    templateUrl: './capital-pool-export-list-modal.component.html'
})
export class CapitalPoolExportListModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal')
    modal: ModalComponent;
    private observer: any;
    public shows: any;
    public formModule = 'dragon-input';

    public constructor(private xn: XnService) {
    }

    open(params: any): Observable<string> {
        this.shows = [
            {
                checkerId: 'scope',
                name: 'scope',
                required: true,
                type: 'radio',
                title: '导出清单范围',
                selectOptions: [
                    {
                        value: SelectRange.All,
                        label: '当前资产池所有交易'
                    },
                    {
                        value: SelectRange.Select,
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
