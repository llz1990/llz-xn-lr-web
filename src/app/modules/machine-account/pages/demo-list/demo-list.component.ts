/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：index.component.ts
 * @summary：多标签交易列表(台账)
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          新增              2019-09-3
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TabConfigModel, TabListOutputModel, SubTabListOutputModel, ButtonConfigModel } from '../../../../config/list-config-model';
import CommBase from '../../../../public/component/comm-base';
import { XnService } from '../../../../services/xn.service';
import { HwModeService } from '../../../../services/hw-mode.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import CommUtils from '../../../../public/component/comm-utils';
import { XnUtils } from '../../../../common/xn-utils';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { JsonTransForm } from '../../../../public/pipe/xn-json.pipe';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { InvoiceDataViewModalComponent } from '../../../../public/modal/invoice-data-view-modal.component';
import MachineIndexTabConfig, { SubTabEnum, ApiProxyEnum } from '../../bean/index-tab.config';
import { CheckersOutputModel } from '../../../../config/checkers';
import { DragonPdfSignModalComponent } from '../../../dragon/share/modal/pdf-sign-modal.component';
import { PdfSignModalComponent } from '../../../../public/modal/pdf-sign-modal.component';
import { DownloadAttachmentsModalComponent } from '../../share/modal/download-attachmentsmodal.component';
import { ExportListModalComponent } from '../../share/modal/export-list-modal.component';
import * as _ from 'lodash';
import { MfilesViewModalComponent } from '../../share/modal/mfiles-view-modal.component';
import { MfilesViewModalComponent as ApiMfilesViewModalComponent } from '../../../../public/modal/mfiles-view-modal.component';
import { DragongetCustomListComponent } from '../../../dragon/share/modal/custom-list-modal.component';
import { EditModalComponent } from '../../../dragon/share/modal/edit-modal.component';
import { SingleSearchListModalComponent } from '../../../dragon/share/modal/single-searchList-modal.component';
import { MachineInvoiceListComponent } from '../../share/modal/invoice-list-modal.component';
import { log } from 'util';
import { ConsoleAsideComponent } from '../../../../layout/admin/console-aside.component';

@Component({
    selector: 'xn-avenger-list-component',
    templateUrl: `./demo-list.component.html`,
    styles: [`
        .item-box {
            position: relative;
            display: flex;
            margin-bottom: 10px;
        }


        .item-label label {
            min-width: 150px;
            padding-right: 8px;
            font-weight: normal;
            line-height: 34px;
            text-align:right;

        }

        .item-control {
            flex: 1;
        }

        .item-control select {
            width: 100%
        }

        .operate-btn {
            min-width: 90px;
        }

.center-block{
    clear: both;
    border-bottom: 1px solid #ccc;
    width: 43.9%;
    height: 1px;
}
.showClass{
    width: 12.5%;
    margin: 0 auto;
    border: 1px solid #ccc;
    text-align: center;
    border-top: 0px;
    clear:both;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

        .head-height .sorting, .table-head .sorting_asc, .table-head .sorting_desc {
            /*position: relative;*/
            cursor: pointer
        }

        .head-height .sorting:after, .table-head .sorting_asc:after, .table-head .sorting_desc:after {
            font-family: 'Glyphicons Halflings';
            opacity: 0.5;
        }

        .head-height .sorting:after {
            content: "\\e150";
            opacity: 0.2
        }

        .head-height .sorting_asc:after {
            content: "\\e155"
        }

        .head-height .sorting_desc:after {
            content: "\\e156"
        }

        ul.sub-ul {
            margin-bottom: 5px;
            border-bottom: 1px solid #3c8dbc;
        }

        ul.sub-ul > li > a {
            padding: 5px 35px;
            border-top: none;
            background-color: #F2F2F2;
        }

        ul.sub-ul > li.active > a {
            background-color: #3c8dbc;
        }
        .table-body table tr td{
            border:1px solid #cccccc30;
            text-align: center;
        }
        .table-display tr td {
            width: 150px ;
            vertical-align: middle;
        }

        .height {
            overflow-x: hidden;
        }
        .relative {
            position: relative
        }
        .head-height {
            position: relative;
            overflow: hidden;
        }
        .table-height {
            max-height: 600px;
            overflow: scroll;
        }
        .table {
            table-layout: fixed;
            width: 3000px;
        }
        .table-display {
            margin: 0;
        }

    `]
})
// tslint:disable-next-line: whitespace
export class DemoListComponent implements OnInit {
    private arrObjs = {}; // 缓存后退的变量
    private sortObjs = []; // 缓存后退的排序项
    private paging = 1; // 共享该变量
    private beginTime: any;
    private endTime: any;
    private timeId = [];
    private nowTimeCheckId = '';
    private preChangeTime: any[] = []; // 上次搜索时间段,解决默认时间段搜索请求两次
    private sorting = ''; // 共享该变量 列排序
    private naming = ''; // 共享该变量 列css样式
    private subTabEnum = SubTabEnum; // 子标签参数映射枚举
    private apiProxyEnum = ApiProxyEnum; // 不同业务不同系统
    private searches: CheckersOutputModel[] = []; // 面板搜索配置项暂存
    public tabConfig: TabConfigModel = new TabConfigModel(); // 当前列表配置
    public currentTab: TabListOutputModel = new TabListOutputModel(); // 当前标签页
    public currentSubTab: SubTabListOutputModel = new SubTabListOutputModel(); // 当前子标签页
    public defaultValue = 'B';  // 默认激活第一个标签页
    public subDefaultValue = 'DOING'; // 默认子标签页
    public listInfo: any[] = []; // 数据
    public pageConfig = { pageSize: 10, first: 0, total: 0 }; // 页码配置
    public shows: CheckersOutputModel[] = []; // 搜索项
    public searchForm: FormGroup; // 搜索表单组
    public formModule: string = 'dragon-input';
    public selectedItems: any[] = []; // 选中的项
    public oldSelectItems: any[] = [];
    public newSelectItems: any[] = [];
    public newHeads: any[] = []; //后端返回的自定义table列表
    base: CommBase;
    loanDate: string;
    approvalMemo: string;
    valueDate: string;
    is_jindie: number = -1;
    businessinvoice: boolean = false;
    heads: any[];
    roleId: string[] = [];
    displayShow: boolean = true;
    searchShow: CheckersOutputModel[] = []; // 搜索项
    headLeft = 0;
    headstest: boolean = false;
    // 资产池传入数据 exp {capitalId: "CASH_POOLING_4", type: "2"}
    public formCapitalPool: any = {
        capitalId: 'CASH_POOLING_100',
        capitalPoolName: '龙光2期',
        isProxy: 52,
        type: 1,
        currentPage: 1,
        isLocking: 0,
        storageRack: 'lg-2',
    };
    public selectedReceivables = 0; // 所选交易的应收账款金额汇总
    public selectedPayableAmounts = 0; // 所选交易的转让价款汇总
    public allReceivables = 0; // 所有交易的应收账款金额汇总
    public allPayableAmounts = 0; // 所有交易的转让价款汇总


