import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {XnService} from '../../../../src/app/services/xn.service';
import {XnFormUtils} from '../../../../src/app/common/xn-form-utils';

declare let $: any;
declare let CryptoJS: any;

@Component({
    templateUrl: './reset.component.html',
    styles: [
        `.content {margin-bottom: 60px}`,
    ]
})
// export class ResetComponent implements OnInit {
class ResetComponent implements OnInit {

    mainForm: FormGroup;
    rows: {}[];

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.rows = [
            {
                title: '手机号码', name: 'mobile', memo: '手机号即为登录帐号',
                validators: {}
            },
            {
                title: '旧密码', name: 'oldPwd', type: 'password',
                validators: {
                    minlength: 6,
                    maxlength: 20
                }
            },
            {
                title: '新密码', name: 'newPwd', type: 'password', memo: '不能少于6位',
                validators: {
                    minlength: 6,
                    maxlength: 20
                }
            },
            {
                title: '确认新密码', name: 'newPwd2', type: 'password',
                validators: {
                    minlength: 6,
                    maxlength: 20,
                    equal: {
                        name: 'newPwd',
                        error: '两次的密码要一致'
                    }
                }
            }
        ];

        XnFormUtils.buildSelectOptions(this.rows);
        this.mainForm = XnFormUtils.buildFormGroup(this.rows);
    }

    onSubmit() {
        this.xn.api.post('/user/reset', {
            mobile: this.mainForm.value.mobile,
            oldPwd: CryptoJS.SHA256(this.mainForm.value.oldPwd).toString(),
            newPwd: CryptoJS.SHA256(this.mainForm.value.newPwd).toString()
        }).subscribe(json => {
            console.log(json, 'reset');
            this.xn.msgBox.open(false, '密码重置成功，请重新登录。', () => {
                this.xn.router.navigate(['/user/login']);
            });
        });
    }
}
