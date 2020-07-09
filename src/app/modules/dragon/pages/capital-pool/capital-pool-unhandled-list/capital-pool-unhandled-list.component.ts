import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import CommBase from '../../comm-base';
import { CommonPage, PageTypes } from '../../../../../public/component/comm-page';
import { FormGroup } from '@angular/forms';
import { EnumOperating } from '../../../../../pages/console/capital-pool/capital-pool-index.component';
import { SelectOptions } from '../../../../../config/select-options';
import { XnService } from '../../../../../services/xn.service';
import { ActivatedRoute } from '@angular/router';
import CommUtils from '../../../../../public/component/comm-utils';
import { XnUtils } from '../../../../../common/xn-utils';
import { XnFormUtils } from '../../../../../common/xn-form-utils';

@Component({
    templateUrl: './capital-pool-unhandled-list.component.html',
    styles: [
        `
            .table {
                font-size: 13px;
            }

            .table-head .sorting,
            .table-head .sorting_asc,
            .table-head .sorting_desc {
                position: relative;
                cursor: pointer;
            }

            .table-head .sorting:after,
            .table-head .sorting_asc:after,
            .table-head .sorting_desc:after {
                position: absolute;
                bottom: 8px;
                right: 8px;
                display: block;
                font-family: 'Glyphicons Halflings';
                opacity: 0.5;
            }

            .table-head .sorting:after {
                content: '\\e150';
                opacity: 0.2;
            }

            .table-head .sorting_asc:after {
                content: '\\e155';
            }

            .table-head .sorting_desc:after {
                content: '\\e156';
            }

            .tab-heads {
                margin-bottom: 10px;
                display: flex;
            }

            .tab-buttons {
                flex: 1;
            }

            .tab-search {
                text-align: right;
            }

            .form-control {
                display: inline-block;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                width: 200px;
            }

            .btn {
                vertical-align: top;
            }

            .small-font {
                font-size: 12px;
            }

            .item-box {
                position: relative;
                display: flex;
                margin-bottom: 10px;
            }

            .item-box i {
                position: absolute;
                top: 11px;
                right: 23px;
                opacity: 0.5;
                cursor: pointer;
            }

            .plege {
                color: #3c8dbc;
            }

            .plege.active {
                color: #ff3000;
            }

            tbody tr:hover {
                background-color: #e6f7ff;
                transition: all 0.1s linear;
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
                width: 100%;
            }

            .fr {
                float: right;
            }

            .money-control {
                display: flex;
                line-height: 35px;
            }

            .text-right {
                text-align: right;
            }

            ul li {
                list-style-type: none;
            }

            .item-list {
                position: absolute;
                max-height: 200px;
                width: 375px;
                padding: 0px;
                z-index: 1;
                background: #fff;
                overflow-y: auto;
                border: 1px solid #ddd;
            }

            .item-list li {
                padding: 2px 12px;
            }

            .item-list li:hover {
                background-color: #ccc;
            }

            .btn-label {
                margin-bottom: 10px;
            }

            .btn-more {
                margin-top: 10px;
            }

            .btn-more-a {
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }

            .btn-cus {
                border: 0;
                margin: 0;
                padding: 0;
            }

            .capital-pool-check {
                position: relative;
                top: 2px;
                left: 6px;
            }

            .a-block {
                display: block;
            }
        `
    ]
})
export class CapitalPoolUnhandledListComponent extends CommonPage implements OnInit {
    total = 0;
    pageSize = 10;
    first = 0;
    rows: any[] = [];
    words = '';

    sorting = ''; // 共享该变量
    naming = ''; // 共享该变量
    paging = 0; // 共享该变量
    createBeginTime: any;
    createEndTime: any;
    arr = {}; // 缓存后退的变量

    heads: any[];
    searches: any[];
    shows: any[];
    base: CommBase;
    mainForm: FormGroup;
    timeId = [];
    tolerance = [];
    nowTimeCheckId = '';
    searchArr = [];
    showBtn: false;
    title: string;
    public currentPage: any;
    // 资产池传入数据
    public formCapitalPool: { capitalId: string, capitalPoolName: string, currentPage: string };
    // 资产池选中的项 的 mainflowId 集合
    public capitalSelected: any[];
    // 增加，移除按钮状态
    public btnStatusBool = false;

    // 全选，取消全选
    public allChecked = false;
    formProject: boolean = false;
    refreshDataAfterAttachComponent = () => {
        this.onPage({ page: this.paging, pageSize: this.pageSize });
    };

    constructor(
        public xn: XnService,
        public vcr: ViewContainerRef,
        public route: ActivatedRoute,
    ) {
        super(PageTypes.List);
    }

