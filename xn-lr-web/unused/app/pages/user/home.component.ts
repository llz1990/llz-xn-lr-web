import {Component, OnInit} from '@angular/core';
import {XnService} from '../../../../src/app/services/xn.service';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `.user-home-label {text-align: right; font-weight: bold}`,
        `.user-home-status-success {color: #1ba208;}`,
        `.user-home-status-doing {}`,
        `.user-home-status-fail {color: #ff5500;}`,
        `.xn-console-first-section {padding-top: 100px;}`,
        `.form-group {line-height: 30px;}`,
        `.box-body {padding-bottom: 30px;}`
    ]
})
export class HomeComponent implements OnInit {

    rows: any[];

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.xn.user.isLogin().subscribe(logined => {
            this.rows = [];

            // 如果没登录就跳转到login
            if (!logined) {
                this.xn.router.navigate(['/user/login']);
                return;
            }

            this.rows.push({label: '浏览用户', data: '1. 注册平台账号', status: '完成', css: 'user-home-status-success'});
            this.rows.push({label: '', data: '2. 设置用户权限', status: '完成', css: 'user-home-status-success'});

            if (this.xn.user.status === 1) {
                this.rows.push({label: '', data: '3. 平台审核结果', status: '未完成', css: 'user-home-status-doing'});
            }
            else if (this.xn.user.status === 2) {
                this.rows.push({label: '', data: '3. 平台审核结果', status: '通过', css: 'user-home-status-success'});
            }
            else {
                this.rows.push({label: '', data: '3. 平台审核结果', status: '未通过', css: 'user-home-status-fail'});
            }

            if (this.xn.user.appNature === 0) {
                this.rows.push({label: '交易用户', data: '4. 申领数字证书', status: '未申请', css: 'user-home-status-doing'});
            }
            else if (this.xn.user.appNature === 1) {
                this.rows.push({label: '交易用户', data: '4. 申领数字证书', status: '通过', css: 'user-home-status-success'});
            }
        });
    }

}
