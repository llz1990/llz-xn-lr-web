import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../../src/app/services/api.service';
import {MsgBoxService} from '../../../src/app/services/msg-box.service';

declare let cookie: any;

declare let CryptoJS: any;

@Injectable()
export class RegisterService {

    current: number = 1;

    value: any = {};

    constructor(private api: ApiService,
                private router: Router,
                private msgBox: MsgBoxService) {
    }

    checkStep(step: number): boolean {
        return (step <= this.current);
    }

    submitStep1(form: FormGroup) {
        console.log('submitStep1', form.value);

        if (form.invalid) {
            this.msgBox.open(false, '请检查表单内容');
            return;
        }

        // 取验证码
        this.api.post('/user/check_reg', {
            mobile: form.value.accountId,
            code: form.value.code,
            orgName: form.value.orgName
        }).subscribe(json => {
            // this.value.orgCodeType = json.data.orgCodeType;
            // this.value.orgCodeNo = json.data.orgCodeNo;
            // this.value.orgLegalPerson = json.data.orgLegalPerson;
            // this.value.orgLegalPersonCardType = '身份证';
            // this.value.orgRegisterAddress = json.data.orgRegisterAddress;
            // this.value.orgLegalPersonCardNo = '';
            // this.value.orgAddress = '';
            if (!!json.data.orgCodeNo && form.value.orgCodeNo !== json.data.orgCodeNo) {
                this.msgBox.open(false, '统一社会信用代码与企业名称不匹配');
                return;
            }

            for (let key in form.value) {
                this.value[key] = form.value[key];
            }
            this.value.adminMobile = this.value.accountId;

            this.current = 2;
            this.router.navigate(['/user/register2']);
        });
    }

    // submitStep2(form: FormGroup) {
    //     console.log('submitStep2', form.value);
    //
    //     if (form.invalid) {
    //         this.msgBox.open(false, '请检查表单内容');
    //         return;
    //     }
    //
    //     // 不做身份证号码的查询验证，交给平台审核时检查
    //
    //     for (let key in form.value) {
    //         this.value[key] = form.value[key];
    //     }
    //
    //     this.value.adminMobile = this.value.accountId;
    //
    //     this.current = 3;
    //     this.router.navigate(['/user/register3']);
    // }

    submitStep3(form: FormGroup) {
        console.log('submitStep3', form.value);

        if (form.invalid) {
            this.msgBox.open(false, '请检查表单内容');
            return;
        }

        for (let key in form.value) {
            this.value[key] = form.value[key];
        }

        // 复制内容
        let params = {};
        for (let key in this.value) {
            if (key === 'accountToken') {
                params[key] = CryptoJS.SHA256(this.value[key]).toString();
            }
            else if (key === 'accountToken2') {
            }
            else {
                params[key] = this.value[key];
            }
        }

        // 提交到后台
        this.api.post('/user/register', params).subscribe(() => {
            this.msgBox.open(false, '注册资料已提交，请等待平台审核', () => {
                this.value = {};
                this.router.navigate(['/user/login']);
            });
        });
    }
}