    ngOnInit() {
        const initPage = ((params: { queryParams: any; data: any }) => {
            const superConfig = params.data;

            this.base = new CommBase(this, superConfig);
            this.heads = CommUtils.getListFields(superConfig.fields);
            this.searches = CommUtils.getSearchFields(superConfig.fields);
            this.title = this.base.superConfig.showName.replace(
                '$',
                params.queryParams.capitalPoolName ||
                this.route.snapshot.queryParams.capitalPoolName ||
                ''
            );
            this.buildShow(this.searches);
            this.pageSize =
                (superConfig.list && superConfig.list.pageSize) ||
                this.pageSize;
            this.onPage({ page: this.paging, pageSize: this.pageSize });
        }).bind(this);

        this.route.queryParams
            .pipe(
                map(x => {
                    this.formCapitalPool = x as any;
                    this.currentPage = this.formCapitalPool.currentPage;
                    this.formProject = x.isProjectenter !== undefined ? true : false;
                    return x;
                }),
                switchMap(
                    () => {
                        return this.route.data;
                    },
                    (outerValue, innerValue) => {
                        return { queryParams: outerValue, data: innerValue };
                    }
                )
            )
            .subscribe(initPage);
    }

    public onPage(event: { page: number; pageSize: number }): void {
        this.paging = event.page;
        this.pageSize = event.pageSize;

        // 后退按钮的处理
        this.onUrlData();

        const params = this.buildParams();
        this.base.onList(params);
    }

    public onSort(sort: string): void {
        // 如果已经点击过了，就切换asc 和 desc
        if (this.sorting === sort) {
            this.naming = this.naming === 'desc' ? 'asc' : 'desc';
        } else {
            this.sorting = sort;
            this.naming = 'asc';
        }

        this.onPage({ page: this.paging, pageSize: this.pageSize });
    }

    public onSortClass(checkerId: string): string {
        if (checkerId === this.sorting) {
            return 'sorting_' + this.naming;
        } else {
            return 'sorting';
        }
    }

    public onTextClass(type) {
        return type === 'money' ? 'text-right' : '';
    }

    public onSearch(): void {
        this.onPage({ page: this.paging, pageSize: this.pageSize });
    }

    public onCssClass(status) {
        return status === 1 ? 'active' : '';
    }

    public clearSearch() {
        for (const key in this.arr) {
            if (this.arr.hasOwnProperty(key)) {
                delete this.arr[key];
            }
        }

        this.buildCondition(this.searches);
        this.onSearch(); // 清空之后自动调一次search
        this.paging = 1; // 回到第一页
    }

    // 资产池选择框改变
    public inputChange(val: any) {
        if (val['checked'] && val['checked'] === true) {
            val['checked'] = false;
        } else {
            val['checked'] = true;
        }
        this.capitalSelected = this.rows
            .filter(item => item.checked && item.checked === true)
            .map(x => x.mainFlowId);
        this.btnStatusBool =
            this.capitalSelected && this.capitalSelected.length > 0;
        // 当数组中不具有clicked 且为false。没有找到则表示全选中。
        this.allChecked = !this.rows.find(
            x => x.checked === undefined || x.checked === false
        );
    }

    // 删除-选中的
    public handleCapital() {
        if (this.rows && this.rows.length) {
            if (this.capitalSelected && this.capitalSelected.length) {
                const params = {
                    mainFlowIdList: this.capitalSelected,
                    capitalPoolId: this.formCapitalPool.capitalId,
                    // capitalPoolName: this.formCapitalPool.capitalPoolName
                };
                // 添加操作
                this.addOrRemoveCapitalPool(
                    '/pool/add',
                    params
                );
            }
        }
    }


    /**
     * 全选，取消全选
     */
    public handleAllSelect() {
        this.allChecked = !this.allChecked;
        if (this.allChecked) {
            this.rows.map(item => (item.checked = true));
        } else {
            this.rows.map(item => (item.checked = false));
        }
        this.capitalSelected = this.rows
            .filter(
                item =>
                    item.checked &&
                    item.checked === true
            )
            .map(x => x.mainFlowId);
        this.btnStatusBool =
            this.capitalSelected && this.capitalSelected.length > 0;
    }

    public goback() {
        // this.xn.user.navigateBack();
        if (this.formProject) {
            window.history.back();
        } else {
            this.xn.router.navigate(['/console/capital-pool/dragon/capital-pool/capital-pool-main-list'], {
                queryParams: { currentPage: this.currentPage }
            });
        }

    }

    /**
     * 查看交易流程
     * @param item
     */
    public viewProcess(item: any) {
        this.xn.router.navigate([`dragon/main-list/detail/${item}`]);
    }


    /**
     *  添加，删除
     * @param url
     * @param params
     */
    private addOrRemoveCapitalPool(
        url: string,
        params: { mainFlowIdList: any[]; capitalPoolId: any }
    ) {
        this.xn.api.dragon.post(url, params).subscribe(() => {
            this.onPage({
                page: this.paging,
                pageSize: this.pageSize
            });
            this.allChecked = false;
        });
    }

    /**
     *  构建列表
     * @param searches
     */
    private buildShow(searches) {
        this.shows = [];
        this.onUrlData();
        this.buildCondition(searches);
    }

