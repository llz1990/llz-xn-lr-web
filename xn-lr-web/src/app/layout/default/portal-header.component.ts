import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../services/xn.service';
import {ActivatedRoute} from '@angular/router';
import {XnModalUtils} from '../../common/xn-modal-utils';
import {LoginModalComponent} from '../../public/modal/login-modal.component';

@Component({
    selector: 'portal-header',
    templateUrl: './portal-header.component.html',
    styleUrls: [
        './style.css',
        './portal-header.component.css'
    ],
})
export class PortalHeaderComponent implements OnInit {

    logined = false;
    userId: string;
    userName: string;
    orgName: string;
    showHr = false;
    factorViewPermission = '/console';

    constructor(private xn: XnService,
                private vcr: ViewContainerRef,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.url.subscribe(v => {
            this.onEnter();
        });
        let res = this.xn.user.roles.filter(function(item,index,array){
            return !(item === undefined || item === null || item === '');
        });
        if(this.xn.user.orgType === 3 && res.length === 1 && res[0] === "checkerLimit"){
            this.factorViewPermission = '/console/main-list/list';
        }
    }

    private onEnter() {
        // 检查登录态
        this.xn.user.checkLogin().subscribe(logined => {
            if (!logined) {
                this.onLogout();
            } else {
                this.fetchUserInfo();
            }
        });
    }

    private fetchUserInfo(): void {
        this.logined = true;
        this.userId = this.xn.user.userId;
        this.userName = this.xn.user.userName;
        this.orgName = this.xn.user.orgName;
    }

    onLogin() {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, LoginModalComponent, {}).subscribe(json => {
            console.log('loginModal return', json);
            this.fetchUserInfo();
            this.xn.user.redirectConsole();
        });
    }

    onLogout() {
        this.xn.user.logoutNoRedirect();
        this.logined = false;
        this.userId = '';
        this.userName = '';
        this.orgName = '';
    }

    onCssClass() {
        return this.xn.router.url === '/' ? '' : 'active';
    }
}
