import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {XnService} from '../../services/xn.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {SelectOptions} from '../../config/select-options';

/**
 *  平台-注册公司详细信息
 */
@Component({
    templateUrl: './register-detail.component.html',
    styles: [
            `.table {
            font-size: 13px;
        }

        .btn-right {
            float: right
        }

        .btn {
            padding: 4px 12px;
        }

        .table tr td .user-role {
            padding: 0
        }

        .table tr td .user-role li {
            position: relative;
            display: inline-block;
            float: left;
            padding-right: 15px;
        }`,
    ]
})
export class RegisterDetailComponent implements OnInit {

    pageTitle = '注册公司详细资料';
    pageDesc = '';
    tableTitle = '企业资料';
    adminTitle = '系统管理员';
    certTitle = '数字证书管理员';
    userTitle = '用户';
    notifier = '重要通知联系人';
    showEnterprise = true;
    items: any[] = [];
    data: any = {};
    extendInfo: any = {};
    public orgTypeLists = SelectOptions.get('orgType');
    public registerStatusLists = SelectOptions.get('registerStatus');

    constructor(private xn: XnService, private vcr: ViewContainerRef, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.xn.loading.open();
        this.route.params.subscribe((params: Params) => {
            forkJoin(
                this.xn.api.post('/app_info/get_register_app', {
                    appId: params.id
                }),
                this.xn.api.post('/useroperate/user_app_list', {
                    appId: params.id
                })
            ).subscribe(([reg, app]) => {
                this.data = reg.data;
                this.extendInfo = reg.data.extendInfo && JSON.parse(reg.data.extendInfo);
                this.items = app.data.data;
            }, () => {
            }, () => {
                this.xn.loading.close();
            });
        });
    }

    public goBack() {
        this.xn.user.navigateBack();
    }
}
