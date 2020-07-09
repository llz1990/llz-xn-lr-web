import { XnService } from '../../../../services/xn.service';
import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { SelectOptions } from '../../../../config/select-options';
import { NgForm } from '@angular/forms';
import { XnUtils } from '../../../../common/xn-utils';
import { ActivatedRoute, Params } from '@angular/router';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { EditModalComponent } from '../../../../avenger/shared/components/modal/edit-modal.component';
import { EditNewVankeModalComponent } from '../../share/modal/edit-new-vanke-modal.component';
import { SingleSearchListModalComponent } from '../../share/modal/single-searchList-modal.component';
import { DaterangepickerDirective } from '../../../../public/directive/date-range-picker/date-range-picker.directive';

declare const moment: any;

@Component({
    selector: 'app-record-dragon',
    templateUrl: './record-dragon.component.html',
    styleUrls: ['./record-dragon.component.css']
})
export class RecordDragonComponent implements OnInit, AfterViewInit {

    flowId = 'dragon_financing_pre';
    flowId1 = 'vanke_financing_pre';  //新万科流程

    /** 列表数据 */
    data: any[] = [];

    /** 页码配置 */
    pageConfig = {
        pageSize: 10,
        first: 1,
        total: 0,
    };

    /** 部分公司选项 */
    options = [];
    status = [];
    type = [];
    query = {
        recordId: '',
        headquarters: '',
        status: '',
        type: '',
        startTime: moment().subtract(12, 'months').valueOf().toString(),
        endTime: moment().valueOf().toString(),
    };

    sort: {
        name: string,
        order: 'asc' | 'desc'
    } = {
            name: '',
            order: 'asc'
        };

    @ViewChild(DaterangepickerDirective)
    private picker: DaterangepickerDirective;

    private get enterpriseOptions() {
        return 'enterprise_dragon';
    }

    constructor(private xn: XnService, private vcr: ViewContainerRef, private route: ActivatedRoute) {
        this.options = SelectOptions.get(this.enterpriseOptions);
        this.status = SelectOptions.get('createStatus');
        this.type = SelectOptions.get('productType_vk');

        // this.route.paramMap.subscribe(
        //     params => {
        //         const flowId = params.get('id');
        //         console.log('params :', flowId, this.flowId);

        //         if (flowId !== this.flowId) {
        //             this.flowId = flowId;
        //             this.onPage();
        //         }
        //     }
        // );
    }

    ngOnInit() {
        this.onPage();
    }

    ngAfterViewInit(): void {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);

