import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalComponent} from '../../common/modal/components/modal';
import {XnUtils} from '../../common/xn-utils';
import {Observable} from 'rxjs/Observable';
import {XnService} from '../../services/xn.service';
import {XnModalUtils} from '../../common/xn-modal-utils';
import {LoginSelectModalComponent} from './login-select-modal.component';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styles: [
            `.login-sms-btn {
            height: 40px;
            width: 110px;
        }`,
            `.login-box-footer {
            padding-left: 10px;
            padding-right: 10px;
        }`,
            `.form-group {
            margin-bottom: 20px;
        }`,
            `.form-group:last-child {
            margin-bottom: 10px;
            margin-top: 40px;
        }`,
            `.form-control {
            height: 40px;
        }`
    ]
})
export class LoginModalComponent implements OnInit {

    private observer: any;
    alertMsg = '';
    btnText = '获取验证码';
    btnEnabled = true;
    time = 0;
    timer: any = null;

    @ViewChild('modal') modal: ModalComponent;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
    }

    open(): Observable<any> {
        this.modal.open();
        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    onLogin(accounts: string, code: string): void {
        const account = accounts.replace(/[-]/g, '');
        if (XnUtils.isEmpty(account)) {
            this.alertMsg = '手机号码不能为空';
            return;
        }

        if (XnUtils.isEmpty(code)) {
            this.alertMsg = '短信验证码不能为空';
            return;
        }

        this.alertMsg = '';
        this.xn.user.login(account, code).subscribe(json => {
            if (json.data.multiOrgs) {
                XnModalUtils.openInViewContainer(this.xn, this.vcr, LoginSelectModalComponent, json.data).subscribe(v => {
                    if (v.action === 'ok') {
                        // 选择了机构，再次发送
                        this.xn.user.tmpLogin(v.appId, v.orgType, json.data.tmpToken).subscribe(json2 => {
                            this.modal.close();
                            this.observer.next(json2);
                            this.observer.complete();
                        });
                    }
                });
            } else {
                this.modal.close();
                this.observer.next(json);
                this.observer.complete();
            }
        });
    }

    onSend(accounts: string): void {
        const account = accounts.replace(/[-]/g, '');
        // 验证account
        if (XnUtils.isEmpty(account)) {
            this.alertMsg = '手机号码不能为空';
            return;
        }

        if (this.time <= 0) {
            // 发送事件
            this.xn.user.sendSmsCode(account, 1);

            // 倒计时
            this.time = 60;
            this.timer = setInterval(() => {
                --this.time;
                if (this.time <= 0) {
                    if (this.timer !== null) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    this.btnText = `获取验证码`;
                    this.btnEnabled = true;
                } else {
                    this.btnText = `${this.time}秒后可重发`;
                }
            }, 1000);
            this.btnEnabled = false;
        }
    }
}