    constructor(public xn: XnService,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private router: ActivatedRoute,
        public hwModeService: HwModeService,
        public localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        if (this.xn.user.orgType === 3) {
            this.tabConfig = MachineIndexTabConfig.getConfig().machineAccount;
        } else if (this.xn.user.orgType === 99) {
            this.tabConfig = MachineIndexTabConfig.getConfig().platmachineAccount;
        } else {
            this.tabConfig = MachineIndexTabConfig.getConfig().suppliermachineAccount;
        }
        this.initData(this.defaultValue);


    }

    /**
     *  标签页，加载列表信息
     * @param paramTabValue
     * @param init 是否为初始加载，true 不检查切换属性值与当前标签值
     */
    public initData(paramTabValue: string, init?: boolean) {
        // if (this.defaultValue === paramTabValue && !init) {
        //     return;
        // } else { // 重置全局变量
        //     this.selectedItems = [];
        //     this.listInfo = [];
        //     this.naming = '';f
        //     this.sorting = '';fvfv
        //     this.paging = 1;
        //     this.pageConfig = { pageSize: 10, first: 0, total: 0 };
        // }
        // this.defaultValue = paramTabValue;

        this.subDefaultValue = 'DOING'; // 重置子标签默认
        this.onPage({ page: this.paging });
    }
    // 自定义列表
    getCustomlist() {

        XnModalUtils.openInViewContainer
            (this.xn, this.vcr, DragongetCustomListComponent, { headText: this.currentSubTab.headText, selectHead: this.newHeads, status: this.currentSubTab.params }).
            subscribe(x => {
                // this.heads = CommUtils.getListFields(x);
                // this.cdr.markForCheck();
                // this.headstest = true;
                this.onPage({ page: this.paging });
            });

    }

    show() {
        this.displayShow = !this.displayShow;
    }

    /**
     *  子标签tab切换，加载列表
     * @param paramSubTabValue
     */
    public handleSubTabChange(paramSubTabValue: string) {

        if (this.subDefaultValue === paramSubTabValue) {
            return;
        } else {
            this.selectedItems = [];
            this.selectedReceivables = 0;
            this.selectedPayableAmounts = 0;
            this.listInfo = [];
            this.naming = '';
            this.sorting = '';
            this.paging = 1;
            this.pageConfig = { pageSize: 10, first: 0, total: 0 };
            // 重置全局变量
        }
        this.subDefaultValue = paramSubTabValue;
        this.onPage({ page: this.paging });



    }
    // 滚动表头
    onScroll($event: Event) {
        this.headLeft = $event.srcElement.scrollLeft * -1;
    }

    /**
     * @param e  page: 新页码、 pageSize: 页面显示行数、first: 新页面之前的总行数、pageCount : 页码总数
     * @summary 采购融资，地产abs  请求api有区别，采购融资：avenger 、地产abs：api
     */
    public onPage(e?: { page: number, first?: number, pageSize?: number, pageCount?: number }, ) {
        this.paging = e.page || 1;
        this.onUrlData(); // 导航回退取值
        if (this.sortObjs.length !== 0) {
            this.sorting = DragonTradeListOrderEnum[this.sortObjs[0].name];
            this.naming = machineAccountSort[this.sortObjs[0].asc];
        }
        this.pageConfig = Object.assign({}, this.pageConfig, e);
        // 页面配置
        const find = this.tabConfig.tabList.find(tab => tab.value === this.defaultValue);
        this.currentTab = !!find ? find : new TabListOutputModel();


        // 子页面配置
        const subFind = this.currentTab.subTabList.find(sub => sub.value === this.subDefaultValue);
        this.currentSubTab = !!subFind ? subFind : new SubTabListOutputModel();
        // 请求自定义列表数据
        // console.info('heads==>', this.heads);
        this.searches = this.currentSubTab.searches; // 当前标签页的搜索项
        this.buildShow(this.searches);
        // 构建参数
        const params = this.buildParams(this.currentSubTab.params);
        if (this.currentTab.post_url === '') {
            // 固定值
            this.listInfo = [];
            this.pageConfig.total = 0;
            return;
        }
        this.xn.loading.open();
        // 采购融资 ：avenger,  地产abs

        this.xn[this.apiProxyEnum[this.defaultValue]].post(this.currentTab.post_url, params).subscribe(x => {
            this.newHeads = [];
            if (x.data.column === null) {
                this.heads = CommUtils.getListFields(this.currentSubTab.headText);

            } else {
                this.heads = CommUtils.getListFields(this.currentSubTab.headText);
                this.heads.forEach((y, index) => {
                    JSON.parse(x.data.column).forEach((z: any) => {
                        if (y.value === z) {
                            this.newHeads.push(y);
                        }
                    });
                });
                this.heads = this.newHeads;
                this.cdr.markForCheck();
            }
            if (x.data && x.data.data && x.data.data.length) {
                x.data.data.forEach(obj => {
                    if (obj.isProxy !== 52 && obj.isProxy !== 53 && obj.isProxy !== 50) {
                        obj['color'] = "#D9D9D9";
                    }
                });
                this.listInfo = x.data.data;
                this.allReceivables = x.data.sumReceive || 0;
                this.allPayableAmounts = x.data.sumChangePrice || 0;
                if (x.data.recordsTotal === undefined) {
                    this.pageConfig.total = x.data.count;
                } else {
                    this.pageConfig.total = x.data.recordsTotal;
                }
                if (x.data.roles !== undefined) {
                    this.roleId = x.data.roles;
                }
            } else if (x.data && x.data.lists && x.data.lists.length) {
                this.listInfo = x.data.lists;
                this.pageConfig.total = x.data.count;
                this.allReceivables = x.data.sumReceive || 0;
                this.allPayableAmounts = x.data.sumChangePrice || 0;
            } else {
                // 固定值
                this.listInfo = [];
                this.pageConfig.total = 0;
                this.allReceivables = 0;
                this.allPayableAmounts = 0;
            }
            this.cdr.markForCheck();
            // this.operateMoney();
        }, () => {
            // 固定值
            this.listInfo = [];
            this.selectedItems = [];
            this.selectedReceivables = 0;
            this.selectedPayableAmounts = 0;
            this.pageConfig.total = 0;
            this.allReceivables = 0;
            this.allPayableAmounts = 0;
        }, () => {
            this.xn.loading.close();
        });
    }

