import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { XnService } from './xn.service';
import { OutputModel } from '../public/form/hw-mode/bank-card-single-input.component';

@Injectable()
export class HwModeService implements OnInit {
    private bankCardListCache: OutputModel[];

    public constructor(private xn: XnService) {
    }

    public ngOnInit() {
    }

    /**
     *  获取银行信息
     * @returns {Observable<any>}
     */
    public getData(): Observable<any> {
        if (!!this.bankCardListCache) {
            return of(this.bankCardListCache);
        }
        return this.xn.api.post('/jzn/bank_card/get', {}).map(x => {
            this.bankCardListCache = x.data;
            return this.bankCardListCache;
        });
    }

    /**
     *  格式化数据 [{label:'',value:''}]
     * @param list
     * @returns any[]
     */
    public formatData(list: any[]): any[] {
        const listItem = [];
        list.map(item => {
            listItem.push({ label: item.cardCode, value: item.cardCode });
        });
        return listItem;
    }

    /**
     *  下载合同
     * @param id
     * @param secret
     * @param label
     */
    public downContract(id, secret, label) {
        const filename = label + '.pdf';
        this.xn.api.download('/contract/pdf', {
            id: id,
            secret: secret,
        }).subscribe((v: any) => {
            this.xn.api.save(v._body, filename);
        });
    }

    /**
     *  获取定支付保理-所有供应商
     */
    public getSups(): Observable<any> {
        return this.xn.api.post('/llz/direct_payment/supplier_list', {}).map(x => x);
    }

    /**
     *  格式化数组
     */
    public getSupsFormData(): Observable<any> {
        return this.getSups().map(x => {
            if (x.data.data && x.data.data.length) {
                const listItem = [];
                x.data.data.map(item => {
                    listItem.push({ label: item.supplierOrgName, value: item.supplierAppId });
                });
                return listItem;
            }
            return [];
        });
    }

    /**
     * 判断数组
     * @param paramInvoiceInfo
     */
    public arrayLength(paramInvoiceInfo: any): boolean {
        if (!paramInvoiceInfo) {
            return false;
        }
        const obj = paramInvoiceInfo.split(',');
        return !!obj && obj.length > 2;
    }


    /**
     * 判断checker项是否必填，可编辑.
     * 1. 当存在options.readonly===true 时，不可修改：不加粗，无必填标识
     * 2. 不存在时，判断 checker.required=true    加粗，标识   ，false  加粗，无必填标识
     * @param checker
     */


    public checkRequiredAndReadonly(checker: any): InputTipsModel {
        const model = new InputTipsModel();
        if (checker.options && checker.options.readonly && checker.options.readonly === true) {
            model.bold = false;
            model.star = false;
            return model;
        }
        // readonly不存在 或者为false 时
        if (!!checker.required && checker.required !== false && checker.required !== 0) {
            model.star = true;
            model.bold = true;
        } else {
            model.bold = true;
            model.star = false;
        }
        return model;
    }
    /**
    * 判断checker项是否必填，可编辑.
    * 1.判断该chencker项是否含有帮助文档
    *
    * @param checker
    */


    public checkHelp(checker: any): HelpModel {
        const model = new HelpModel();
        if (checker.options && checker.options.helpType) {
            model.help = checker.options.helpType;
            model.detail = checker.options.help;
            return model;
        } else {
            model.help = 0;
            model.detail = '';
        }
        return model;
    }

    public checkRequiredAndReadonly2(checker: any): boolean {
        if (checker.options && checker.options.readonly && checker.options.readonly === true) {
            return false;
        }
        // readonly不存在 或者为false 时
        return !!checker.required && checker.required !== false && checker.required !== 0;
    }

    /**
     *  判断shows数组中有无必填项，切可编辑
     */

    public checkersTips(shows: any[]): boolean {
        if (shows.length) {
            if (shows.length < 2) {
                return false;
            }
            return shows.reduce((items, next: any) => {
                items.push(this.checkRequiredAndReadonly2(next));
                return items;
            }, []).some(x => x === true);
        }
        return false;
    }

    /**
     * 查看流程记录
     * @param paramMainFloId
     */
    public viewProcess(paramMainFloId: string, isProxy?: any) {
        if (paramMainFloId.endsWith('lg') || paramMainFloId.endsWith('wk')) {
            this.xn.router.navigate([
                `dragon/main-list/detail/${paramMainFloId}`
            ]);
        } else {
            let routeparams = isProxy === undefined || isProxy !== 50 ? `${paramMainFloId}` : `${paramMainFloId}/${isProxy}`;
            this.xn.router.navigate([
                `console/main-list/detail/${routeparams}`
            ]);
        }


    }
    /**
     * 龙光查看流程记录
     *  @param paramMainFloId
     */

    public DragonviewProcess(paramMainFloId: string) {
        this.xn.router.navigate([
            `dragon/main-list/detail/${paramMainFloId}`
        ]);

    }

    // public AvengerviewProcess(paramMainFloId: string, isProxy: any, currentStatus: string) {

    // }
    //     /**
    //   * 查看流程记录
    //   * @param paramMainFloId
    //   */
    //     public viewAvengerProcess(paramMainFloId: string, type: string) {
    //         this.xn.router.navigate([
    //             `console/main-list/detail`], { queryParams: { 'paramMainFloId': paramMainFloId, 'type': type } });

    //     }

}

/**
 *  checker项输入提示
 */
export class InputTipsModel {
    bold: boolean;
    star: boolean;
}
export class HelpModel {
    help: number;
    detail: any;
}