    private buildCondition(searches) {
        const tmpTime = {
            createBeginTime: this.createBeginTime,
            createEndTime: this.createEndTime
        };
        const objList = [];
        this.timeId = $.extend(
            true,
            [],
            this.searches
                .filter(v => v.type === 'quantum')
                .map(v => v.checkerId)
        );
        for (let i = 0; i < searches.length; i++) {
            const obj = {};
            obj['title'] = searches[i]['title'];
            obj['checkerId'] = searches[i]['checkerId'];
            obj['required'] = false;
            obj['type'] = searches[i]['type'];
            obj['number'] = searches[i]['number'];
            obj['options'] = { ref: searches[i]['selectOptions'] };
            if (searches[i]['checkerId'] === this.timeId[0]) {
                obj['value'] = JSON.stringify(tmpTime);
            } else {
                obj['value'] = this.arr[searches[i]['checkerId']];
            }
            objList.push(obj);
        }
        this.shows = $.extend(
            true,
            [],
            objList.sort(function (a, b) {
                return a.number - b.number;
            })
        ); // 深拷贝;
        XnFormUtils.buildSelectOptions(this.shows);
        this.buildChecker(this.shows);
        this.mainForm = XnFormUtils.buildFormGroup(this.shows);

        const time = this.searches.filter(v => v.type === 'quantum');
        this.tolerance = $.extend(
            true,
            [],
            this.searches
                .filter(v => v.type === 'tolerance')
                .map(v => v.checkerId)
        );

        const forSearch = this.searches
            .filter(v => v.type !== 'quantum')
            .map(v => v && v.checkerId);
        this.searchArr = $.extend(true, [], forSearch); // 深拷贝;
        const timeCheckId = time[0] && time[0]['checkerId'];
        this.nowTimeCheckId = timeCheckId;

        this.mainForm.valueChanges.subscribe(v => {
            const changeId = v[timeCheckId];
            delete v[timeCheckId];
            if (changeId !== '' && this.nowTimeCheckId) {
                const paramsTime = JSON.parse(changeId);
                const createBeginTime = paramsTime['beginTime'];
                const createEndTime = paramsTime['endTime'];

                if (createBeginTime === this.createBeginTime && createEndTime === this.createEndTime) {
                    // return;
                } else {
                    this.createBeginTime = createBeginTime;
                    this.createEndTime = createEndTime;
                    this.paging = 1;
                    this.rows.splice(0, this.rows.length);
                    const params = this.buildParams();
                    this.base.onList(params);
                }
            }
            const arrObj = {};
            for (const item in v) {
                if (v.hasOwnProperty(item) && v[item] !== '') {
                    const searchFilter = this.searches
                        .filter(vv => vv && vv['base'] === 'number')
                        .map(c => c['checkerId']);
                    if (searchFilter.indexOf(item) >= 0) {
                        arrObj[item] = Number(v[item]);
                    } else {
                        arrObj[item] = v[item];
                    }
                }
            }
            this.arr = $.extend(true, {}, arrObj); // 深拷贝;要进行搜索的变量
            this.onUrlData();
        });
    }

    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }

    /**
     *  构建参数
     */
    private buildParams() {
        // 分页处理
        const params: any = {
            pageNo: this.paging < 0 ? 1 : this.paging,
            pageSize: this.pageSize,
            createBeginTime: this.createBeginTime,
            createEndTime: this.createEndTime,
        };

        // 排序处理
        // if (this.sorting && this.naming) {
        //     params.order = [this.sorting + ' ' + this.naming];
        // }

        // 搜索处理
        this.searches
            .filter(x => !XnUtils.isEmpty(this.arr[x.checkerId]))
            .forEach(search => {
                if (search.checkerId === 'realLoanDate') {
                    const date = JSON.parse(this.arr[search.checkerId]);
                    params['loanBeginTime'] = date.beginTime;
                    params['loanEndTime'] = date.endTime;
                } else if (search.checkerId === 'createTime') {
                    const date = JSON.parse(this.arr[search.checkerId]);
                    params['createBeginTime'] = date.beginTime;
                    params['createEndTime'] = date.endTime;
                } else {
                    params[search.checkerId] = this.arr[
                        search.checkerId
                    ];
                }
            });

        return params;
    }

    /**
     * 回退操作
     * @param data
     */
    private onUrlData() {
        const urlData = this.xn.user.getUrlData(this.xn.router.url);
        if (urlData && urlData.pop) {
            this.paging = urlData.data.paging || this.paging;
            this.sorting = urlData.data.sorting || this.sorting;
            this.naming = urlData.data.naming || this.naming;
            this.words = urlData.data.words || this.words;
            this.createBeginTime = urlData.data.createBeginTime || this.createBeginTime;
            this.createEndTime = urlData.data.createEndTime || this.createEndTime;
            this.arr = urlData.data.arrObjs || this.arr;
        } else {
            this.xn.user.setUrlData(this.xn.router.url, {
                paging: this.paging,
                sorting: this.sorting,
                naming: this.naming,
                words: this.words,
                createBeginTime: this.createBeginTime,
                createEndTime: this.createEndTime,
                arrObjs: this.arr
            });
        }
    }
}
