import { Component, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { PortalData } from '../../config/mock';
import { XnUtils } from '../../common/xn-utils';
import { XnService } from '../../services/xn.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'portal-nav',
    templateUrl: './portal-nav.component.html',
    styleUrls: [
        './style.css',
        './portal-nav.component.css'
    ],
})
export class PortalNavComponent implements OnInit, AfterViewChecked {

    items: any;
    newItems: any;
    logining: boolean = false;
    navIndex: string;

    constructor(private xn: XnService, private er: ElementRef, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.items = PortalData.columns;
        this.xn.api.post('/title/list', {
        }).subscribe(json => {
            // 改变返回值
            this.newItems = XnUtils.portalCheckLogin(json, this.items);

            this.onWhich(this.newItems);
        });

        // 检查登录态
        this.xn.user.checkLogin().subscribe(logined => {
            logined ? this.logining = true : this.logining = false;
        });
    }

    ngAfterViewChecked() {
        if (this.navIndex === this.xn.nav.navIndex) {
            return;
        }
        // 兼容底部菜单
        this.navIndex = this.xn.nav.navIndex;
        this.onNavClick(Number(this.navIndex));
    }

    onNavClick(i, event?) {
        $('.nav-bar li', this.er.nativeElement).eq(i).addClass('active').siblings().removeClass('active');
        if (event) {
            event.stopPropagation();
        }
    }

    // 是否登录状态是否显示二级菜单
    checkChild(item): boolean {
        const booleanTemp: boolean = false;
        const arrayTemp: any = [];
        if (this.logining) {
            return true;
        }

        for (const child of item.children) {
            if (!this.logining && !child.status) {
                return true;
            }
            arrayTemp.push(child.status);
        }
        if (arrayTemp.indexOf(booleanTemp) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    onWhich(items) {
        // setTimeout 不然设置不了
        setTimeout(() => {
            let index = Number(this.xn.nav.navIndex);
            const url = this.xn.router.url;
            if (url === '/') {
                index = 0;
                this.xn.nav.setNavIndex({
                    navIndex: index.toString()
                });
            }
            this.onNavClick(index);
        }, 0);
    }

}
