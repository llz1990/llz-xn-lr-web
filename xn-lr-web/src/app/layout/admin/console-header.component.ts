import { Component, OnInit, ElementRef } from '@angular/core';
import { PortalData } from '../../config/mock';
import { XnService } from '../../services/xn.service';
import { ActivatedRoute } from '@angular/router';
import XnLogicUtils from '../../common/xn-logic-utils';

@Component({
    selector: 'console-header',
    templateUrl: './console-header.component.html',
    styles: [
        `.main-header {
            position: fixed;
            width: 100%;
        }

        .main-header .logo {
            padding: 0;
        }

        .console-header-container {
            margin-left: 0px;
            float: left;
        }

        .console-header-login-btn {
            width: 80px;
            border: 1px solid #fff;
            line-height: 30px;
            padding: 0;
            margin-top: 8px;
            margin-right: 20px;
        }

        .navbar-custom-menu {
            margin-right: 20px;
        }

        .navbar-nav > .user-menu > .dropdown-menu > li.user-header {
            height: 190px;
        }`
    ]
})
export class ConsoleHeaderComponent implements OnInit {

    // 有两种类型，注册中（未登陆时不跳转）和非注册中（未登陆时就跳转页面）
    needRedirectWhenLogout: boolean;

    logined = false;
    items: any;
    userId: string;
    userName: string;
    orgName: string;
    roles: any[] = [];
    rolesCn: any[] = [];
    // 当前登陆角色，企业类型
    public currentLoginedType: number;

    constructor(private xn: XnService,
        private route: ActivatedRoute,
        private er: ElementRef) {
    }

    ngOnInit() {
        this.route.url.subscribe(v => {
            this.onEnter();
        });
    }

    private onEnter() {
        this.needRedirectWhenLogout = XnLogicUtils.needRedirectWhenLogout(this.xn.router.url);
        this.items = PortalData.columns2;
        this.currentLoginedType = this.xn.user.orgType;
        // 检查登录态
        this.xn.user.checkLogin().subscribe(logined => {
            if (!logined) {
                this.onLogout();
            } else {
                this.fetchUserInfo();

                // 改变主题颜色
                XnLogicUtils.changeTheme(this.er, this.xn.user.orgType);
            }
        });
    }

    private fetchUserInfo(): void {
        this.logined = true;
        this.userId = this.xn.user.userId;
        this.userName = this.xn.user.userName;
        this.orgName = this.xn.user.orgName;
        this.roles = this.xn.user.roles;
        let rolesTemp: any[] = [];
        // console.log("roles: ", this.roles)
        for (let i in this.roles) {
            if (this.roles[i] === 'admin') {
                rolesTemp.push('管理员 ');
            } else if (this.roles[i] === 'operator') {
                rolesTemp.push('业务经办人 ');
            } else if (this.roles[i] === 'reviewer') {
                rolesTemp.push('业务复核人 ');
            } else if (this.roles[i] === 'windOperator') {
                rolesTemp.push('高管经办人 ');
            } else if (this.roles[i] === 'windReviewer') {
                rolesTemp.push('高管复核人 ');
            } else if (this.roles[i] === 'customerOperator') {
                rolesTemp.push('客户经理经办人');
            } else if (this.roles[i] === 'customerReviewer') {
                rolesTemp.push('客户经理复核人');

            } else if (this.roles[i] === 'riskOperator') {
                rolesTemp.push('风险审查经办人');

            } else if (this.roles[i] === 'riskReviewer') {
                rolesTemp.push('风险审查复核人');
            } else if (this.roles[i] === 'financeOperator') {

                rolesTemp.push('财务经办人');
            } else if (this.roles[i] === 'financeReviewer') {
                rolesTemp.push('财务复核人');

            } else if (this.roles[i] === 'checkerLimit') {
                rolesTemp.push('查看权限');
            }
        }
        this.rolesCn = rolesTemp;
    }

    public onLogin() {
        this.xn.user.setRedirectUrl(this.xn.router.url);
        this.xn.router.navigate(['/user/login']);
    }

    public onLogout() {
        this.logined = false;
        this.userId = '';
        this.userName = '';
        this.orgName = '';

        if (this.needRedirectWhenLogout) {
            this.xn.user.logout();
        } else {
            this.xn.user.logoutNoRedirect();
        }
    }
}