    // public operateMoney() {
    //     this.listInfo.forEach(item => {
    //         item['receive'] = item['receive'].toFixed(2);
    //     })
    // }

    /**
     *  搜索,默认加载第一页
     */
    public searchMsg() {
        this.selectedItems = [];
        this.selectedReceivables = 0;
        this.selectedPayableAmounts = 0;
        this.paging = 1;
        this.onPage({ page: this.paging });
    }

    /**
     *
     * @param paramsValue 进入资产池  --资产池名称
     */
    enterCapitalPool(paramsValue) {
        let params = {
            mainFlowId: paramsValue
        };
        this.xn.dragon.post('/trade/get_mainflowid_pool_info', params).subscribe(x => {
            if (x.ret === 0 && x.data.capitalPoolId !== '') {
                if (x.data.headquarters === '深圳市龙光控股有限公司') {
                    this.xn.router.navigate(['/dragon/capital-pool/trading-list'], {
                        queryParams: {
                            capitalId: x.data.capitalPoolId,
                            capitalPoolName: x.data.capitalPoolName,
                            isProxy: 52,
                            type: 1,
                            currentPage: 1,
                            isLocking: 0,
                            storageRack: 'lg-2',
                            fromProject: true,
                        }
                    });
                } else if (x.data.headquarters === '万科企业股份有限公司') {
                    this.xn.router.navigate(['/dragon/vanke/capital-pool'], {
                        queryParams: {
                            title: '资产管理>' + (x.data.type === 1 ? 'ABS储架项目' : '再保理银行项目') + '>' + x.data.projectName + '-' + x.data.headquarters,
                            projectId: x.data.projectId,
                            headquarters: x.data.headquarters,
                            fitProject: x.data.projectName,
                            capitalPoolId: x.data.capitalPoolId,
                            capitalPoolName: x.data.capitalPoolName,
                            isMachineenter: true,
                        }
                    });
                }

            } else if (x.ret === 0 && !x.data.capitalPoolId) {
                this.onPage({ page: this.paging });
            }
        });
    }

    /**
     * 重置
     */
    public reset() {
        this.selectedItems = [];
        this.selectedReceivables = 0;
        this.selectedPayableAmounts = 0;
        // this.searchForm.reset(); // 清空
        for (const key in this.arrObjs) {
            if (this.arrObjs.hasOwnProperty(key)) {
                delete this.arrObjs[key];
            }
        }
        this.sortObjs = [];
        this.sorting = '';
        this.naming = '';
        this.buildCondition(this.searches);
        this.searchMsg(); // 清空之后自动调一次search
    }


    /**
     *  列表头样式
     * @param paramsKey
     */
    public onSortClass(paramsKey: string): string {
        if (paramsKey === this.sorting) {
            return 'sorting_' + this.naming;
        } else {
            return 'sorting';
        }
    }

    /**
     *  按当前列排序
     * @param sort
     */
    public onSort(sort: string) {
        if (this.sorting === sort) {
            this.naming = this.naming === 'desc' ? 'asc' : 'desc';
        } else {
            this.sorting = sort;
            this.naming = 'asc';
        }
        this.sortObjs = [
            {
                name: DragonTradeListOrderEnum[this.sorting],
                asc: machineAccountSort[this.naming],
            }
        ];
        this.onPage({ page: this.paging });
    }

    /**
     * 计算表格合并项
     * currentSubTab.headText.length + 可选择1 + 序号1 + 行操作+1
     */
    public calcAttrColspan(): number {
        let nums: number = this.currentSubTab.headText.length + 1;
        const boolArray = [this.currentSubTab.canChecked,
        this.currentSubTab.edit && this.currentSubTab.edit.rowButtons && this.currentSubTab.edit.rowButtons.length > 0];
        nums += boolArray.filter(arr => arr === true).length;
        return nums;
    }

    /**
     *  判断列表项是否全部选中
     */
    public isAllChecked(): boolean {
        return !(this.listInfo.some(x => !x['checked'] || x['checked'] && x['checked'] === false) || this.listInfo.length === 0);
    }

    /**
     *  全选
     */
    public checkAll() {
        if (!this.isAllChecked()) {
            this.listInfo.forEach(item => item['checked'] = true);
            this.selectedItems = XnUtils.distinctArray2([...this.selectedItems, ...this.listInfo], 'mainFlowId');
            this.selectedReceivables = 0;
            this.selectedPayableAmounts = 0;
            this.selectedItems.forEach(item => {
                this.selectedReceivables = Number((this.selectedReceivables + item.receive).toFixed(2)); //勾选交易总额
                this.selectedPayableAmounts = Number((this.selectedPayableAmounts + item.changePrice).toFixed(2));
            });
        } else {
            this.listInfo.forEach(item => item['checked'] = false);
            this.selectedItems = [];
            this.selectedReceivables = 0;
            this.selectedPayableAmounts = 0;
        }
    }

    /**
     * 单选
     * @param paramItem
     * @param index
     */
    public singleChecked(paramItem) {
        if (paramItem['checked'] && paramItem['checked'] === true) {
            paramItem['checked'] = false;
            this.selectedItems = this.selectedItems.filter(x => x.mainFlowId !== paramItem.mainFlowId);
            this.selectedReceivables = Number((this.selectedReceivables - paramItem.receive).toFixed(2)); // 勾选交易总额
            this.selectedPayableAmounts = Number((this.selectedPayableAmounts - paramItem.changePrice).toFixed(2));
        } else {
            paramItem['checked'] = true;
            this.selectedItems.push(paramItem);
            this.selectedItems = XnUtils.distinctArray2(this.selectedItems, 'mainFlowId'); // 去除相同的项
            this.selectedReceivables = Number((this.selectedReceivables + paramItem.receive).toFixed(2)); // 勾选交易总额
            this.selectedPayableAmounts = Number((this.selectedPayableAmounts + paramItem.changePrice).toFixed(2));
        }

    }