        this.picker.datePicker.setStartDate(date);
    }

    /**
     *  @param event
     *       event.page: 新页码
     *       event.pageSize: 页面显示行数
     *       event.first: 新页面之前的总行数,下一页开始下标
     *       event.pageCount : 页码总数
     */
    public onPage(e?) {
        // this.onUrlData(); // 导航回退取值
        this.pageConfig = Object.assign({}, this.pageConfig, e);

        this.xn.loading.open();
        const params = {
            // ...this.query,
            pageNo: this.pageConfig.first,
            pageSize: this.pageConfig.pageSize,
            // order: this.getOrderInfo(),
        };
        //处理搜索项
        for (let key in this.query) {
            if (!XnUtils.isEmpty(this.query[key])) {
                params[key] = this.query[key];
            }
        }
        this.xn.api.dragon.post('/pay_plan/list', params).subscribe(x => {
            if (x.data && x.data.data && x.data.data.length) {
                this.data = x.data.data;
                this.pageConfig.total = x.data.count;
            } else {
                this.noData();
            }
        }, () => {
            this.noData();
        }, () => {
            this.xn.loading.close();
        });
    }

    private noData() {
        this.data = [];
        this.pageConfig.total = 0;
    }

    /**
     *  搜索,默认加载第一页
     */
    public search() {
        this.onPage();
    }

    /**
     * 重置
     */
    public reset(form: NgForm) {
        this.query.recordId = '';
        this.query.headquarters = '';
        this.query.status = '';
        this.query.type = '';
        this.resetDateRange();
        this.search(); // 清空之后自动调一次search
    }

    /**
     * 排序
     * @param sort 排序列名
     */
    onSort(name: string): void {
        if (this.sort.name === name) {
            this.sort.order = this.sort.order === 'desc' ? 'asc' : 'desc';
        } else {
            this.sort = {
                name,
                order: 'asc'
            };
        }

        this.onPage();
    }

    onSortClass(name: string): string {
        return this.sort.name && name === this.sort.name ? `sorting_${this.sort.order}` : 'sorting';
    }

    getOrderInfo() {
        return this.sort.name ? [`${this.sort.name} ${this.sort.order}`] : null;
    }

    doProcess(record: any) {
        // 流程已完成 或者账号没有权限查看流程
        if ((record.status !== 1 && record.status !== 0)
            || !XnUtils.getRoleExist(record.nowRoleId, this.xn.user.roles, record.proxyType)) {
            this.xn.router.navigate([`/dragon/record/${this.flowId}/view/${record.recordId}`]);
        } else {
            this.xn.router.navigate([`/dragon/record/${this.flowId}/edit/${record.recordId}`]);
        }
    }

    viewProcess(record: any) {
        if ((record.status !== 1 && record.status !== 0) || this.xn.user.roles.indexOf(record.nowRoleId) < 0) {
            this.xn.router.navigate([`/dragon/record/${this.flowId}/view/${record.recordId}`]);
        } else {
            this.xn.router.navigate([`/dragon/record/${this.flowId}/edit/${record.recordId}`]);
        }
    }

    newProcess() {
        const selectOptions = this.enterpriseOptions;
        //地产业务 -新万科 适用项目 根据所选“总部公司”，出现【一次转让合同管理】功能列表中该总部公司对应的“适用项目”

        const params = {
            title: '选择总部公司',
            checker: [
                {
                    checkerId: 'headquarters',
                    required: 1,
                    type: 'select',
                    options: { ref: selectOptions },
                    title: '总部公司',
                },
                {
                    title: '渠道', checkerId: 'productType', type: 'linkage-select', required: 1,
                    options: { ref: "productType_dw", showWhen: ['headquarters'] } //'万科企业股份有限公司'
                },
                {
                    title: '合同组', checkerId: 'fitProject', type: 'search-select', required: 1,
                    options: { showWhen: ['headquarters', '万科企业股份有限公司'] }
                },
            ],
            info: { flowId: 'vanke_financing_pre', headquarters: '万科企业股份有限公司' }
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditNewVankeModalComponent, params).subscribe(x => {
            let channel = JSON.parse(x.productType);
            if (x && x.headquarters === "深圳市龙光控股有限公司") {
                this.xn.router.navigate([`/dragon/record/new/${this.flowId}/${x.headquarters}`],
                {
                    queryParams: {
                        productType: channel.proxy,
                        selectBank: channel.status ? channel.status : '0',
                    }
                });
            } else if (x && x.headquarters === "万科企业股份有限公司") {
                this.xn.router.navigate([`/dragon/record/new/${this.flowId1}/${x.headquarters}`],
                {
                    queryParams: {
                        productType: channel.proxy,
                        selectBank: channel.status ? channel.status : '0',
                        fitProject: x.fitProject
                    }
                });
            }
        });
    }

    viewZdList(item) {
        const params = {
            get_url: '',
            get_type: '',
            multiple: false,
            label: '查看登记编码/修改码',
            heads: [
                { label: '交易ID', value: 'mainFlowId', type: 'mainFlowId' },
                { label: '收款单位', value: 'debtUnit', type: 'text' },
                { label: '申请付款单位', value: 'projectCompany', type: 'text' },
                { label: '应收账款金额', value: 'receive', type: 'text' },
                { label: '登记编码', value: 'registerNum', type: 'text' },
                { label: '修改码', value: 'modifiedCode', type: 'text' },
            ],
            searches: [],
            key: '',
            data: item,
            total: item.length,
            inputParam: {}
        };
        XnModalUtils.openInViewContainer(this.xn, this.vcr, SingleSearchListModalComponent, params).subscribe((x) => {

        });
    }
    selectedDate(value: any) {
        // this is the date the iser selected
        this.query.startTime = value.start.format('x');
        this.query.endTime = value.end.format('x');
    }

    public resetDateRange() {
        // const m = moment();
        this.query.endTime = moment().valueOf().toString();
        this.query.startTime = moment().subtract(12, 'months').valueOf().toString();
        this.picker.datePicker.setStartDate(moment().subtract(12, 'months'));
        this.picker.datePicker.setEndDate(moment());

        // const defaultDate = m.format('YYYY-MM-DD');
        this.picker['input'].nativeElement.value = `${moment().subtract(12, 'months').format('YYYY-MM-DD')} - ${moment().format('YYYY-MM-DD')}`;
    }
}
