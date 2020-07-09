import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent, ModalSize} from '../../../../../common/modal/components/modal';
import {FormGroup} from '@angular/forms';
import {Observable} from '../../../../../../../node_modules/rxjs';
import {XnFormUtils} from '../../../../../common/xn-form-utils';

/**
 *  交易控制-编辑交易控制信息
 */
@Component({
    templateUrl: './enterprise-transaction-control-modal.component.html',
})
export class EnterpriseTransactionControlModalComponent {
    @ViewChild('modal') modal: ModalComponent;
    observer: any;
    rows: any[] = [];
    mainForm: FormGroup;
    params: any;
    pageTitle = '';

    constructor() {
    }

    open(params: any): Observable<any> {
        console.log('编辑项：', params);
        this.params = params;
        this.pageTitle = params.pageTitle;
        this.rows = params.rows;
        this.init(this.rows);
        this.modal.open(ModalSize.Large);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    // 返回信息
    onSubmit() {
        this.close({action: 'ok', value: this.mainForm.value});
    }

    onCancel() {
        this.close(null);
    }

    close(value) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }

    buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }

    init(rows) {
        XnFormUtils.buildSelectOptions(rows);
        this.buildChecker(rows);
        this.mainForm = XnFormUtils.buildFormGroup(rows);
    }
}
