import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent, ModalSize} from '../../common/modal/components/modal';
import {Observable} from 'rxjs/Observable';
import {XnService} from '../../services/xn.service';
import {FormGroup} from '@angular/forms';

@Component({
    templateUrl: './user-delete-modal.component.html',
    styles: [
        `.panel { margin-bottom: 0 }`,
    ]
})
export class UserDeleteModalComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    private observer: any;

    params: any = {};
    steped: number = 0;
    rows: any[] = [];
    shows: any[] = [];
    mainForm: FormGroup;
    userName = '';
    userId: any = {};

    constructor(private xn: XnService) {
    }

    ngOnInit() {
    }

    open(params: any): Observable<string> {

        this.params = params;
        this.userName = this.params.userName;
        this.modal.open(ModalSize.Large);

        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    private close(value: string) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }

    cssClass(step): string {
        if (step === this.steped) return 'current';
        if (step > this.steped) return 'disabled';
        else return 'success';
    }

    onOk() {

    }

    onSubmit() {

        this.userId = {
            userId: this.params.userId
        };

        this.xn.api.post('/useroperate/delete_user', this.userId).subscribe(json => {
            this.close(this.params);
        });
        // this.close('ok');
    }
}
