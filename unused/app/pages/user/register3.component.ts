import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {isNullOrUndefined} from 'util';
import {XnService} from '../../../../src/app/services/xn.service';
import {XnFormUtils} from '../../../../src/app/common/xn-form-utils';

@Component({
    selector: 'app-register3',
    templateUrl: './register3.component.html',
    styles: []
})
// export class Register3Component implements OnInit {
class Register3Component implements OnInit {

    mainForm: FormGroup;
    adminRows: any[];
    user1Rows: any[];
    user2Rows: any[];

    lastAdminRole: string = '';
    isShowUser1: boolean = null; // 先要设置为null
    isShowUser2: boolean = null; // 先要设置为null

    constructor(private xn: XnService,
                private register: RegisterService) {
    }

    ngOnInit() {
        this.adminRows = [
            {
                title: '管理员手机号', name: 'adminMobile', options: {readonly: true}
            },
            {
                title: '管理员姓名', name: 'adminName'
            },
            {
                title: '证件类型', name: 'adminCardType', type: 'select', selectOptions: 'cardType'
            },
            {
                title: '证件号码', name: 'adminCardNo'
            },
            {
                title: '电子邮箱', name: 'adminEmail',
                validators: {
                    email: true
                }
            },
            {
                title: '管理员角色', name: 'adminRole', type: 'select', selectOptions: 'adminRole'
            },
        ];

        this.user1Rows = [
            {
                title: '经办人手机号', name: 'user1Mobile'
            },
            {
                title: '经办人姓名', name: 'user1Name'
            },
            {
                title: '证件类型', name: 'user1CardType', type: 'select', selectOptions: 'cardType'
            },
            {
                title: '证件号码', name: 'user1CardNo'
            },
            {
                title: '电子邮箱', name: 'user1Email',
                validators: {
                    email: true
                }
            }
        ];

        this.user2Rows = [
            {
                title: '复核人手机号', name: 'user2Mobile'
            },
            {
                title: '复核人姓名', name: 'user2Name'
            },
            {
                title: '证件类型', name: 'user2CardType', type: 'select', selectOptions: 'cardType'
            },
            {
                title: '证件号码', name: 'user2CardNo'
            },
            {
                title: '电子邮箱', name: 'user2Email',
                validators: {
                    email: true
                }
            }
        ];

        XnFormUtils.buildSelectOptions(this.adminRows);
        XnFormUtils.buildSelectOptions(this.user1Rows);
        XnFormUtils.buildSelectOptions(this.user2Rows);

        let rows = this.adminRows.concat(this.user1Rows, this.user2Rows);

        // 从register服务里获取之前已有的值
        for (let row of rows) {
            let name = row.name;
            if (name in this.register.value) {
                row.value = this.register.value[name];
            }
        }

        this.mainForm = XnFormUtils.buildFormGroup(rows);
        this.mainForm.get('adminRole').valueChanges.subscribe(v => {
            this.handleAdminRole(v);
        });
    }

    private enableCtrl(name: string) {
        let ctrl = this.mainForm.get(name);
        ctrl.enable({onlySelf: false, emitEvent: true});
        ctrl.updateValueAndValidity();
    }

    private disableCtrl(name: string) {
        let ctrl = this.mainForm.get(name);
        ctrl.disable();
    }

    private handleAdminRole(adminRole: string) {
        if (adminRole === this.lastAdminRole) return;
        this.lastAdminRole = adminRole;

        const isShowUser1: boolean = (parseInt(adminRole) !== 1);
        const isShowUser2: boolean = (parseInt(adminRole) !== 2);

        if (isShowUser1 !== this.isShowUser1) {
            this.isShowUser1 = isShowUser1;
            if (isShowUser1) {
                this.enableCtrl(`user1Mobile`);
                this.enableCtrl(`user1Name`);
                this.enableCtrl(`user1CardType`);
                this.enableCtrl(`user1CardNo`);
                this.enableCtrl(`user1Email`);
            }
            else {
                this.disableCtrl(`user1Mobile`);
                this.disableCtrl(`user1Name`);
                this.disableCtrl(`user1CardType`);
                this.disableCtrl(`user1CardNo`);
                this.disableCtrl(`user1Email`);
            }
        }

        if (isShowUser2 !== this.isShowUser2) {
            this.isShowUser2 = isShowUser2;
            if (isShowUser2) {
                this.enableCtrl(`user2Mobile`);
                this.enableCtrl(`user2Name`);
                this.enableCtrl(`user2CardType`);
                this.enableCtrl(`user2CardNo`);
                this.enableCtrl(`user2Email`);
            }
            else {
                this.disableCtrl(`user2Mobile`);
                this.disableCtrl(`user2Name`);
                this.disableCtrl(`user2CardType`);
                this.disableCtrl(`user2CardNo`);
                this.disableCtrl(`user2Email`);
            }
        }
    }

    onSubmit() {
        this.register.submitStep3(this.mainForm);
    }

    onPrev() {
        this.xn.router.navigate(['/user/register2']);
    }
}
