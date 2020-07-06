import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { XnService } from '../../services/xn.service';
import { XnUtils } from '../../common/xn-utils';
import { XnModalUtils } from '../../common/xn-modal-utils';
import { LoginSelectModalComponent } from '../../public/modal/login-select-modal.component';

@Component({
    templateUrl: './login.component.html',
    styles: [
        `.content {
            padding-top: 80px;
            max-width: 460px;
        }`,
        `.login-content {
            max-width: 460px;
            margin: 0 auto;
        }`,
        `.login-logo {
            font-size: 28px
        }`,
        `.login-box-body {
            padding-top: 40px;
        }`,
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
export class LoginComponent implements OnInit {

    alertMsg = '';
    btnText = '获取验证码';
    btnEnabled = true;
    time = 0;
    timer: any = null;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        if (this.xn.user.isLogined()) {
            this.xn.user.redirectWhenLogin();
            return;
        }

        if (this.xn.user.hasCookie()) {
            this.xn.user.authRaw().subscribe(json => {
                if (json.ret === 0) {
                    this.xn.user.redirectWhenLogin();
                }
            });
        }
    }

    onLogin(accounts: string, token: string): void {
        const account = accounts.replace(/[-]/g, '');
        if (account === undefined || account === '') {
            this.alertMsg = '用户名不能为空';
            return;
        }

        if (token === undefined || token === '') {
            this.alertMsg = '密码不能为空';
            return;
        }

        this.alertMsg = '';
        this.xn.user.login(account, token).subscribe(json => {
            if (json.data.multiOrgs) {
                XnModalUtils.openInViewContainer(this.xn, this.vcr, LoginSelectModalComponent, json.data).subscribe(v => {
                    if (v.action === 'ok') {
                        // 选择了机构，再次发送
                        this.xn.user.tmpLogin(v.appId, v.orgType, json.data.tmpToken).subscribe(json2 => {
                            this.xn.user.redirectConsole();
                        });
                    }
                });
            } else {
                this.xn.user.redirectConsole();
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

        // console.log('onSend', mobile, this.time);
        if (this.time <= 0) {
            // 发送事件
            // console.log('sms.emit', mobile);
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
