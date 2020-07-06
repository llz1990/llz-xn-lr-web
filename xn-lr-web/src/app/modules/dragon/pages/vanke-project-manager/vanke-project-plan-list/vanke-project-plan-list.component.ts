/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：comfirm-information-index-component
 * @summary：多标签页列表项 根据tab-pane.ts中的配置
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          项目计划管理         2020-01-17
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubTabListOutputModel, TabListOutputModel, ButtonConfigModel } from '../../../../../config/list-config-model';
import { XnService } from '../../../../../services/xn.service';
import { BankManagementService } from '../../../../../pages/console/bank-management/bank-mangement.service';
import { LocalStorageService } from '../../../../../services/local-storage.service';
import { JsonTransForm } from '../../../../../public/pipe/xn-json.pipe';
import { DragonMfilesViewModalComponent } from '../../../share/modal/mfiles-view-modal.component';
import { XnModalUtils } from '../../../../../common/xn-modal-utils';
import CommUtils from '../../../../../public/component/comm-utils';
import { XnUtils } from '../../../../../common/xn-utils';
import { DragonPdfSignModalComponent } from '../../../share/modal/pdf-sign-modal.component';
import { XnFormUtils } from '../../../../../common/xn-form-utils';
import { CapitalPoolsetProjectPlanModalComponent } from '../../../share/modal/capital-set-project.modal';
import { CapitalAddInfoComponent } from '../../../share/modal/capital-add-info.modal.component';
import { CapitalSetexecutionInfoComponent } from '../../../share/modal/capital-set-execution-info-modal.component';
import { EditModalComponent } from '../../../share/modal/edit-modal.component';
import { log } from 'util';
import { CapitalPoolNameModalComponent } from '../../../share/modal/capital-pool-name-modal.component';
import { BankCardAddModalComponent } from '../../../../../public/modal/bank-card-add-modal.component';
import { CapitalPoolAlertRatioModalComponent } from '../../../../../public/modal/capital-pool-alert-ratio-modal.component';
import { CapitalPoolModel } from '../../capital-pool/capital-pool.component';
import { CapitalPoolIntermediaryAgencyModalComponent } from '../../../share/modal/capital-pool-intermediary-agency-modal.component';
import { CapitalPoolBankCardAddModalComponent } from '../../../share/modal/capital-pool-bank-card-add-modal.component';

declare const moment: any;

