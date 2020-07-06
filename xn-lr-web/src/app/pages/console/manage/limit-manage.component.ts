import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../../services/xn.service';

@Component({
    templateUrl: './limit-manage.component.html',
    styles: [
        `.table { font-size: 13px; }`,
    ]
})
export class LimitManageComponent implements OnInit {

    pageTitle = '额度管理';
    pageDesc = '';
    tableTitle = '额度管理';

    showEnterprise = true;

    total = 0;
    pageSize = 10;
    items: any[] = [];
    showEdit = false;
    roles: any[] = [];
    showEditOperator = false;

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.onPage(1);
        // console.log("orgType: ", this.xn.user.orgType);
        let showEditOperatorTemp = false;
        this.roles = this.xn.user.roles;
        // console.log("userRoles: ", this.roles);
        for (const i in this.roles) {
            if (this.roles[i] === 'windOperator') {
                showEditOperatorTemp = true;
                this.showEditOperator = showEditOperatorTemp;
            }
        }
    }

    onPage(page: number) {
        page = page || 1;
        this.xn.api.post('/quota/quotalist', {
            start: (page - 1) * this.pageSize,
            length: this.pageSize
        }).subscribe(json => {
            console.log(json);
            this.total = json.data.recordsTotal;
            this.items = json.data.data;
        });
    }

}
