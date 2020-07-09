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
 * 1.0                 wangqing          项目管理         2020-01-17
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
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
import { HwModeService } from '../../../../../services/hw-mode.service';
import { XnUtils } from '../../../../../common/xn-utils';
import { DragonPdfSignModalComponent } from '../../../share/modal/pdf-sign-modal.component';
import { DownloadAttachmentsModalComponent } from '../../../../machine-account/share/modal/download-attachmentsmodal.component';
import { CapitalPoolDownloadAttachmentsModalComponent } from '../../../share/modal/capital-pool-download-attachmentsmodal.component';
import { ExportListModalComponent } from '../../../../machine-account/share/modal/export-list-modal.component';
import { CapitalPoolExportListModalComponent } from '../../../share/modal/capital-pool-export-list-modal.component';
import { VankeDeleteTransactionEditModalComponent } from '../../../share/modal/vanke-delete-transaction-modal.component';
import { DeletematerialEditModalComponent } from '../../../share/modal/delete-material-modal.component';
import { SingleSearchListModalComponent } from '../../../share/modal/single-searchList-modal.component';
import { XnFormUtils } from '../../../../../common/xn-form-utils';
import { CheckersOutputModel } from '../../../../../config/checkers';
import { EditParamInputModel, DragonOcrEditModalComponent } from '../../../share/modal/dragon-ocr-edit-modal.component';
import { generate } from 'rxjs/observable/generate';
import { CapitalPoolGeneratingContractModalComponent } from '../../../share/modal/capital-pool-generating-contract-modal.component';
import { SelectRange } from '../../../pages/capital-pool/emus';
import { DragonFinancingContractModalComponent } from '../../../share/modal/dragon-asign-contract.modal';
import { VankeCapitalPoolGeneratingContractModalComponent } from '../../../share/modal/vanke-capitalPool-generate-contract.component';
import { map, switchMap } from 'rxjs/operators';
import { EditModalComponent } from '../../../share/modal/edit-modal.component';
import { NewFileModalComponent } from '../../../share/modal/new-file-modal.component';
import { Observable } from 'rxjs/Observable';

declare const moment: any;

