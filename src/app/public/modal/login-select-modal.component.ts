import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModalComponent, ModalSize} from '../../common/modal/components/modal';
import {Observable} from 'rxjs/Observable';
import {XnService} from '../../services/xn.service';

@Component({
    templateUrl: './login-select-modal.component.html',
    styles: [
        `.flex-row { display: flex; margin-bottom: -15px;}`,
        `.pdf-container { width: 100%; height: calc(100vh - 280px); border: none; }`,
        `.my-scroll { overflow-y: auto; max-height: calc(100vh - 260px); }`,
        `.this-pdf { left: 0px; top: 0px; width: 100%; height:100%; }`
    ]
})
export class LoginSelectModalComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;

    private observer: any;

    params: any;
    items: any[] = [];

    constructor(private xn: XnService) {
    }

    ngOnInit() {
    }

    /**
     * 打开查看窗口
     * @param params
     * @returns {any}
     */
    open(params: any): Observable<any> {
        console.log(params);
        this.params = params;
        this.initItems(params.multiOrgs);
        this.modal.open();

        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    onCancel() {
        this.close({
            action: 'cancel'
        });
    }

    onSelect(appId, orgType) {
        this.close({
            action: 'ok',
            appId,
            orgType
        });
    }

    private initItems(multiOrgs: any) {
        const list = [].concat(multiOrgs).sort(this.sortByAppIdDesc);
        this.items = list.map(item => {
            const orgType = this.getOrgType(item.orgType);
            const org = this.isMulti(list, item) && orgType ? `（${ orgType }）` : '';
            return { ...item, orgName: `${item.orgName}${ org }` };
        });
    }

    private sortByAppIdDesc(a, b) {
        return (a.appId - b.appId);
    }

    private isMulti(arr: Array<any>, item) {
        return arr.filter(x => x.appId === item.appId).length > 1;
    }

    private getOrgType(type) {
        switch (type) {
            case 1:
                return '供应商';
            case 2:
                return '核心企业';
            case 3:
                return '保理公司';
            case 4:
                return '银行';
            case 5:
                return '下游采购商';
            case 99:
                return '平台';
            default:
                return '';
        }
    }

    private close(value) {
        this.modal.close();
        this.observer.next(value);
        this.observer.complete();
    }
}