    /**
     *  查看合同，只读
     * @param paramContractInfo
     */
    public showContract(paramContractInfo, isProxy) {
        const params = Object.assign({}, paramContractInfo, { readonly: true });
        if (isProxy === 50 || isProxy === 52 || isProxy === 53) {
            XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonPdfSignModalComponent, params).subscribe(() => {
            });
        } else {
            XnModalUtils.openInViewContainer(
                this.xn,
                this.vcr,
                PdfSignModalComponent,
                params
            ).subscribe(() => {
                // do nothing
            });
        }
    }

    /**
     *  查看更多发票
     * @param paramItem
     */
    public viewMore(paramItem, mainFlowId: string, isProxy: any) {
        if (isProxy === 50 || isProxy === 52 || isProxy === 53) {
            XnModalUtils.openInViewContainer(
                this.xn,
                this.vcr,
                MachineInvoiceListComponent,
                { mainFlowId: mainFlowId }
            ).subscribe(() => {
            });
        } else {
            this.xn.api.post('/llz/risk_warning/invoice_management/invoice_all', { mainFlowId: mainFlowId }).subscribe(x => {
                // 打开弹框
                const params = {
                    get_url: '',
                    get_type: '',
                    multiple: false,
                    label: '发票详情',
                    heads: [
                        { label: '发票代码', value: 'invoiceCode', type: 'text' },
                        { label: '发票号码', value: 'invoiceNum', type: 'text' },
                        { label: '发票含税金额', value: 'invoiceAmount', type: 'money' },
                        { label: '发票转让金额', value: 'amount', type: 'money' },
                        // { label: '发票文件', value: 'invoiceFile',type: 'file' },
                    ],
                    searches: [],
                    key: 'invoiceCode',
                    data: x.data || [],
                    total: x.data.length || 0,
                    inputParam: {
                        mainFlowId: mainFlowId
                    }
                };
                XnModalUtils.openInViewContainer(this.xn, this.vcr, SingleSearchListModalComponent, params).subscribe(v => {
                    if (v === null) {
                        return;
                    }
                });
            });

        }

    }

    /**
     *  查看文件信息
     * @param paramFile
     */
    public viewFiles(paramFile, isProxy) {
        if (typeof paramFile === 'string') {
            paramFile = JSON.parse(paramFile);
        }
        if (isProxy === 50 || isProxy === 52 || isProxy === 53) {
            XnModalUtils.openInViewContainer(this.xn, this.vcr, MfilesViewModalComponent, paramFile).subscribe();
        } else {
            XnModalUtils.openInViewContainer(this.xn, this.vcr, ApiMfilesViewModalComponent, paramFile)
                .subscribe(() => {
                });
        }
    }

    /**
     *  判断数据类型
     * @param paramValue
     */
    public judgeDataType(paramValue: any): boolean {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(paramValue);
        } else {
            return Object.prototype.toString.call(paramValue) === '[object Array]';
        }
    }

    /**
     *  格式化数据
     * @param paramData
     */
    public jsonTransForm(paramData) {
        return JsonTransForm(paramData);
    }

    /**
     *  判断数据是否长度大于显示最大值
     * @param paramFileInfos
     */
    public arrayLength(paramFileInfos: any) {
        if (!paramFileInfos) {
            return false;
        }
        let obj = [];
        if (JSON.stringify(paramFileInfos).includes('[')) {
            obj = typeof paramFileInfos === 'string'
                ? JSON.parse(paramFileInfos)
                : paramFileInfos;
        } else {
            obj = typeof paramFileInfos === 'string'
                ? paramFileInfos.split(',')
                : [paramFileInfos];
        }
        return obj;
    }

    public stringLength(paramsString: string) {
        return paramsString.length;
    }

    viewMemo(paramMemo: string) {
        const checkers = [{
            title: '备注',
            checkerId: 'memo',
            type: 'textarea',
            options: { readonly: true },
            value: paramMemo,
            required: 0
        }];
        const params = {
            checker: checkers,
            title: '查看备注',
            buttons: ['确定'],
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {
            });

    }
    /**
     *  表头按钮组事件
     * @param paramBtnOperate
     */
    public handleHeadClick(paramBtnOperate: ButtonConfigModel) {
        if (paramBtnOperate.operate === 'download_file') {
            //let params = { mainFlowIdList: this.selectedItems.map(m => m.mainFlowId) };
            const selectedRows = this.listInfo.filter(
                x => x.checked && x.checked === true
            );
            const params = {
                hasSelect: !!selectedRows && selectedRows.length > 0,
                selectedCompany: '',
                listInfo: this.listInfo,
                selectedItems: this.selectedItems
            };
            //检查公司名称是否一致
            let selectCompanys = XnUtils.distinctArray(this.listInfo.map(c => c.headquarters));
            if (selectCompanys.length > 1) {
                let isVanke = selectCompanys.every(sel => sel.includes('万科'));
                if (isVanke) {
                    params.selectedCompany = '万科';
                } else {
                    this.xn.msgBox.open(false, '筛选条件下，具有不同公司！');
                    return;
                }
            } else if (selectCompanys.length === 1) {
                params.selectedCompany = selectCompanys.toString();
            }
            XnModalUtils.openInViewContainer(this.xn, this.vcr, DownloadAttachmentsModalComponent, params).subscribe(data => {
                if (data !== '') {
                    this.xn.loading.open();
                    let oldMainFlowId = this.listInfo.filter(y => y.isProxy !== 52 && y.isProxy !== 53 && y.isProxy !== 50); // 老业务
                    let newMainFlowId = this.listInfo.filter(z => z.isProxy === 50 || z.isProxy === 52 || z.isProxy === 53);
                    this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
                    this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53);

                    const newparam = { mainFlowIdList: [], contentType: [] }; // 新业务参数
                    const oldparam = { mainIdList: [], chooseFile: '' }; // 老业务参数

                    oldparam.chooseFile = data.oldchooseFile ? data.oldchooseFile.split(',').filter(c => c !== '') : '';
                    newparam.contentType = data.chooseFile ? data.chooseFile.split(',').filter(c => c !== '').map(x => Number(x)) : '';

                    if (data.downloadRange === 'all') {
                        newparam.mainFlowIdList = newMainFlowId.map(c => c.mainFlowId); // 刷选新万科业务
                        oldparam.mainIdList = oldMainFlowId.map(c => c.mainFlowId);
                    } else if (data.downloadRange === 'selected') {
                        if (this.selectedItems.length === 0) {
                            this.xn.msgBox.open(false, '未选择交易');
                            return;
                        }
                        newparam.mainFlowIdList = this.newSelectItems.map(c => c.mainFlowId);
                        oldparam.mainIdList = this.oldSelectItems.map(x => x.mainFlowId);
                    }
                    // console.log(newparam,oldparam);
                    if ((data.downloadRange === 'all' && newMainFlowId.length > 0) || (data.downloadRange === 'selected' && this.newSelectItems.length > 0)) {
                        this.xn.dragon.download(paramBtnOperate.post_url, newparam).subscribe((v: any) => {
                            this.xn.loading.close();
                            const reader = new FileReader();
                            reader.onload = () => {
                                try {
                                    const content = JSON.parse(reader.result); // 内容就在这里
                                    if (content.ret === 1000) {
                                        this.xn.msgBox.open(false, content.msg);
                                    }
                                } catch (e) {
                                    this.xn.api.save(v._body, '台账附件.zip');
                                }

                            };
                            reader.readAsText(v._body);
                        });
                    }
                    if ((data.downloadRange === 'all' && oldMainFlowId.length > 0) || (data.downloadRange === 'selected' && this.oldSelectItems.length > 0)) {
                        this.xn.api.download('/custom/vanke_v5/contract/load_attachment', oldparam).subscribe((v: any) => {
                            this.xn.loading.close();
                            const reader = new FileReader();
                            reader.onload = () => {
                                try {
                                    const content = JSON.parse(reader.result); // 内容就在这里
                                    if (content.ret === 1000) {
                                        this.xn.msgBox.open(false, content.msg);
                                    }
                                } catch (e) {
                                    this.xn.api.save(v._body, '老ABS业务附件.zip');
                                }
                            };
                            reader.readAsText(v._body);
                        });
                    }

                }

            });

        } else if (paramBtnOperate.operate === 'export_file') {

            this.downloadApprovallist(paramBtnOperate);

        } else if (paramBtnOperate.operate === 'sub_zhongdeng_register') {
            // let tradestatus = this.selectedItems.map(x => x.tradeStatus);
            // for (let i = 0; i < tradestatus.length; i++) {
            //     if (tradestatus[i] !== 103) {
            //         this.xn.msgBox.open(false, '无法发起中登登记。仅当业务状态为【平台审核-初审】时，可以发起中登登记');
            //         return;
            //     }
            // }

            if (this.selectedItems.length < 1) {
                this.xn.msgBox.open(false, '请选择交易');
                return false;
            }
            this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
            this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53); // 新业务的退单流程
            if (this.oldSelectItems.length > 0) {
                this.xn.msgBox.open(false, [
                    '您选择的交易，存在' + this.oldSelectItems.length + '笔旧ABS交易',
                    ...this.oldSelectItems.map(o => o.mainFlowId),
                    '不能进行"中登登记"操作'
                ], () => {
                    if (this.oldSelectItems.length !== this.selectedItems.length) {
                        this.xn.router.navigate([`/machine-account/zhongdeng/new`],
                            {
                                queryParams: {
                                    relate: 'mainIds',
                                    relateValue: this.newSelectItems.map(x => x.mainFlowId)
                                }
                            });
                    }
                });
            } else {
                this.xn.router.navigate([`/machine-account/zhongdeng/new`],
                    {
                        queryParams: {
                            relate: 'mainIds',
                            relateValue: this.newSelectItems.map(x => x.mainFlowId)
                        }
                    });
            }
        } else if (paramBtnOperate.operate === 'add-data') {
            if (this.selectedItems.length < 1) {
                this.xn.msgBox.open(false, '请选择交易');
                return false;
            }
            this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
            if (this.oldSelectItems.length > 0) {
                this.xn.msgBox.open(false, [
                    '您选择的交易，存在' + this.oldSelectItems.length + '笔旧ABS交易',
                    ...this.oldSelectItems.map(o => o.mainFlowId),
                    '不能进行"补充信息"操作'
                ], () => {
                    if (this.oldSelectItems.length !== this.selectedItems.length) {
                        this.batchModify();
                    }
                });
            } else {
                this.batchModify();
            }

        } else if (paramBtnOperate.operate === 'change-signType') {
            if (this.selectedItems.length < 1) {
                this.xn.msgBox.open(false, '请选择交易');
                return false;
            }
            this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
            if (this.oldSelectItems.length > 0) {
                this.xn.msgBox.open(false,
                    [
                        '您选择的交易，存在' + this.oldSelectItems.length + '笔旧ABS交易',
                        ...this.oldSelectItems.map(o => o.mainFlowId),
                        '不能进行"调整签署方式"操作'
                    ], () => {
                        if (this.oldSelectItems.length !== this.selectedItems.length) {
                            this.setSigntype();
                        }
                    });
            } else {
                this.setSigntype();
            }
        } else if (paramBtnOperate.operate === 'reject-program') {
            if (this.selectedItems.length < 1) {
                this.xn.msgBox.open(false, '请选择交易');
                return false;
            }
            this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
            if (this.oldSelectItems.length > 0) {
                this.xn.msgBox.open(false, [
                    '您选择的交易，存在' + this.oldSelectItems.length + '笔旧ABS交易',
                    ...this.oldSelectItems.map(o => o.mainFlowId),
                    '不能进行"退单流程"操作'
                ], () => {
                    if (this.oldSelectItems.length !== this.selectedItems.length) {
                        this.rejectProgram();
                    }
                });
            } else {
                this.rejectProgram();
            }
        }
    }

    /**
         * 批量补充
         */
    public batchModify() {
        this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53); // 新业务的退单流程
        const param = { mainList: this.newSelectItems };
        this.newSelectItems.map((sel) => sel['headquarters'] = sel['headquarters'] === '万科企业股份有限公司' ? '万科' : sel['headquarters']);
        this.localStorageService.setCacheValue('batchModifyMainList', param);
        const formCapitalPool = { isDemoList: true, ... this.formCapitalPool }; // 台账标识
        this.xn.router.navigate(['/dragon/capital-pool/batch-modify'], {
            queryParams: formCapitalPool
        });
        // this.xn.router.navigate(['/dragon/capital-pool/batch-modify'], {
        //     queryParams: this.formCapitalPool
        // });
    }

    rejectProgram() {
        this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53); // 新业务的退单流程
        let mainIds = this.newSelectItems.map(c => c.mainFlowId);
        this.xn.router.navigate([`/machine-account/record/new/`],
            {
                queryParams: {
                    id: 'sub_factoring_retreat',
                    relate: 'mainIds',
                    relateValue: mainIds,
                }
            });
    }

    /**
     * 行按钮组事件
     * @param paramItem 当前行数据
     * @param paramBtnOperate 按钮操作配置
     * @param i 下标
     */
    public handleRowClick(paramItem, paramBtnOperate: ButtonConfigModel) {
        if (paramBtnOperate.operate === 'addData') {
            const checkers = [{
                title: '交易ID',
                checkerId: 'mainFlowId',
                type: 'text',
                options: { readonly: true },
                value: paramItem.mainFlowId
            }, {
                title: '后补资料',
                checkerId: 'backUpFiles',
                type: 'dragonMfile',
                required: 0,
                checked: false,
                options: { 'fileext': 'jpg, jpeg, png, pdf' },
                value: paramItem.backUpFiles || ''
            }, {
                title: '是否需后补资料',
                checkerId: 'isBackUp',
                type: 'radio',
                required: false,
                options: { ref: 'defaultRadio' },
                value: paramItem.isBackUp
            }];
            const params = {
                checker: checkers,
                title: '后补资料弹窗',
                buttons: ['取消', '确定'],
            };
            XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
                .subscribe((v) => {

                    if (v === null) {
                        return;
                    } else {
                        v.isBackUp = v.isBackUp === '1' ? 1 : 2;
                        v.mainFlowId = paramItem.mainFlowId;
                        this.xn.dragon.post('/trade/set_back_up', v).subscribe(x => {
                            if (x.ret === 0) {
                                this.onPage({ page: this.paging });
                                this.selectedItems = [];
                            }
                        });

                    }
                });

        } else {
            paramBtnOperate.click(paramItem, this.xn, this.hwModeService);
        }
    }

    /**
     * 构建搜索项
     * @param searches
     */
    private buildShow(searches) {
        this.shows = [];
        this.onUrlData();
        this.buildCondition(searches);
    }

    // 台账中登登记权限
    public openZhongdeng() {
        return this.xn.user.orgType === 99 && this.subDefaultValue === 'DOING'
            && (this.xn.user.roles.includes('operator') || this.xn.user.roles.includes('reviewer'));
    }
    // 台账修改预录入信息权限
    public changeInfo() {
        return this.subDefaultValue === 'DOING' && this.xn.user.orgType === 99
            && this.xn.user.roles.includes('operator');
    }
    public stopControl(paramItem) {
        return (this.xn.user.orgType === 99 || this.xn.user.orgType === 3)
            && (this.xn.user.roles.includes('operator') || this.xn.user.roles.includes('reviewer')
                && (this.subDefaultValue === 'DOING' || this.subDefaultValue === 'TODO')
                && (paramItem.tradeStatus > 6 || paramItem.tradeStatus === 4));

    }
    setSigntype() {
        this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53); // 新业务的退单流程
        const checkers = [{
            title: '交易信息',
            checkerId: 'mainFlowIdList',
            type: 'set-signType',
            options: { readonly: true },
            value: this.newSelectItems
        }, {
            title: '签署方式',
            checkerId: 'signType',
            type: 'select',
            required: 1,
            options: { ref: 'signType' },
        }];
        const params = {
            checker: checkers,
            title: '签署方式弹窗',
            buttons: ['取消', '确定'],
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {

                if (v === null) {
                    return;
                } else {
                    v.mainFlowIdList = this.newSelectItems.map(c => c.mainFlowId);
                    v.signType = Number(v.signType);
                    this.xn.dragon.post('/trade/set_sign_type', v).subscribe(x => {
                        if (x.ret === 0) {
                            this.onPage({ page: this.paging });
                            this.selectedItems = [];
                        }
                    });

                }
            });
    }
    // 修改备注信息
    changeRemark() {
        return this.subDefaultValue === 'DOING';
    }
    // 进入审核页面权限
    public openView() {
        return this.xn.user.orgType === 99 && (this.xn.user.roles.includes('operator') || this.xn.user.roles.includes('reviewer'));
    }


    /**
     * 搜索项值格式化
     * @param searches
     */
    private buildCondition(searches) {
        const tmpTime = {
            beginTime: this.beginTime,
            endTime: this.endTime
        };
        const objList = [];
        this.timeId = $.extend(true, [], this.searches.filter(v => v.type === 'quantum').map(v => v.checkerId));
        for (let i = 0; i < searches.length; i++) {
            const obj = {};
            obj['title'] = searches[i]['title'];
            obj['checkerId'] = searches[i]['checkerId'];
            obj['required'] = false;
            obj['type'] = searches[i]['type'];
            obj['sortOrder'] = searches[i]['sortOrder'];
            obj['options'] = searches[i]['options'];
            if (searches[i]['checkerId'] === this.timeId[0]) {
                obj['value'] = JSON.stringify(tmpTime);
            } else {
                obj['value'] = this.arrObjs[searches[i]['checkerId']];
            }
            objList.push(obj);
        }
        this.shows = $.extend(true, [], objList.sort(function (a, b) {
            return a.sortOrder - b.sortOrder;
        })); // 深拷贝，并排序;

        XnFormUtils.buildSelectOptions(this.shows);
        this.buildChecker(this.shows);
        this.searchForm = XnFormUtils.buildFormGroup(this.shows);
        const time = this.searches.filter(v => v.type === 'quantum');
        const timeCheckId = time[0] && time[0]['checkerId'];
        this.nowTimeCheckId = timeCheckId;
        this.searchForm.valueChanges.subscribe((v) => {
            // 时间段
            const changeId = v[timeCheckId];
            delete v[timeCheckId];
            if (changeId !== '' && this.nowTimeCheckId) {
                const paramsTime = JSON.parse(changeId);
                const beginTime = parseInt(paramsTime['beginTime']);
                const endTime = parseInt(paramsTime['endTime']);
                // 保存每次的时间值。
                this.preChangeTime.unshift({ begin: beginTime, end: endTime });
                // 默认创建时间
                this.beginTime = beginTime;
                this.endTime = endTime;
                if (this.preChangeTime.length > 1) {
                    if (this.preChangeTime[1].begin === this.beginTime &&
                        this.preChangeTime[1].end === this.endTime) {
                        // return;
                    } else {
                        this.beginTime = beginTime;
                        this.endTime = endTime;
                        this.paging = 1;
                        this.onPage({ page: this.paging });
                    }
                }
            }
            const arrObj = {};
            for (const item in v) {
                if (v.hasOwnProperty(item) && v[item] !== '') {
                    const searchFilter = this.searches.filter(v1 => v1 && v1['base'] === 'number')
                        .map(c => c['checkerId']);
                    if (searchFilter.indexOf(item) >= 0) {
                        arrObj[item] = Number(v[item]);
                    } else {
                        arrObj[item] = v[item];
                    }
                }
            }
            this.arrObjs = $.extend(true, {}, arrObj); // 深拷贝;要进行搜索的变量
            this.onUrlData();

        });
    }

    /**
     * 构建列表请求参数
     */
    private buildParams(addparams: number) {

        let params = null;
        if (addparams !== undefined) {
            params = {
                pageNo: this.paging,
                pageSize: this.pageConfig.pageSize,
                status: Number(addparams),
            };

        }

        // 分页处理

        // 排序处理
        if (this.sortObjs.length !== 0) {
            params.order = [
                {
                    name: this.sortObjs[0].name,
                    asc: this.sortObjs[0].asc,
                }
            ];
        }
        // 搜索处理
        if (this.searches.length > 0) {
            for (const search of this.searches) {

                if (!XnUtils.isEmpty(this.arrObjs[search.checkerId])) {
                    if (search.checkerId === 'transactionStatus') {
                        let obj = JSON.parse(this.arrObjs[search.checkerId]);
                        params.flowId = obj.tradeStatus;
                        params.isProxy = obj.isProxy;
                        // params = Object.assign(params, {flow});
                    } else if (search.checkerId === 'isPriorityLoanDate') {
                        const priorityLoanDate = JSON.parse(this.arrObjs[search.checkerId]);
                        if (priorityLoanDate.isPriorityLoanDate <= 0) {
                            params['isPriorityLoanDate'] = priorityLoanDate.isPriorityLoanDate;
                        } else {
                            params['priorityLoanDateStart'] = priorityLoanDate.priorityLoanDateStart;
                            params['priorityLoanDateEnd'] = priorityLoanDate.priorityLoanDateEnd;
                            params['isPriorityLoanDate'] = priorityLoanDate.isPriorityLoanDate;
                        }
                    } else if (search.checkerId === 'isHeadPreDate') {
                        const priorityLoanDate = JSON.parse(this.arrObjs[search.checkerId]);
                        if (priorityLoanDate.isPriorityLoanDate <= 0) {
                            params['isHeadPreDate'] = priorityLoanDate.isPriorityLoanDate;
                        } else {
                            params['headPreDateStart'] = priorityLoanDate.priorityLoanDateStart;
                            params['headPreDateEnd'] = priorityLoanDate.priorityLoanDateEnd;
                            params['isHeadPreDate'] = priorityLoanDate.isPriorityLoanDate;
                        }

                    } else if (search.checkerId === 'headquarters') {
                        if (this.arrObjs[search.checkerId] === '万科企业股份有限公司') {
                            params[search.checkerId] = '万科';

                        } else {
                            params[search.checkerId] = this.arrObjs[search.checkerId];

                        }
                    } else if (search.checkerId === 'productType') {
                        const val = JSON.parse(this.arrObjs[search.checkerId]);
                        params['type'] = Number(val.proxy);
                        if (!!val.status) {
                            params['selectBank'] = Number(val.status);
                        }
                    } else {
                        params[search.checkerId] = this.arrObjs[search.checkerId];
                    }
                }
            }
        }
        // 列表子标签页，构建参数 ,当且子标签状态有大于2中时,添加状态参数
        if (this.currentTab.subTabList.length >= 2) {
            params['status'] = this.subTabEnum[this.subDefaultValue];
        }
        return params;
    }



    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }
    public handleClick(type: number) {
        if (type === 1) {
            this.xn.router.navigate([`/console/record/avenger/new/sub_approval_honor_530`]);
        } else if (type === 2) {
            this.xn.router.navigate([`/console/record/avenger/new/sub_approval_return_530`]);
        } else if (type === 3) {

        }
    }

    handlerowInvoiceClick(row, paramBtnOperate: ButtonConfigModel) {
        let checkers = null;
        if (this.xn.user.orgType === 99 || this.xn.user.orgType === 3) {
            checkers = [{
                title: '入池建议',
                checkerId: 'poolAdvise',
                type: 'select',
                required: false,
                options: { ref: 'entoCapitalSugest' },
                value: row.poolAdvise
            }, {
                title: '备注状态',
                checkerId: 'memoStatus',
                type: 'select',
                required: false,
                options: { ref: 'memoStatus' },
                value: row.memoStatus
            }, {
                title: '备注信息',
                checkerId: 'memo',
                type: 'textarea',
                required: false,
                options: { readonly: false },
                value: row.memo
            }];
        } else {
            checkers = [
                {
                    title: '备注信息',
                    checkerId: 'memo',
                    type: 'textarea',
                    required: false,
                    options: { readonly: false },
                    value: row.memo
                },
            ];
        }

        const params = {
            checker: checkers,
            title: '修改备注信息',
            buttons: ['取消', '确定'],

        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {

                if (v === null) {
                    return;
                } else {
                    this.xn.dragon.post(paramBtnOperate.post_url, { ...v, mainFlowId: row.mainFlowId, }).subscribe(x => {
                        if (x.ret === 0) {
                            row.memo = v.memo;
                            this.onPage({ page: this.paging });
                            this.selectedItems = [];

                        }

                    });
                }
            });
    }
    /**
     * 回退操作，路由存储
     * @param data
     */
    private onUrlData() {
        const urlData = this.xn.user.getUrlData(this.xn.router.url);
        if (urlData && urlData.pop) {
            this.paging = urlData.data.paging || this.paging;
            this.pageConfig = urlData.data.pageConfig || this.pageConfig;
            this.beginTime = urlData.data.beginTime || this.beginTime;
            this.endTime = urlData.data.endTime || this.endTime;
            this.arrObjs = urlData.data.arrObjs || this.arrObjs;
            this.sortObjs = urlData.data.sortObjs || this.sortObjs;
            this.defaultValue = urlData.data.defaultValue || this.defaultValue;
            this.subDefaultValue = urlData.data.subDefaultValue || this.subDefaultValue;
        } else {
            this.xn.user.setUrlData(this.xn.router.url, {
                paging: this.paging,
                pageConfig: this.pageConfig,
                beginTime: this.beginTime,
                endTime: this.endTime,
                arrObjs: this.arrObjs,
                sortObjs: this.sortObjs,
                defaultValue: this.defaultValue,
                subDefaultValue: this.subDefaultValue
            });
        }
    }




    // 导出清单

    downloadApprovallist(paramItem: any) {
        const params = { hasSelect: !!this.selectedItems && this.selectedItems.length > 0 };
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            ExportListModalComponent,
            params
        ).subscribe(x => {
            if (x === '') {
                return;
            }
            this.xn.loading.open();
            let oldMainFlowId = this.listInfo.filter(y =>
                y.isProxy !== 52 && y.isProxy !== 53 && y.isProxy !== 50
            ); // 老业务
            this.oldSelectItems = this.selectedItems.filter(x => (x.isProxy !== 52 && x.isProxy !== 53 && x.isProxy !== 50)); // 老业务
            let oldParam = {
                isProxy: 0,
                mainFlowIds: [],
                capitalId: '',
                type: '',
            };

            let newMainFlowId = this.listInfo.filter(z => z.isProxy === 50 || z.isProxy === 52 || z.isProxy === 53);
            this.newSelectItems = this.selectedItems.filter(x => x.isProxy === 50 || x.isProxy === 52 || x.isProxy === 53);
            let newParam = {
                status: paramItem.flag,
                mainFlowIdList: [],
                type: '',
            };
            let allProxy = [];
            let oldType = '';
            if (x.exportList === 'all') {
                newParam.type = 'all';
                newParam.mainFlowIdList = [];

                oldType = 'all';
                allProxy = oldMainFlowId.map(p => p.isProxy);
            } else if (x.exportList === 'selected') {
                newParam.type = 'selected';
                newParam.mainFlowIdList = this.newSelectItems.map(c => c.mainFlowId);

                oldType = 'selected';
                allProxy = this.oldSelectItems.map(p => p.isProxy);
            }

            if (newParam.type === 'all' || (newParam.type === 'selected' && this.newSelectItems.length > 0)) {
                const paramsTotal = Object.assign({}, this.buildParams(this.currentSubTab.params), newParam);
                this.xn.dragon.download(paramItem.post_url, paramsTotal).subscribe((con: any) => {
                    this.xn.api.save(con._body, '台账列表清单.xlsx');
                    this.xn.loading.close();
                });
            }

            //老业务
            let proxyArr = Array.from(new Set(allProxy));
            for (let proxy of proxyArr) {
                if (oldType === 'all') {
                    oldParam.mainFlowIds = oldMainFlowId.filter(f => f.isProxy === proxy).map(o => o.mainFlowId);
                } else if (oldType === 'selected') {
                    oldParam.mainFlowIds = this.oldSelectItems.filter(f => f.isProxy === proxy).map(o => o.mainFlowId);
                }
                oldParam.type = 'selected';
                oldParam.isProxy = Number(proxy);
                this.xn.api.download('/mdz/down_file/load_list', oldParam).subscribe((v: any) => {
                    this.xn.api.save(v._body, `${IsProxyDef[proxy]}业务清单.xlsx`);
                }, err => {
                }, () => {
                    this.xn.loading.close();
                });
            }

        });
    }
    // 进入审核页面
    handmore(item: any) {
        let isOk = false;
        if (item.nowProcedureId === '@end') {
            if (item.mainFlowId.endsWith('lg') || item.mainFlowId.endsWith('wk')) {
                this.xn.router.navigate([`/dragon/record/todo/view/${item.recordId}`]);
            } else if (item.mainFlowId.endsWith('cg')) {
                this.xn.router.navigate([`/console/record/avenger/todo/view/${item.recordId}`]);
            } else {
                this.xn.router.navigate([`/console/record/todo/view//${item.recordId}`]);
            }
        }
        this.roleId.forEach(x => {
            if (_.startsWith(x, item.nowProcedureId.slice(0, 4))) {
                isOk = true;
            }
        });
        if (!isOk) {
            return;
        } else {
            if (item.nowProcedureId === 'operate' || item.nowProcedureId === 'review') {
                if (item.mainFlowId.endsWith('lg') || item.mainFlowId.endsWith('wk')) {
                    if (item.flowId === 'dragon_platform_verify' && item.zhongdengStatus === 1) {
                        this.xn.msgBox.open(false, '该流程中登登记处于登记中,不可处理');
                        return;
                    } else {
                        this.xn.router.navigate([`/dragon/record/todo/edit/${item.recordId}`]);

                    }
                    this.xn.router.navigate([`/dragon/record/todo/edit/${item.recordId}`])
                } else if (item.mainFlowId.endsWith('cg')) {
                    this.xn.router.navigate([`/console/record/avenger/todo/edit/${item.recordId}`]);
                } else {
                    this.xn.router.navigate([`/console/record/todo/edit/${item.recordId}`]);
                }
            } else {
                if (item.mainFlowId.endsWith('lg') || item.mainFlowId.endsWith('wk')) {
                    this.xn.router.navigate([`/dragon/record/todo/view/${item.recordId}`]);
                } else if (item.mainFlowId.endsWith('cg')) {
                    this.xn.router.navigate([`/console/record/avenger/todo/view/${item.recordId}`]);
                } else {
                    this.xn.router.navigate([`/console/record/todo/view//${item.recordId}`]);
                }

            }
        }

    }

    public viewProgess(id) {
        this.xn.router.navigate([`/machine-account/zhongdeng/record/${id}`]);
    }


}
enum DragonTradeListOrderEnum {
    mainFlowId = 1,
    tradeDate = 2,
    receive = 3,
    changePrice = 4,
    discountRate = 5,
    payConfirmId = 6,
    isChangeAccount = 7,
    priorityLoanDate = 8,
    isRegisterSupplier = 9,
    tradeStatus = 10,
    isLawOfficeCheck = 11,
    supplierRegisterDate = 12,
    factoringEndDate = 13,
    zhongdengStatus = 14,
    realLoanDate = 15,
}
enum machineAccountSort {
    asc = 1,
    desc = -1

}

/** 业务模式 */
export enum IsProxyDef {
    /** 不确定的类型 */
    'undefined' = -1,
    /** 基础模式 */
    '基础模式' = 0,
    /** 回购 */
    '回购' = 1,
    /** 委托 */
    '委托' = 2,
    /** 万科 */
    '万科' = 6,
    /** 定向 */
    '定向' = 13,
    /** 金地 */
    '金地' = 14,
    /** 采购融资 */
    '采购融资' = 50,
    /** 协议 */
    '协议' = 51,
    /** 龙光 */
    '龙光' = 52,
    /** 新万科 2020 */
    '新万科' = 53,
}
