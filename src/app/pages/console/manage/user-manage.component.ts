import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { XnService } from '../../../services/xn.service';
import { XnModalUtils } from '../../../common/xn-modal-utils';
import { UserEditModalComponent } from '../../../public/modal/user-edit-modal.component';
import { UserAddModalComponent } from '../../../public/modal/user-add-modal.component';
import { UserDeleteModalComponent } from '../../../public/modal/user-delete-modal.component';
import { AdminMoveModalComponent } from '../../../public/modal/admin-move-modal.component';
import { PowerEditModalComponent } from '../../../public/modal/power-edit-modal.component';
import { isArray } from 'util';

@Component({
    templateUrl: './user-manage.component.html',
    styles: [
        `.table { font-size: 13px; }`,
        `.xn-click-a { display: inline-block; padding-left: 5px; padding-right: 5px;}`,
        `.receive {padding-left: 5px;}`
    ]
})
export class UserManageComponent implements OnInit {

    pageTitle = '用户管理';
    pageDesc = '';
    tableTitle = '用户管理';
    cardNo = '';

    total: number = 0;
    pageSize: number = 10;
    items: any[] = [];
    readonlyMan: string = '只读用户';
    powerlist: any = {};
    types: any[] = [];
    isFactoryAdmin: boolean = false;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.isFactoryAdmin = this.xn.user.orgType === 3 && !!this.xn.user.isAdmin;
        this.onPage(1);
    }

    onPage(page: number) {
        page = page || 1;
        this.xn.api.post('/useroperate/user_list', {
            start: (page - 1) * this.pageSize,
            length: this.pageSize
        }).subscribe(json => {
            this.total = json.data.recordsTotal;
            this.items = json.data.data;
        });
    }

    isAdmin(userRoleList) {
        if (!userRoleList || userRoleList.length <= 0) {
            return false;
        }
        return userRoleList.map(v => v.roleId).indexOf('admin') >= 0;
    }

    checkLogin(event, id) {
        const checkbox = event.target;
        const checked = checkbox.checked;
        const checkedNumber = checked ? 1 : 0;

        this.goCheck(id, checkedNumber);
    }

    goCheck(id: number, checkedNumber: number) {
        this.xn.api.post('/useroperate/set_sms', {
            userId: id,
            isSms: checkedNumber
        }).subscribe(json => {
            console.log('state: ', json);
        });
    }

    getPowerList(item: any) {
        this.xn.api.post('/power/list', {
            userId: item.userId
        }).subscribe(json => {
            console.log('powerList: ', json);
            const Data = json.data;
            Data['userId'] = item.userId;
            this.getPower(Data);
        });
    }

    // 通用checkbox控件格式，给下级调用
    private mapArrays(arrays) {
        arrays = arrays.map(v => {
            return {
                value: v,
                label: v
            };
        });
        return arrays;
    }

    private createArray(array) {
        if (!isArray(array)) {
            array = [];
        }
        return array;
    }

    onViewAdd(items: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, UserAddModalComponent, items).subscribe(v => {
            this.items.push(v);
        });
    }

    onViewEdit(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, UserEditModalComponent, item).subscribe(v => {
            this.items.toString();
        });
    }

    onViewDelete(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, UserDeleteModalComponent, item).subscribe(v => {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].userId === v.userId) {
                    this.items.splice(i, 1);
                }
            }
        });
    }

    onAdminMove(item: any) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, AdminMoveModalComponent, item).subscribe(v => {
            this.onLogout();
        });
    }

    onLogout() {
        this.xn.user.logout();
    }

    onPower(item: any) {
        this.getPowerList(item);
    }

    getPower(item) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, PowerEditModalComponent, item).subscribe(v => {
            this.items.toString();
        });
    }
}