@Component({
    selector: 'vanke-project-plan-list',
    templateUrl: `./vanke-project-plan-list.component.html`,
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
    .input-check {
        width: 100px;
    }
    .table-head .sorting, .table-head .sorting_asc, .table-head .sorting_desc {
        /*position: relative;*/
        cursor: pointer
    }
    .table-head .sorting:after, .table-head .sorting_asc:after, .table-head .sorting_desc:after {
        font-family: 'Glyphicons Halflings';
        opacity: 0.5;
    }
    .table-head .sorting:after {
        content: "\\e150";
        opacity: 0.2
    }
    .table-head .sorting_asc:after {
        content: "\\e155"
    }
    .table-head .sorting_desc:after {
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
    `]
})
export class VankeProjectmanagePlanComponent implements OnInit {
    tabConfig: any;
    // 默认激活第一个标签页 {do_not,do_down}
    label = 'do_not';
    public defaultValue = 'A';  // 默认激活第一个标签页

    // 数据
    data: any[] = [];
    // 页码配置
    pageConfig = {
        pageSize: 10,
        first: 0,
        total: 0,
    };
    // 搜索项
    shows: any[] = [];
    form: FormGroup;
    searches: any[] = []; // 面板搜索配置项项
    selectedItems: any[] = []; // 选中的项
    currentTab: any; // 当前标签页
    displayShow: boolean = true;

    arrObjs = {}; // 缓存后退的变量
    paging = 0; // 共享该变量
    beginTime: any;
    endTime: any;
    timeId = [];
    nowTimeCheckId = '';
    // 上次搜索时间段
    preChangeTime: any[] = [];
    public listInfo: any[] = []; // 数据
    public projectName: string = '';
    sorting = ''; // 共享该变量
    naming = ''; // 共享该变量
    heads: any[];
    title: string = '';
    headquarters: string = '';
    projectNum: string = '';
    public currentSubTab: SubTabListOutputModel = new SubTabListOutputModel(); // 当前子标签页
    public subDefaultValue = 'DOING'; // 默认子标签页
    public formModule: string = 'dragon-input';
    public storageRack: string;
    public projectId: string;
    public isShowByOrgType: boolean = true;  //中介角色隐藏操作按钮

    public backPageNumber: number;  //router query
    public backDefaultValue: string;  //router query
    public backTitle: string;  //router query
    public lockStatus = LockStatus;
    public showButtonBool: boolean = this.xn.user.orgType === 3;
    public isAgencyUser = false;

    constructor(private xn: XnService,
        private vcr: ViewContainerRef,
        public bankManagementService: BankManagementService,
        private router: ActivatedRoute,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe(x => {
            this.title = '资产管理>' + x.title + '>' + x.projectName + '-' + x.headquarters;
            this.projectId = x.projectId;
            this.headquarters = x.headquarters;
            this.projectName = x.projectName;
            this.storageRack = x.storageRack;
            this.projectNum = x.projectNum;

            this.backTitle = x.title;
            this.backPageNumber = x.paging;
            this.backDefaultValue = x.defaultValue;
            console.info('this.projectId==>', this.projectId);
        });
        this.router.data.subscribe(x => {
            this.tabConfig = x;
            this.initData(this.defaultValue, true);
        });
        this.isShowByOrgType = this.xn.user.orgType === 102 ? false : true;
    }

    /**
     *  判断数据类型
     * @param value
     */
    public judgeDataType(value: any): boolean {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === '[object Array]';
        }
    }

    /**
         *  格式化数据
         * @param data
         */
    public jsonTransForm(data) {
        return JsonTransForm(data);
    }
    show() {
        this.displayShow = !this.displayShow;
    }
    // 无储架选择项目
    choseProject() {
        const checkers = [
            {
                checkerId: 'isProxy',
                name: 'isProxy',
                required: 1,
                type: 'select',
                options: { ref: 'newproxyType' },
                title: '交易模式',
                memo: ''
            },
            {
                checkerId: 'headquarters',
                name: 'headquarters',
                required: 1,
                type: 'headquarters-select',
                title: '总部公司',
                memo: '',
                show: true,
            },
            {
                title: '储架',
                checkerId: 'storageRack',
                name: 'storageRack',
                required: 1,
                type: 'storage-rack-select',
                show: true,
                // options: { ref: 'proxyType' },
            },

        ];
        const params = {
            checker: checkers,
            title: '选择储架',
            buttons: ['取消', '确定'],
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {
                console.info('vvv=>', v);
                if (v === null) {
                    return;
                } else {
                    let capitalList = this.selectedItems.map(x => x.capitalPoolId);
                    this.xn.dragon.post('/project_manage/old_pool/set_storage_rack',
                        { capitalPoolId: capitalList, project_manage_id: v.storageRack[0].project_manage_id }).subscribe(x => {
                            if (x.ret === 0) {
                                this.onPage({ page: this.paging });
                            }
                        });
                }
            });



    }
    getPlan(paramInfo) {

        if (paramInfo.poolFlag === 1) {
            if (this.headquarters.indexOf('龙光') !== -1) {
                this.xn.router.navigate(['/dragon/capital-pool/trading-list'], {
                    queryParams: {
                        capitalId: paramInfo.capitalPoolId,
                        capitalPoolName: paramInfo.capitalPoolName,
                        isProxy: 52,
                        type: 1,
                        currentPage: 1,
                        isLocking: 0,
                        storageRack: 'lg-2',
                        fromProject: true,
                    }
                });
            } else {
                this.xn.router.navigate(['/dragon/vanke/capital-pool'], {
                    queryParams: {
                        title: this.title,
                        projectId: this.projectId,
                        headquarters: this.headquarters,
                        fitProject: paramInfo.projectName,
                        capitalPoolId: paramInfo.capitalPoolId,
                        capitalPoolName: paramInfo.capitalPoolName,
                    }
                });
            }
        } else {
            this.xn.dragon.post('/project_manage/old_pool/pool_info', { capitalPoolId: paramInfo.capitalPoolId }).subscribe(x => {
                if (x.ret === 0) {
                    this.xn.router.navigate(['/console/capital-pool/trading-list'], {
                        queryParams: {
                            capitalId: x.data.capitalPoolId,
                            capitalPoolName: x.data.capitalPoolName || '',
                            headquarters: this.headquarters === '万科企业股份有限公司' ? '万科' : this.headquarters,
                            isProxy: x.data.isProxy,
                            type: 1,
                            currentPage: this.paging,
                            isLocking: x.data.isLocking,
                            isProjectentter: true,
                        }
                    });
                } else {
                    this.xn.msgBox.open(false, x.errmsg);
                }
            });
        }
    }

    /**
     *  查看文件信息
     * @param paramFile
     */
    public viewFiles(paramFile) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, [paramFile]).subscribe();
    }
    /**
      *  标签页，加载列表信息
      * @param paramTabValue
      * @param init 是否为初始加载，true 不检查切换属性值与当前标签值
      */
    public initData(paramTabValue: string, init?: boolean) {

        if (this.defaultValue === paramTabValue && !init) {
            return;
        } else { // 重置全局变量
            this.selectedItems = [];
            this.listInfo = [];
            this.naming = '';
            this.sorting = '';
            this.paging = 1;
            this.pageConfig = { pageSize: 10, first: 0, total: 0 };
        }
        this.defaultValue = paramTabValue;
        this.subDefaultValue = 'DOING'; // 重置子标签默认
        this.onPage({ page: this.paging });
    }
    /**
     * 绑定银行卡和管理员信息
     * @param item
     */
    public dragonbankCardAdd(item: any) {
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolBankCardAddModalComponent,
            item
        ).subscribe(v => {
            //
            console.log(v);
            if (v === 'ok') {
                this.onPage({ page: this.paging });
            }
        });
    }


    /**
      * @param e  page: 新页码、 pageSize: 页面显示行数、first: 新页面之前的总行数、pageCount : 页码总数
      * @summary 采购融资，地产abs  请求api有区别，采购融资：avenger 、地产abs：api
      */
    public onPage(e?: { page: number, first?: number, pageSize?: number, pageCount?: number }) {
        this.paging = e.page || 1;
        this.onUrlData(); // 导航回退取值
        this.pageConfig = Object.assign({}, this.pageConfig, e);
        // 页面配置
        const find = this.tabConfig.tabList.find(tab => tab.value === this.defaultValue);
        this.currentTab = !!find ? find : new TabListOutputModel();
        // 子页面配置
        const subFind = this.currentTab.subTabList.find(sub => sub.value === this.subDefaultValue);
        this.currentSubTab = !!subFind ? subFind : new SubTabListOutputModel();
        this.heads = CommUtils.getListFields(this.currentSubTab.headText);
        this.searches = this.currentSubTab.searches; // 当前标签页的搜索项
        this.buildShow(this.searches);
        // 构建参数
        const params = this.buildParams();
        if (this.currentTab.post_url === '') {
            // 固定值
            this.listInfo = [];
            this.pageConfig.total = 0;
            return;
        }
        this.xn.loading.open();
        // 采购融资 ：avenger,  地产abs ：api
        this.xn.dragon.post(this.currentTab.post_url, params).subscribe(x => {
            if (x.data && x.data.rows && x.data.rows.length) {
                this.listInfo = x.data.rows;

                this.pageConfig.total = x.data.count;


            } else {
                // 固定值
                this.listInfo = [];
                this.pageConfig.total = 0;
            }
        }, () => {
            // 固定值
            this.listInfo = [];
            this.pageConfig.total = 0;
        }, () => {
            this.xn.loading.close();
        });
    }

    // 判断数组
    arrayLength(value: any) {
        if (!value) {
            return false;
        }
        const obj =
            typeof value === 'string'
                ? JSON.parse(value)
                : JSON.parse(JSON.stringify(value));
        return !!obj && obj.length > 2;
    }


    /**
     *  老业务添加新的资金项
     */
    public capitalItemForm(params?: { id: string; name: string }) {

        const capitalPoolId = params ? params.id : null;
        const checkers = () => {
            const capitalPoolName = {
                checkerId: 'capitalPoolName',
                name: 'capitalPoolName',
                required: 1,
                type: 'text',
                title: '资产池名称 ',
                memo: '',
                value: params ? params.name : null
            };
            const headquarters = {
                checkerId: 'headquarters',
                name: 'headquarters',
                required: 1,
                type: 'headquarters-select',
                // selectOptions: [...this.headquartersOptions],
                title: '总部公司',
                memo: '',
                show: true,
            };
            const storageRack = {
                checkerId: 'storageRack',
                name: 'storageRack',
                required: 1,
                type: 'text',
                title: '储架',
                value: this.projectName,
                options: { readonly: true },
            };
            const isProxy = {
                checkerId: 'isProxy',
                name: 'isProxy',
                required: 1,
                type: 'select',
                options: { ref: 'newproxyType' },
                title: '交易模式',
                memo: ''
            };

            return params
                ? [capitalPoolName]
                : [capitalPoolName, isProxy, headquarters, storageRack];
        };
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolNameModalComponent,
            { id: capitalPoolId, checkers: checkers() }
        ).subscribe(data => {
            console.info('data===>', data);
            if (!!data) {
                if (this.headquarters.includes(data.headquarters)) {
                    if (data && data.capitalPoolName) {
                        console.info('data==>', data.storageRack);
                        const action = params ? 'rename' : 'add';
                        if (action === 'rename') {
                            this.xn.api
                                .post(
                                    `/ljx/capital_pool/${action}`,
                                    Object.assign({ capitalPoolId }, data)
                                )
                                .subscribe(() => {
                                    this.onPage({ page: this.paging });
                                });
                        } else {
                            this.xn.api
                                .post(
                                    `/ljx/capital_pool/${action}`,
                                    Object.assign(
                                        {
                                            capitalPoolId, project_manage_id: this.projectId,
                                            storageRack: this.storageRack
                                        },
                                        { headquarters: data.headquarters, isProxy: data.isProxy, capitalPoolName: data.capitalPoolName })
                                )
                                .subscribe(() => {
                                    this.onPage({ page: this.paging });
                                });
                        }

                    }
                } else {
                    this.xn.msgBox.open(false, '总部公司不一致，不可添加');
                    return;
                }
            } else {
                return;
            }


        });
    }
    // 产品配置
    productConfig(capitalId: any) {
        const checkers = [{
            title: '封包日期',
            checkerId: 'packageTime',
            type: 'date',
            required: 0,
            value: capitalId.packageTime === 0 ? '' : moment(capitalId.packageTime).format('YYYY-MM-DD'),
        },
        {
            title: '产品设立日期',
            checkerId: 'productCreateTime',
            type: 'date',
            required: 0,
            value: capitalId.productCreateTime === 0 ? '' : moment(capitalId.productCreateTime).format('YYYY-MM-DD'),
        },
        {
            title: '层级信息',
            checkerId: 'investTierList',
            type: 'add-ceil',
            required: 0,
            value: '',
            value1: capitalId.capitalPoolId
        }
        ];
        const params = {
            checker: checkers,
            title: '产品配置',
            buttons: ['取消', '确定'],
        };


        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params)
            .subscribe((v) => {
                if (v === null) {
                    return;
                } else {
                    v.packageTime = moment(v.packageTime).valueOf();
                    v.productCreateTime = moment(v.productCreateTime).valueOf();
                    let params = { ...v, capitalPoolId: capitalId.capitalPoolId };
                    this.xn.dragon.post('/project_manage/pool/pool_invest_tier_add', params).subscribe(x => {
                        if (x.ret === 0) {
                            this.xn.msgBox.open(false, '产品配置成功');
                            this.onPage({ page: this.paging });
                        }
                    });

                }
            });
    }
    // 修改修改发行要素
    changeInfo(paramInfo: string) {
        const isVanke = this.title.indexOf('万科') > 0; // 万科
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolsetProjectPlanModalComponent,
            { project: paramInfo, type: 1, isVanke: isVanke }
        ).subscribe(v => {
            //
            console.log(v);
            if (v === 'ok') {
                this.onPage({ page: this.paging });
            }
        });

    }
    // 设置执行信息
    setExecutionInfo(paramInfo: string) {
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalSetexecutionInfoComponent,
            { param: paramInfo, project_manage_id: this.projectId }
        ).subscribe(v => {
            //
            console.log(v);
            if (v === 'ok') {
                this.onPage({ page: this.paging });
            }
        });
    }
    // 删除项目
    deleteInfo(paramInfo) {
        this.xn.dragon.post('/project_manage/pool/pool_delete', { capitalPoolId: paramInfo }).subscribe(x => {
            if (x.ret === 0) {
                this.onPage({ page: this.paging });
            }
        });
    }
    // 补充信息
    addInfo(paramsInfo) {
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalAddInfoComponent,
            { params: paramsInfo, project_manage_id: this.projectId }
        ).subscribe(v => {

        });
    }
    /**
     *  搜索,默认加载第一页
     */
    public searchMsg() {
        this.selectedItems = [];
        this.paging = 1;
        this.onPage({ page: this.paging });
    }
    public handleRowClick(item, btn: ButtonConfigModel, i: number) {
        if (btn.operate === 'add_transaction') {
            if (item.poolFlag === 1) {
                if (this.headquarters.indexOf('万科') > -1) {
                    this.xn.router.navigate([`/dragon/vanke/enter-pool`], {
                        queryParams: {
                            projectName: item.projectName,
                            headquarters: this.headquarters,
                            capitalPoolId: item.capitalPoolId,
                            capitalPoolName: item.capitalPoolName,
                        }
                    });
                } else if (this.headquarters.indexOf('龙光') > -1) {
                    this.xn.router.navigate(['/dragon/capital-pool/unhandled-list'], {
                        queryParams: {
                            capitalId: item.capitalPoolId,
                            capitalPoolName: item.capitalPoolName,
                            currentPage: this.paging,
                            isProjectenter: true
                        }
                    });
                }

            } else if (item.poolFlag === 0) {
                console.log(item);
                this.xn.router.navigate(['/console/capital-pool/main-list'], {
                    queryParams: {
                        capitalId: item.capitalPoolId,
                        capitalPoolName: item.capitalPoolName || '',
                        headquarters: this.headquarters === '万科企业股份有限公司' ? '万科' : this.headquarters,
                        isProxy: item.isProxy,
                        type: 2,
                        currentPage: this.paging,
                        isProjectenter: true
                    }
                });
            }

        }
        if (btn.operate === 'confirm_receivable') { // 基础资产
            this.getPlan(item);
        }
    }
    /**
    * 绑定银行卡和管理员信息
    * @param item
    */
    public bankCardAdd(item: any) {
        this.xn.dragon.post('/project_manage/old_pool/pool_info', { capitalPoolId: item.capitalPoolId }).subscribe(x => {
            if (x.ret === 0) {
                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    BankCardAddModalComponent,
                    x.data
                ).subscribe(v => {
                    //
                    console.log(v);
                    if (v === 'ok') {
                        this.onPage({ page: this.paging });
                    }
                });
            } else {
                this.xn.msgBox.open(false, x.errmsg);
            }
        });

    }

    /**
     * 设置警戒比例
     */
    public alertRatioForm(params?: { id: string; value: any }) {
        this.xn.dragon.post('/project_manage/old_pool/pool_info', { capitalPoolId: params.id }).subscribe(x => {
            const capitalPoolId = params ? params.id : null;
            if (x.ret === 0) {
                const checkers = [
                    {
                        checkerId: 'supplierRatio',
                        name: 'supplierRatio',
                        required: 1,
                        type: 'text',
                        title: '供应商警戒比例 ',
                        memo: '',
                        value: x.data.supplierRatio || null,
                    },
                    {
                        checkerId: 'enterpriseRatio',
                        name: 'enterpriseRatio',
                        required: 1,
                        type: 'text',
                        title: '项目公司警戒比例 ',
                        memo: '',
                        value: x.data.enterpriseRatio || null
                    }
                ];

                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    CapitalPoolAlertRatioModalComponent,
                    { id: capitalPoolId, checkers }
                ).subscribe(data => {
                    if (data && data.enterpriseRatio && data.supplierRatio) {
                        this.xn.api
                            .post(
                                `/ljx/capital_pool/update_alert_ratio`,
                                Object.assign({ capitalPoolId }, data)
                            )
                            .subscribe(() => {
                                this.onPage({ page: this.paging });
                            });
                    }
                });
            } else {

            }
        });

    }

    /**
        *  锁定该列，改变isLocking状态为1
        */
    public handleLock(val: CapitalPoolModel) {
        this.xn.msgBox.open(true, '是否要锁定该项', () => {
            const params = {
                capitalPoolId: val.capitalPoolId
            };
            this.xn.api
                .post('/ljx/capital_pool/locking', params)
                .subscribe(() => {
                    // 完成后重新加载
                    this.onPage({ page: this.paging });
                });
        });
    }

    /**
     * 设置警戒比例
     */
    public dragonalertRatioForm(params?: { id: string; value: any }) {
        const capitalPoolId = params ? params.id : null;
        const checkers = [
            {
                checkerId: 'supplierRatio',
                name: 'supplierRatio',
                required: 1,
                type: 'text',
                title: '供应商警戒比例 ',
                memo: '',
                value: params ? params.value.supplierRatio : null
            },
            {
                checkerId: 'enterpriseRatio',
                name: 'enterpriseRatio',
                required: 1,
                type: 'text',
                title: '项目公司警戒比例 ',
                memo: '',
                value: params ? params.value.enterpriseRatio : null
            }
        ];

        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolAlertRatioModalComponent,
            { id: capitalPoolId, checkers }
        ).subscribe(data => {
            if (data && data.enterpriseRatio && data.supplierRatio) {
                this.xn.api.dragon
                    .post(
                        `/pool/update_alert_ratio`,
                        Object.assign({ capitalPoolId }, data)
                    )
                    .subscribe(() => {
                        this.onPage({ page: this.paging });
                    });
            }
        });
    }

    /**
    * 设置中介机构
    */
    public dragonintermediaryAgencyForm(params?: { value: number }) {
        //const capitalPoolId = params ? params.id : null;
        console.info('params.value', params)
        const checkers = [
            {
                checkerId: 'longAgency',
                name: 'longAgency',
                required: 1,
                type: 'agency-picker',
                title: '中介机构 ',
                memo: '',
                value: params ? params.value : null
            }
        ];

        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolIntermediaryAgencyModalComponent,
            { id: null, checkers }
        ).subscribe(data => {
            // if (data && data.agency) {
            //     this.xn.api.dragon
            //         .post(
            //             `/pool/add_agency`,
            //             { capitalPoolId, agency: JSON.parse(data.agency) }
            //         )
            //         .subscribe(() => {
            //             this.onPage({ page: this.paging });
            //         });
            // }
        });
    }
     /**
     * 设置中介机构
     */
    // public intermediaryAgencyForm(params?: { id: string; value: number }) {
    //     const capitalPoolId = params ? params.id : null;
    //     const checkers = [
    //         {
    //             checkerId: 'agency',
    //             name: 'agency',
    //             required: 1,
    //             type: 'multiple-picker',
    //             title: '中介机构 ',
    //             memo: '',
    //             value: params ? params.value : null
    //         }
    //     ];

    //     XnModalUtils.openInViewContainer(
    //         this.xn,
    //         this.vcr,
    //         CapitalPoolIntermediaryAgencyModalComponent,
    //         { id: capitalPoolId, checkers }
    //     ).subscribe(data => {
    //         console.log('agency', data);
    //         if (data && data.agency) {
    //             this.xn.api
    //                 .post(
    //                     `/llz/capital_list/add_agency`,
    //                     Object.assign({ capitalPoolId }, data)
    //                 )
    //                 .subscribe(() => {
    //                     this.onPage({ page: this.paging });
    //                 });
    //         }
    //     });
    // }

    /**
   *  添加新的资金项
   */
    public dragoncapitalItemForm(params?: { id: string; name: string }) {
        const capitalPoolId = params ? params.id : undefined;
        const checkers = () => {
            const capitalPoolName = {
                checkerId: 'capitalPoolName',
                name: 'capitalPoolName',
                required: 1,
                type: 'text',
                title: '资产池名称 ',
                memo: '',
                value: params ? params.name : null
            };
            const headquarters = {
                checkerId: 'headquarters',
                name: 'headquarters',
                required: 1,
                type: 'headquarters-select',
                // selectOptions: [...this.headquartersOptions],
                title: '总部公司',
                memo: ''
            };
            const storageRack = {
                checkerId: 'storageRack',
                name: 'storageRack',
                required: 1,
                type: 'storage-rack-select',
                title: '储架',
                memo: ''
            };
            const isProxy = {
                checkerId: 'isProxy',
                name: 'isProxy',
                required: 1,
                type: 'select',
                options: { ref: 'dragonListType' },
                title: '交易模式',
                memo: ''
            };

            return params
                ? [capitalPoolName]
                : [capitalPoolName, isProxy, headquarters, storageRack];
        };
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolNameModalComponent,
            { id: capitalPoolId, checkers: checkers() }
        ).subscribe(data => {
            if (data && data.capitalPoolName) {
                const action = params ? 'rename' : 'create';
                this.xn.api.dragon
                    .post(
                        `/pool/${action}`,
                        Object.assign({ capitalPoolId }, data)
                    )
                    .subscribe(() => {
                        this.onPage({ page: this.paging });
                    });
            }
        });
    }

    /**
     *  锁定该列，改变isLocking状态为1
     */
    public dragonhandleLock(val: CapitalPoolModel) {
        const lock = val.isLocking === this.lockStatus.Locked
            ? this.lockStatus.Unlock
            : this.lockStatus.Locked;

        this.xn.msgBox.open(true, `是否要${!!lock ? '锁定' : '解锁'}该项`, () => {
            const params = {
                capitalPoolId: val.capitalPoolId,
                lock,
            };
            this.xn.api.dragon
                .post('/pool/lock', params)
                .subscribe(() => {
                    // 完成后重新加载
                    this.onPage({ page: this.paging });
                });
        });
    }

    /**
     * 设置中介机构
     */
    // public intermediaryAgencyForm(params?: { id: string; value: number }) {
    //     const capitalPoolId = params ? params.id : null;
    //     const checkers = [
    //         {
    //             checkerId: 'agency',
    //             name: 'longAgency',
    //             required: 1,
    //             type: 'agency-picker',
    //             title: '中介机构 ',
    //             memo: '',
    //             value: params ? params.value : null
    //         }
    //     ];

    //     XnModalUtils.openInViewContainer(
    //         this.xn,
    //         this.vcr,
    //         CapitalPoolIntermediaryAgencyModalComponent,
    //         { id: null, checkers }
    //     ).subscribe(data => {
    //         //     console.log('agency', data);
    //         //     if (data && data.agency) {
    //         //         this.xn.api
    //         //             .post(
    //         //                 `/llz/capital_list/add_agency`,
    //         //                 Object.assign({ capitalPoolId }, data)
    //         //             )
    //         //             .subscribe(() => {
    //         //                 this.onPage({ page: this.paging });
    //         //             });
    //         //     }
    //          });
    //     }




    /**
     * 重置
     */
    public reset() {
        this.selectedItems = [];
        // this.form.reset(); // 清空
        for (const key in this.arrObjs) {
            if (this.arrObjs.hasOwnProperty(key)) {
                delete this.arrObjs[key];
            }
        }
        this.buildCondition(this.searches);
        this.searchMsg(); // 清空之后自动调一次search
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
        this.onPage({ page: 1 });
    }

    /**
     *  判读列表项是否全部选中
     */
    public isAllChecked(): boolean {
        return !(this.listInfo.some(x => !x['checked'] || x['checked'] && x['checked'] === false) || this.listInfo.length === 0);
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
     * 单选
     * @param e
     * @param item
     * @param index
     */
    public singelChecked(e, item, index) {
        if (item['checked'] && item['checked'] === true) {
            item['checked'] = false;
            this.selectedItems = this.selectedItems.filter(x => x.mainFlowId !== item.mainFlowId);
        } else {
            item['checked'] = true;
            this.selectedItems.push(item);
            this.selectedItems = XnUtils.distinctArray2(this.selectedItems, 'mainFlowId'); // 去除相同的项
        }

    }

    /**
     *  查看合同，只读
     * @param con
     */
    public showContract(con) {
        const params = Object.assign({}, con, { readonly: true });
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonPdfSignModalComponent, params).subscribe(() => {
        });
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
            obj['number'] = searches[i]['number'];
            obj['options'] = searches[i]['options'];
            if (searches[i]['checkerId'] === this.timeId[0]) {
                obj['value'] = JSON.stringify(tmpTime);
            } else {
                obj['value'] = this.arrObjs[searches[i]['checkerId']];
            }
            objList.push(obj);
        }
        this.shows = $.extend(true, [], objList.sort(function (a, b) {
            return a.number - b.number;
        })); // 深拷贝，并排序;
        XnFormUtils.buildSelectOptions(this.shows);
        this.buildChecker(this.shows);
        this.form = XnFormUtils.buildFormGroup(this.shows);
        const time = this.searches.filter(v => v.type === 'quantum');
        const timeCheckId = time[0] && time[0]['checkerId'];
        this.nowTimeCheckId = timeCheckId;
        this.form.valueChanges.subscribe((v) => {
            // 时间段
            const changeId = v[timeCheckId];
            //delete v[timeCheckId];
            if (changeId !== '' && this.nowTimeCheckId) {
                const paramsTime = JSON.parse(changeId);
                const beginTime = paramsTime['beginTime'];
                const endTime = paramsTime['endTime'];
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
                    const searchFilter = this.searches.filter(v1 => v1 && v1['base'] === 'number').map(c => c['checkerId']);
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
        *  全选
        */
    public checkAll() {
        if (!this.isAllChecked()) {
            this.listInfo.forEach(item => item['checked'] = true);
            this.selectedItems = XnUtils.distinctArray2([...this.selectedItems, ...this.listInfo], 'mainFlowId');
        } else {
            this.listInfo.forEach(item => item['checked'] = false);
            this.selectedItems = [];
        }
    }

    /**
     * 单选
     * @param paramItem
     * @param index
     */
    public singleChecked(paramItem, index) {
        if (paramItem['checked'] && paramItem['checked'] === true) {
            paramItem['checked'] = false;
            this.selectedItems = this.selectedItems.filter(x => x.capitalPoolId !== paramItem.capitalPoolId);
        } else {
            paramItem['checked'] = true;
            this.selectedItems.push(paramItem);
            this.selectedItems = XnUtils.distinctArray2(this.selectedItems, 'capitalPoolId'); // 去除相同的项
        }

    }
    /**
     * 构建参数
     */
    private buildParams() {
        // 分页处理
        const params: any = {
            start: (this.paging - 1) * this.pageConfig.pageSize,
            length: this.pageConfig.pageSize,
            // beginTime: this.beginTime,
            // endTime: this.endTime,
            project_manage_id: Number(this.projectId)
        };
        // 排序处理
        if (this.sorting && this.naming) {
            params.order = [this.sorting + ' ' + this.naming];
        }
        // 搜索处理
        if (this.searches.length > 0) {
            for (const search of this.searches) {
                if (!XnUtils.isEmpty(this.arrObjs[search.checkerId])) {
                    params[search.checkerId] = this.arrObjs[search.checkerId];
                }
            }
        }
        return params;
    }

    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }


    /**
     * 回退操作
     * @param data
     */
    private onUrlData(data?) {
        const urlData = this.xn.user.getUrlData(this.xn.router.url);
        if (urlData && urlData.pop) {
            this.paging = urlData.data.paging || this.paging;
            this.pageConfig = urlData.data.pageConfig || this.pageConfig;
            this.beginTime = urlData.data.beginTime || this.beginTime;
            this.endTime = urlData.data.endTime || this.endTime;
            this.arrObjs = urlData.data.arrObjs || this.arrObjs;
            this.label = urlData.data.label || this.label;
            this.title = urlData.data.title || this.title;
            this.projectId = urlData.data.projectId || this.projectId;
            this.projectName = urlData.data.projectName || this.projectName;
            this.headquarters = urlData.data.headquarters || this.headquarters;
        } else {
            this.xn.user.setUrlData(this.xn.router.url, {
                paging: this.paging,
                pageConfig: this.pageConfig,
                beginTime: this.beginTime,
                endTime: this.endTime,
                arrObjs: this.arrObjs,
                label: this.label,
                title: this.title,
                projectId: this.projectId,
                projectName: this.projectName,
                headquarters: this.headquarters,
            });
        }
    }

    /**
     * 返回
     * @param
     */
    navBack() {
        this.xn.router.navigate(['/dragon/vanke/project-management'], {
            queryParams: {
                first: this.backPageNumber,
                defaultValue: this.backDefaultValue
            }
        });
    }

    /**
     * 行按钮组事件
     * @param paramItem 当前行数据
     * @param paramBtnOperate 按钮操作配置
     * @param i 下标
     */
    public handleHeadClick(paramBtnOperate: ButtonConfigModel) {
        let mainFlowIds = this.selectedItems.map(x => x.mainFlowId);
        if (paramBtnOperate.operate === 'set-plan') {
            this.setPlan();
        } else if (paramBtnOperate.operate === 'set-oldplan') {
            this.capitalItemForm();
        } else if (paramBtnOperate.operate === 'chose-plan') {
            if (this.selectedItems.length === 0) {
                this.xn.msgBox.open(false, '请选择交易');
                return;
            } else {
                this.choseProject();
            }
        }
        //  paramBtnOperate.click(this.xn, mainFlowIds);
    }
    // 设立项目
    setPlan() {
        const isVanke = this.title.indexOf('万科') > 0; // 万科
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            CapitalPoolsetProjectPlanModalComponent,
            { project: this.projectId, type: 2, isVanke: isVanke }
        ).subscribe(v => {
            //
            console.log(v);
            if (v === 'ok') {
                this.onPage({ page: this.paging });
            }
        });
    }
}

/** 锁定状态 */
enum LockStatus {
    /** 未锁定 */
    Unlock = 0,
    /** 锁定 */
    Locked = 1,
}
