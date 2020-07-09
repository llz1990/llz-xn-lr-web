import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {XnService} from '../../../../src/app/services/xn.service';
import {XnFormUtils} from '../../../../src/app/common/xn-form-utils';

declare let $: any;

@Component({
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    mainForm: FormGroup;
    rows: any[] = [];

    constructor(private xn: XnService,
                private register: RegisterService) {
    }

    ngOnInit() {
        this.xn.user.isLogin().subscribe(logined => {
            if (logined) {
                this.xn.router.navigate(['/user/home']);
                return;
            }

            this.onEnter();
        });
    }

    private onEnter() {
        this.rows = [
            {
                title: '企业名称', name: 'orgName',
                validators: {
                    minlength: 4
                }
            },
            {
                title: '统一社会信用代码', name: 'orgCodeNo'
            },
            {
                title: '管理员手机号码', name: 'accountId', memo: '手机号即为登录帐号',
                validators: {
                    mobile: true
                }
            },
            {
                title: '短信验证码', name: 'code', type: 'sms',
                validators: {
                    minlength: 6,
                    maxlength: 6,
                    sms: {
                        name: 'accountId',
                        error: '请先填写正确的管理员手机号码'
                    }
                },
                options: {
                    smsType: 1
                }
            }
        ];

        XnFormUtils.buildSelectOptions(this.rows);

        let rows = [];
        $.merge(rows, this.rows);
        for (let row of rows) {
            if (row.name === 'code') {
                continue;
            }

            if (row.name in this.register.value) {
                row.value = this.register.value[row.name];
            }
        }

        this.mainForm = XnFormUtils.buildFormGroup(rows);
    }

    onSubmit() {
        this.register.submitStep1(this.mainForm);
    }
}
