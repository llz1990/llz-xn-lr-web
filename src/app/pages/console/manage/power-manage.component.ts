import {Component, OnInit, Input, ViewContainerRef, ElementRef} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import {XnService} from '../../../services/xn.service';
import {PortalData} from '../../../config/mock';

@Component({
    templateUrl: './power-manage.component.html',
    styles: [
        `.table { font-size: 13px;}`,
        `.xn-click-a { display: inline-block; padding-left: 5px; padding-right: 5px;}`
    ]
})
export class PowerManageComponent implements OnInit {

    pageTitle = '接口管理';
    pageDesc = '';
    tableTitle = '接口管理';
    cardNo = '';
    items: any;
    newItems: any;
    check: string;
    isInvoice = false;
    isJindieApproval = false;
    showEnterprise = true;
    total = 0;
    pageSize = 10;
    ctrl: AbstractControl;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {

    }

    ngOnInit() {
        this.isInvoice = parseInt(this.xn.user.isInvoice, 10) === 1;
        console.log(': this.xn.user.isInvoice1122: ', this.isInvoice);
        this.items = PortalData.columns;
        this.xn.api.post('/tool/is_jindie',{}).subscribe(data =>{
            this.isJindieApproval = parseInt(data.data.isOpen, 10) === 1;
        })
    }

    checkLogin(event) {
        let checkbox = event.target;
        let checked = checkbox.checked;
        let checkedNumber = checked ? 1 : 0;

        this.goCheck(checkedNumber);
    }

    goCheck(status: any) {
        const cn = status === 1 ? '开启' : '关闭';
        this.xn.api.post('/tool/switch', {
            flag: 'isInvoice',
            status: status
        }).subscribe(json => {
            this.xn.msgBox.open(false, '发票验证' + cn + '成功，请重新登录。', () => {
                this.xn.user.logout();
            });
        });
    }

    checkJindie(event) {
        let checkbox = event.target;
        let checked = checkbox.checked;
        let checkedNumber = checked ? 1 : 0;

        this.Jindie(checkedNumber);
    }

    Jindie(status: any){
        const cn = status === 1 ? '开启' : '关闭';
        this.xn.api.post('/tool/switch_jindie', {
            flag: 'isJindieApproval',
            status: status
        }).subscribe(json => {
            this.xn.msgBox.open(false, '金蝶云审批' + cn + '成功');
        });
    }
}