@Component({
    selector: 'vanke-capital-management',
    templateUrl: `./vanke-capital-pool.component.html`,
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
        overflow-y: scroll;
        overflow-x: auto;
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
export class VankeCapitalpoolComponent implements OnInit, AfterViewInit, OnDestroy {
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
    public mainForm: FormGroup;

    arrObjs = {}; // 缓存后退的变量
    paging = 0; // 共享该变量
    beginTime: any;
    endTime: any;
    timeId = [];
    downLoadList: any[] = [];
    nowTimeCheckId = '';
    // 上次搜索时间段
    preChangeTime: any[] = [];
    public listInfo: any[] = []; // 数据

    sorting = ''; // 共享该变量
    naming = ''; // 共发享该变量
    heads: any[];
    title: string = '';
    params = {
        checker: null,
        title: '交易详情',

    };
    myOptions = {
        'max-width': '860px',
        //'hide-delay': 1,
        placement: 'right',
    };
    headLeft = 0;
    public currentSubTab: SubTabListOutputModel = new SubTabListOutputModel(); // 当前子标签页
    public subDefaultValue = 'DOING'; // 默认子标签页
    public formModule: string = 'dragon-input';
    private defaultHeadquarter = '万科企业股份有限公司';
    counter: number = 0;
    // 根据checker项的checkerId配置
    config = {
        transactionChanges: {
            get_url: '/project_manage/pool/trade_change_list',
            get_type: 'dragon',
            multiple: false,
            label: '交易变动记录',
            heads: [
                { label: '交易ID', value: 'mainFlowId', type: 'mainFlowId' },
                { label: '操作记录', value: 'operateId', type: 'operateId' },
                { label: '操作时间', value: 'time', type: 'date' },
                { label: '操作人', value: 'operateUserName' }
            ],
            searches: [
                { title: '交易ID', checkerId: 'mainFlowId', type: 'text', required: false, sortOrder: 1 },
                { title: '操作记录', checkerId: 'operateId', type: 'select', options: { ref: 'operateType' }, required: false, sortOrder: 2 },
                { title: '操作人', checkerId: 'operateUserName', type: 'text', required: false, sortOrder: 2 }
            ],
            key: 'mainFlowId'
        }
    };
    headquarters: string = ''; // 总部公司
    fitProject: string = ''; // 所选项目
    capitalPoolId: string;
    capitalPoolName: string;
    subResize: any;
    public capitalSelecteds: any[];
    isMachineenter: boolean = false;
    public proxy: any; // 业务模式
    public isShowByOrgType: boolean = true;  // 中介角色隐藏操作按钮

    public queryParams: any; // 路由数据
    public projectId: any; // 路由数据projectId

    constructor(private xn: XnService,
        private vcr: ViewContainerRef, private er: ElementRef,
        public bankManagementService: BankManagementService,
        private router: ActivatedRoute, private cdr: ChangeDetectorRef,
        public hwModeService: HwModeService,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe(x => {
            this.queryParams = { ...x };
            this.title = x.title;
            this.headquarters = x.headquarters;
            this.proxy = tradeType[x.headquarters];
            this.fitProject = x.fitProject;
            this.capitalPoolId = x.capitalPoolId;
            this.capitalPoolName = x.capitalPoolName;
            this.projectId = x.projectId;
            this.isMachineenter = x.isMachineenter === undefined ? false : true

        });
        this.router.data.subscribe(x => {
            this.tabConfig = x;
            // this.deepCopy(this.tabConfig.get, this.currentSubTab);
            this.initData(this.defaultValue, true);
        });
        this.isShowByOrgType = this.xn.user.orgType === 102 ? false : true;
        this.subResize = Observable.fromEvent(window, 'resize').subscribe((event) => {
            this.formResize();
        });
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
        const find = this.tabConfig.tabList.find(tab => tab.value === this.defaultValue);
        this.currentTab = !!find ? find : new TabListOutputModel();
        // 子页面配置
        const subFind = this.currentTab.subTabList.find(sub => sub.value === this.subDefaultValue);
        this.currentSubTab = !!subFind ? subFind : new SubTabListOutputModel();
        if (this.defaultValue === 'B') {
            // console.info('eee==>', this.currentSubTab);
            this.getHeadorSearch(this.currentSubTab);
        } else {
            this.onPage({ page: this.paging });
        }

    }

    /**
      * @param e  page: 新页码、 pageSize: 页面显示行数、first: 新页面之前的总行数、pageCount : 页码总数
      * @summary 采购融资，地产abs  请求api有区别，采购融资：avenger 、地产abs：api
      */
    public onPage(e?: { page: number, first?: number, pageSize?: number, pageCount?: number }, newCurrent?: any) {
        this.paging = e.page || 1;
        this.onUrlData(); // 导航回退取值
        this.formResize();
        this.pageConfig = Object.assign({}, this.pageConfig, e);
        // 页面配置
        if (this.defaultValue === 'B') {
            this.heads = CommUtils.getListFields(newCurrent.headText);
            this.searches = newCurrent.searches; // 当前标签页的搜索项
        } else {
            this.heads = CommUtils.getListFields(this.currentSubTab.headText);
            this.searches = this.currentSubTab.searches; // 当前标签页的搜索项
        }

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
        this.xn.dragon.post(this.currentTab.post_url, params).subscribe(x => {
            if (x.data && x.data.data && x.data.data.length) {
                this.listInfo = x.data.data;
                if (x.data.recordsTotal === undefined) {
                    this.pageConfig.total = x.data.count;
                } else {
                    this.pageConfig.total = x.data.recordsTotal;
                }
            } else if (x.data && x.data.rows && x.data.rows.length) {
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

    onPageChange(e?: { page: number, first?: number, pageSize?: number, pageCount?: number }) {
        this.paging = e.page || 1;
        this.pageConfig = Object.assign({}, this.pageConfig, e);
        if (this.defaultValue === 'B') {
            this.getHeadorSearch(this.currentSubTab);
        } else {
            this.onPage({ page: this.paging });
        }
    }

    /**
     *  搜索,默认加载第一页
     */
    public searchMsg() {
        this.selectedItems = [];
        this.paging = this.paging || 1;
        if (this.defaultValue === 'B') {
            this.getHeadorSearch(this.currentSubTab);
        } else {
            this.onPage({ page: this.paging });
        }
        // this.paging = 1; // 回到第一页
    }

    // 滚动表头
    onScroll($event: Event) {
        this.headLeft = $event.srcElement['scrollLeft'] * -1;
    }

    ngAfterViewInit() {
        this.formResize();
    }
    ngOnDestroy() {
        // 在组件生命周期销毁里取消事件，防止出现页面多次执行之后卡顿
        if (this.subResize) {
            this.subResize.unsubscribe();
        }
    }
    formResize() {
        const scrollContainer = $(`<div class="custom-scrollbar" style="box-sizing: border-box;
            position: absolute;height: 100px;width: 100px;top: -3000px;left: -3000px;
            overflow: scroll;z-index: 1000;overflow-y: scroll;"></div>`).prependTo($("body"));
        const scrollContent = $(`<div class="inner" style="box-sizing: border-box;
            height: 200px;"></div>`).appendTo(scrollContainer);
        //滚动条的宽度
        let scrollBarWidth1 = scrollContainer.outerWidth(true) - scrollContent.outerWidth(true);
        scrollContainer.remove();
        $('.head-height', this.er.nativeElement).attr("style", `width: calc(100% - ${scrollBarWidth1}px`);
    }
    /**
     * 查看回传文件 [批量]
     * @param paramFiles
     */
    public fileView(paramFiles) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, JsonTransForm(paramFiles))
            .subscribe(() => {
            });
    }
    /**
   * 查看合同
   * @param row
   */
    public viewContract(row: any) {
        let params = row;

        if (typeof row === 'string') {
            const obj = JSON.parse(row);
            params = Array.isArray(obj) ? obj[0] : obj;
        }

        params['readonly'] = true;
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            DragonPdfSignModalComponent,
            params
        ).subscribe(() => {
            // do nothing
        });
    }
    getHeadorSearch(Tabconfig: any) {
        let newCurrentsubTab = this.deepCopy(this.currentSubTab);
        this.xn.dragon.post('/project_manage/file_contract/list_search', { project_manage_id: this.projectId }).subscribe(y => {
            if (y.ret === 0) {

                y.data.forEach(z => {
                    newCurrentsubTab.headText.push({
                        label: z.label, value: z.bodyContract, show: true, type: 'contract',
                        bodyContractYyj: z.bodyContractYyj
                    });
                });

                // newCurrentsubTab.headText.forEach(x => {
                //     y.data.forEach(z => {
                //         if (z.bodyContract === x.value) {
                //             x.label = z.label;
                //             x.show = true;
                //         }

                //     });
                // });
                y.data.forEach(z => {
                    newCurrentsubTab.searches.push({
                        title: z.label, checkerId: z.searchContract, type: 'select', required: false, sortOrder: 10, show: true,
                        options: { ref: z.selectFlag },
                    });
                });
                // newCurrentsubTab.searches.push()
                // newCurrentsubTab.searches.forEach(x => {
                //     y.data.forEach(z => {
                //         if (z.searchContract === x.checkerId) {
                //             x.title = z.label;
                //             x.show = true;
                //             x.options.ref = z.selectFlag;
                //         }

                //     });
                // });
                this.onPage({ page: this.paging }, newCurrentsubTab);

            }
        });

    }

    deepCopy(obj, c?: any) {
        c = c || {};
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                c[i] = obj[i].constructor === Array ? [] : {};
                this.deepCopy(obj[i], c[i]);
            } else {
                c[i] = obj[i];
            }
        }
        return c;
    }


    /**
 * 下载附件
 */
    public downloadSelectedAttach() {
        this.capitalSelecteds = this.selectedItems.map(x => x.mainFlowId);

        this.xn.dragon.post('/project_manage/file_contract/down_file_title', { project_manage_id: this.projectId }).subscribe(x => {
            if (x.ret === 0) {
                this.downLoadList = x.data;
                const hasSelect = this.hasSelectRow();
                // 未选择列表中数据时，检查公司名称是否一致
                if (!hasSelect && this.isDifferentCompany()) {
                    this.xn.msgBox.open(false, '筛选条件下，具有不同公司！');

                    return;
                }
                const params = { hasSelect, selectedCompany: this.defaultHeadquarter, fileList: this.downLoadList };
                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    CapitalPoolDownloadAttachmentsModalComponent,
                    params
                ).subscribe(x => {
                    if (x !== '') {
                        this.xn.loading.open();
                        const param = {
                            mainFlowIdList: +x.scope === SelectRange.All
                                ? this.listInfo.map(c => c.mainFlowId)
                                : this.capitalSelecteds,
                            contentType: x.contentType.split(',').filter(c => c !== '').map(c => c),
                        };

                        this.xn.api.dragon.download('/trade/down_file', param).subscribe((v: any) => {
                            this.xn.loading.close();
                            this.xn.api.dragon.save(v._body, '资产池附件.zip');
                        });
                    }
                });
            }
        });

    }
    private isDifferentCompany() {
        const company = XnUtils.distinctArray(this.listInfo.filter(x => x.headquarters).map(c => c.headquarters)) || [];

        return company.length > 1;
    }
    private hasSelectRow() {
        const selectedRows = this.listInfo.filter(x => x.checked && x.checked === true);

        return !!selectedRows && selectedRows.length > 0;
    }

    /**
     * 上传文件
     * @param row
     * @param head
     */
    public uploadContract(mainFlowId, headType, label) {
        const params = {
            title: `上传${label}`,
            checker: [
                {
                    title: `${label}`, checkerId: 'proveImg', type: 'mfile',
                    options: {
                        filename: `${label}`,
                        fileext: 'jpg, jpeg, png, pdf',
                        picSize: '500'
                    }, memo: '请上传图片、PDF'
                },
            ]
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, NewFileModalComponent, params).subscribe(v => {
            this.xn.loading.open();
            if (v === null) {
                this.xn.loading.close();
                return;
            }
            const param = {
                fileList: v.files,
                mainFlowId: mainFlowId,
                yyjTableName: headType
            };
            this.xn.api.dragon.post('/project_manage/file_contract/upload_file', param).subscribe(() => {
                this.xn.loading.close();
                if (this.defaultValue === 'B') {
                    this.getHeadorSearch(this.currentSubTab);
                } else {
                    this.onPage({ page: this.paging });
                }
            });
        });
    }

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



    /**
     *  查看文件信息
     * @param paramFile
     */
    public viewFiles(paramFile) {
        let params = JSON.parse(paramFile);
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonMfilesViewModalComponent, params).subscribe();
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
            if (searches[i]['checkerId'] === 'tradeStatus') {
                searches[i]['options'].ref = this.proxy === 52 ? 'dragonType' : 'newVankeType';
            } else if (searches[i]['checkerId'] === 'type' || searches[i]['checkerId'] === 'contractType') {
                searches[i]['options'].ref = this.proxy === 52 ? 'dragonContracttype' : 'vankeContracttype';
            }
            obj['options'] = searches[i]['options'];
            obj['show'] = searches[i]['show'];
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
            this.selectedItems = this.selectedItems.filter(x => x.mainFlowId !== paramItem.mainFlowId);
        } else {
            paramItem['checked'] = true;
            this.selectedItems.push(paramItem);
            this.selectedItems = XnUtils.distinctArray2(this.selectedItems, 'mainFlowId'); // 去除相同的项
        }

    }
    /**
     * 构建参数
     */
    private buildParams() {
        // 分页处理
        let params: any;
        if (this.defaultValue === 'A' || this.defaultValue === 'C') {
            params = {
                capitalPoolId: this.capitalPoolId,
                type: this.defaultValue === 'A' ? 1 : 3,
                pageNo: this.paging,
                pageSize: this.pageConfig.pageSize
            };
        } else if (this.defaultValue === 'B') {
            params = {
                start: (this.paging - 1) * this.pageConfig.pageSize,
                length: this.pageConfig.pageSize,
                // beginTime: this.beginTime,
                // endTime: this.endTime,
                fitProject: this.fitProject,
                headquarters: this.headquarters,
                capitalPoolId: this.capitalPoolId,
            };
        } else if (this.defaultValue === 'D') {
            params = {};
        }

        // 排序处理
        if (this.sorting && this.naming) {
            if (this.defaultValue === 'A' || this.defaultValue === 'C') {
                let asc = this.naming === 'desc' ? -1 : 1;
                params.order = [{
                    name: TradeListOrderEnum[this.sorting], // 要排序的名称
                    asc: asc, // 是否是升序 -1表示降序 1表示升序
                }];
            } else {
                params.order = [this.sorting + ' ' + this.naming];
            }
        }
        // 搜索处理
        if (this.searches.length > 0) {
            for (const search of this.searches) {
                if (!XnUtils.isEmpty(this.arrObjs[search.checkerId])) {
                    if (search.checkerId === 'transactionStatus') {
                        let obj = JSON.parse(this.arrObjs[search.checkerId]);
                        params['isProxy'] = Number(obj['proxy']);
                        params['status'] = Number(obj['status']);
                    } else if (search.checkerId === 'isHeadPreDate') {
                        const HeadPreDate = JSON.parse(this.arrObjs[search.checkerId]);
                        if (HeadPreDate.isPriorityLoanDate === 0) {
                            params['headDate'] = HeadPreDate.isPriorityLoanDate;
                        } else if (HeadPreDate.isPriorityLoanDate === 1) {
                            params['headDate'] = HeadPreDate.isPriorityLoanDate;
                            params['beginTime'] = HeadPreDate.priorityLoanDateStart;
                            params['endTime'] = HeadPreDate.priorityLoanDateEnd;
                        }
                    } else if (search.checkerId === 'beforeDate') {
                        let obj = JSON.parse(this.arrObjs[search.checkerId]);
                        params['beforeDate'] = Number(obj['beginTime']);
                        params['afterDate'] = Number(obj['endTime']);


                    } else {
                        params[search.checkerId] = this.arrObjs[search.checkerId];
                    }
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
        } else {
            this.xn.user.setUrlData(this.xn.router.url, {
                paging: this.paging,
                pageConfig: this.pageConfig,
                beginTime: this.beginTime,
                endTime: this.endTime,
                arrObjs: this.arrObjs,
                label: this.label
            });
        }
    }

    /**
     * 返回上一页
     * @param
     */
    navBack() {
        if (this.isMachineenter === true) {
            this.xn.user.navigateBack();
        } else {
            this.xn.router.navigate(['/dragon/vanke/projectPlan-management'], {
                queryParams: {
                    title: this.title.split('>')[1] + '>' + this.title.split('>')[2],
                    projectId: this.projectId,
                    headquarters: this.headquarters,
                    paging: this.queryParams.backPageNumber,
                    defaultValue: this.queryParams.backDefaultValue
                }
            });
        }

    }

    /**
     * 行按钮组事件
     * @param paramItem 当前行数据
     * @param paramBtnOperate 按钮操作配置
     * @param i 下标
     */
    public handleHeadClick(paramBtnOperate: ButtonConfigModel) {
        // let mainFlowIds = this.selectedItems.map(x => x.mainFlowId);
        //交易文件页面
        if (paramBtnOperate.operate === 'generate_Contract') {
            this.generate();

        } else if (paramBtnOperate.operate === 'add_transaction') {
            this.addTransaction();
        } else if (paramBtnOperate.operate === 'push_business') {
            //todo
        } else if (paramBtnOperate.operate === 'return_file') {
            this.turnaroundFile();


        } else if (paramBtnOperate.operate === 'contract_sign') {
            this.signContacts();
        }

        if (paramBtnOperate.operate === 'transaction_changes') {
            // 打开弹框
            const params = {
                ...this.config.transactionChanges,
                data: this.selectedItems || [],
                total: this.selectedItems.length || 0,
                inputParam: {
                    capitalPoolId: this.capitalPoolId
                }
            };
            XnModalUtils.openInViewContainer(this.xn, this.vcr, SingleSearchListModalComponent, params).subscribe(v => {
                if (v === null) {
                    return;
                }
            });
        } else if (paramBtnOperate.operate === 'batch_information') {
            // 打开页面
            if (this.selectedItems.length === 0) {
                this.xn.msgBox.open(false, '请选择交易');
                return;
            }
            this.batchModify();
        } else if (paramBtnOperate.operate === 'remove_transaction') {
            // 打开弹框
            if (this.selectedItems.length === 0) {
                this.xn.msgBox.open(false, '请选择交易');
                return;
            }
            const params = {
                selectedItems: this.selectedItems,
                capitalPoolName: this.capitalPoolName,
                capitalPoolId: this.capitalPoolId,
                type: 2,
                post_url: '/pool/remove'
            };
            XnModalUtils.openInViewContainer(this.xn, this.vcr, VankeDeleteTransactionEditModalComponent, params).subscribe((x) => {
                this.selectedItems = [];
                setTimeout(() => {
                    this.onPage({ page: 1, first: 0 });
                }, 1000);
            });
        } else if (paramBtnOperate.operate === 'download_file') {
            // 下载附件
            this.downloadSelectedAttach();
        } else if (paramBtnOperate.operate === 'export_file') {
            // 导出清单
            // this.downloadApprovallist(paramBtnOperate);
            this.exportCapital();
        }
        // paramBtnOperate.click(this.xn, mainFlowIds);
    }


    /**
     * 生成并签署合同
     */
    signContacts() {
        this.xn.dragon.post('/contract/second_contract_info/create_sign_second_contract', { projectName: this.fitProject }).subscribe(x => {
            if (x.ret === 0) {
                let fileList = x.data;
                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    VankeCapitalPoolGeneratingContractModalComponent,
                    { fileList: fileList }
                ).subscribe(x => {
                    if (x !== '') {
                        console.log('x :', x);
                        this.xn.loading.open();
                        // 准备参数
                        const params = {
                            capitalPoolId: this.capitalPoolId,
                            mainIds: this.selectedItems.map(r => r.mainFlowId),
                            secondTemplate: x[0]

                        };
                        this.doGenerateOrSign(params, 2);
                    }
                });
            }
        });
    }
    /**
    * 生成合同
    */
    public generate() {
        this.xn.dragon.post('/contract/second_contract_info/create_second_contract', { projectName: this.fitProject }).subscribe(x => {
            if (x.ret === 0) {
                let fileList = x.data;
                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    VankeCapitalPoolGeneratingContractModalComponent,
                    { fileList: fileList }
                ).subscribe(z => {
                    if (z !== '') {
                        console.log('x :', z);
                        //  this.xn.loading.open();
                        // 准备参数
                        const params = {
                            capitalPoolId: this.capitalPoolId,
                            mainIds: this.selectedItems.map(r => r.mainFlowId),
                            secondTemplate: z[0]

                        };
                        this.doGenerateOrSign(params, 1);
                    }
                });
            }
        });
    }
    /**
     * 回传文件
     */
    public turnaroundFile() {
        const params: EditParamInputModel = {
            title: '回传文件',
            checker: <CheckersOutputModel[]>[{
                title: '文件',
                checkerId: 'returnFile',
                type: 'mfile-return',
                required: 1,
                options: { fileext: 'jpg,jpeg,png,pdf,zip' },
                value: '',
            }],
            options: { capitalPoolId: this.capitalPoolId },
            buttons: ['取消', '上传']
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, DragonOcrEditModalComponent, params).subscribe(v => {
            this.getHeadorSearch(this.currentSubTab);
        });
    }

    /**
      * 合同弹窗--可签署或不签署
      * @param url
      * @param params
      */
    private doGenerateOrSign(params, type) {
        this.xn.api.dragon.post('/contract/second_contract_info/generate_second_contract', params)
            .subscribe(con => {
                // this.xn.loading.close();
                const contracts = con.data.contractList;

                const result = JSON.parse(JSON.stringify(contracts));
                result.forEach(element => {
                    if (!element['config']) {
                        element['config'] = {
                            text: ''
                        };
                    }
                });
                result.forEach(x => {
                    console.info(x.label);
                    if (x.label === '国内无追索权商业保理合同（ABS版本）') {
                        x['config']['text'] = '甲方（债权人、出让人）数字签名';
                    } else if (x.label === '应收账款转让协议书' || x.label === '应收账款转让登记协议') {
                        x['config']['text'] = '甲方（出让方）';
                    } else if (x.label === '应收账款债权转让通知书（适用于保理商通知）-国寿') {
                        x['config']['text'] = '有限公司（公章）';
                    } else {
                        x['config']['text'] = '（盖章）';
                    }
                    if (type === 1) {
                        x['readonly'] = true;
                        x['isNoSignTitle'] = true;
                    }

                });
                XnModalUtils.openInViewContainer(
                    this.xn,
                    this.vcr,
                    DragonFinancingContractModalComponent,
                    result
                ).subscribe(x => {
                    this.xn.loading.close();
                    if (x === 'ok') {
                        const p = con.data;
                        this.xn.dragon.post('/contract/second_contract_info/update_second_contract', p).subscribe(() => {
                            if (this.defaultValue === 'B') {
                                this.getHeadorSearch(this.currentSubTab);
                            } else {
                                this.onPage({ page: this.paging });
                            }
                        });
                    }
                });
            });

    }


    // 查看交易详情
    viewProgress(mainFlowId) {
        this.xn.router.navigate([`dragon/main-list/detail/${mainFlowId}`]);

    }
    // 查看业务详情
    viewDetail(mainFlowId) {
        this.counter++;
        if (this.counter > 1) {
            return;
        }
        this.xn.dragon.post('/project_manage/file_contract/business_detail', { mainFlowId: mainFlowId }).subscribe(x => {
            if (x.ret === 0) {
                const checkers = [{
                    title: '交易ID',
                    checkerId: 'mainFlowId',
                    type: 'text',
                    required: 1,
                    value: x.data[0].mainFlowId,
                    options: { readonly: true },
                }, {
                    title: '融资人区域',
                    checkerId: 'debtUnitProvince',
                    type: 'text',
                    required: 0,
                    value: x.data[0].debtUnitProvince,
                    options: { readonly: true },

                },
                {
                    title: '债务人区域',
                    checkerId: 'projectProvince',
                    type: 'text',
                    required: false,
                    value: x.data[0].projectProvince,
                    options: { readonly: true },

                },
                {
                    title: '付款确认书编号',
                    checkerId: 'payConfirmId',
                    type: 'text',
                    required: false,
                    value: x.data[0].payConfirmId,
                    options: { readonly: true },

                },
                {
                    title: '资产转让折扣率',
                    checkerId: 'discountRate',
                    type: 'text',
                    required: 0,
                    value: x.data[0].discountRate,
                    options: { readonly: true },

                },
                {
                    title: '渠道',
                    checkerId: 'type',
                    type: 'text',
                    required: false,
                    value: x.data[0].type === 1 ? 'ABS业务' : x.data[0].type === 2 ? '再保理' : '非标',
                    options: { readonly: true },

                },
                {
                    title: '冻结',
                    checkerId: 'freezeOne',
                    type: 'text',
                    required: false,
                    options: { readonly: true },
                    value: x.data[0].freezeOne === 0 ? '未冻结' : '已冻结'
                },
                {
                    title: '预计放款日',
                    checkerId: 'priorityLoanDate',
                    type: 'text',
                    required: false,
                    options: { readonly: true },
                    value: x.data[0].priorityLoanDate ? moment(x.data[0].priorityLoanDate).format('YYYY-MM-DD') : ''
                },
                {
                    title: '实际放款日',
                    checkerId: 'realLoanDate',
                    type: 'text',
                    required: false,
                    options: { readonly: true },
                    value: x.data[0].realLoanDate ? moment(x.data[0].realLoanDate).format('YYYY-MM-DD') : ''
                },
                {
                    title: '保理融资到期日',
                    checkerId: 'factoringEndDate',
                    type: 'text',
                    required: false,
                    options: { readonly: true },
                    value: x.data[0].factoringEndDate ? moment(x.data[0].factoringEndDate).format('YYYY-MM-DD') : ''
                },
                {
                    title: '总部提单日期',
                    checkerId: 'headPreDate',
                    type: 'text',
                    required: false,
                    options: { readonly: true },
                    value: x.data[0].headPreDate ? moment(x.data[0].headPreDate).format('YYYY-MM-DD') : ''
                },
                ];
                this.params.checker = checkers;
                this.params.title = '交易详情';
                this.cdr.markForCheck();
                XnFormUtils.buildSelectOptions(this.params.checker);
                this.buildChecker(this.params.checker);
                this.mainForm = XnFormUtils.buildFormGroup(this.params.checker);
                this.counter = 0;
                return this.params;
                // return XnModalUtils.openInViewContainer(this.xn, this.vcr, EditModalComponent, params).subscribe((v) => {
                //     this.counter = 0;
                // });

            }
        });




    }



    /**
     * 操作前检查
     */
    private doBefore() {
        if (!this.listInfo || this.listInfo.length === 0) {
            this.xn.msgBox.open(false, '资产池内没有数据，不能执行此操作！');
            return;
        }
        // 选择的行
        const selectedRows = this.listInfo.filter(
            x => x.checked && x.checked === true
        );
        // 选择的公司名称
        const selectedCompany = XnUtils.distinctArray(
            selectedRows.filter(c => c.headquarters).map(c => c.headquarters)) || [this.defaultHeadquarter];

        if (!selectedRows || selectedRows.length === 0) {
            this.xn.msgBox.open(false, '没有选择数据，不能执行此操作！');
            return;
        }
        if (selectedCompany.length > 1) {
            this.xn.msgBox.open(false, '必须选择相同公司时，才能执行此操作！');
            return;
        }
        return {
            selectedCompany,
            selectedRows
        };
    }

    /**
     * 导出清单
     *  hasSelect 导出选中项
     *  导出全部交易
     */
    public exportCapital() {


        const params = this.selectRowAndDifferentCompany();

        XnModalUtils.openInViewContainer(this.xn, this.vcr, CapitalPoolExportListModalComponent, params).subscribe(x => {
            if (x === '') {
                return;
            }
            this.xn.loading.open();
            const param = {
                mainFlowIdList: +x.scope === SelectRange.All
                    ? undefined
                    : this.selectedItems.map(x => x.mainFlowId),
                capitalPoolId: this.capitalPoolId,
                scope: x.scope,
            };
            this.xn.api.dragon.download('/project_manage/file_contract/down_excel', param).subscribe((v: any) => {
                this.xn.api.dragon.save(v._body, '资产池清单.xlsx');
            }, () => {
            }, () => {
                this.xn.loading.close();
            });
        });
    }

    /**
     * 行按钮组事件
     * @param paramItem 当前行数据
     * @param paramBtnOperate 按钮操作配置
     * @param i 下标
     */
    public handleRowClick(paramItem, paramBtnOperate: ButtonConfigModel) {
        paramBtnOperate.click(paramItem, this.xn, this.hwModeService);
    }



    /**
     * 批量补充
     */

    public batchModify() {
        if (this.selectedItems.length < 1) {
            this.xn.msgBox.open(false, '请选择交易');
            return false;
        }
        const param = { mainList: this.selectedItems };
        this.selectedItems.map((sel) => sel['headquarters'] = this.headquarters === '万科企业股份有限公司' ? '万科' : this.headquarters);
        this.localStorageService.setCacheValue('batchModifyMainList', param);
        const formCapitalPool = { isVanke: true, ...this.queryParams }; // 资产管理标识
        this.xn.router.navigate(['/dragon/capital-pool/batch-modify'], {
            queryParams: formCapitalPool
        });
    }




    private selectRowAndDifferentCompany() {
        const selectedRows = this.listInfo.filter(
            x => x.checked && x.checked === true
        );
        const params = { hasSelect: !!selectedRows && selectedRows.length > 0, selectedCompany: '' };
        //未选择列表中数据时，检查公司名称是否一致
        if (!params.hasSelect) {
            params.selectedCompany = XnUtils.distinctArray(this.listInfo.map(c => c.headquarters));
            if (params.selectedCompany.length > 1) {
                this.xn.msgBox.open(false, '筛选条件下，具有不同公司！');
                return;
            } else {
                params.selectedCompany = params.selectedCompany.toString();
            }
        } else {
            params.selectedCompany = XnUtils.distinctArray(selectedRows.map(c => c.headquarters)).toString();
        }
        return params;
    }

    /**
     * 添加交易
     */

    addTransaction() {
        this.xn.router.navigate([`/dragon/vanke/enter-pool`], {
            queryParams: {
                projectName: this.fitProject,
                capitalPoolId: this.capitalPoolId,
                capitalPoolName: this.capitalPoolName,
                headquarters: this.headquarters,
            }
        });

    }


}
export enum tradeType {
    "万科企业股份有限公司" = 53,
    "深圳市龙光控股有限公司" = 52,
}
/**
 * 排序列表
 * 具体调试参考表
 */
enum TradeListOrderEnum {
    mainFlowId = 1,
    projectCompany = 2,
    debtUnit = 3,
    projectSite = 4,
    debtSite = 5,
    payConfirmId = 16,
    receive = 6,
    discountRate = 7,
    tradeStatus = 8,
    tradeType = 9,
    // freeze = 11,
    isInvoiceFlag = 10,
    priorityLoanDate = 14,
    realLoanDate = 15,
    factoringEndDate = 11,
    // surveyStatus = 16,
}