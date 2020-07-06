import { ListHeadsFieldOutputModel, TabConfigModel } from "../../../../../config/list-config-model";
import { CheckersOutputModel } from "../../../../../config/checkers";
import CommBase from "../../../../../public/component/comm-base";
import { XnService } from "../../../../../services/xn.service";
import { HwModeService } from "../../../../../services/hw-mode.service";


/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：IndexTabConfig
 * @summary：资产池项目管理
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wq             新增                 2020-01-17
 * **********************************************************************
 */

export default class ProjectManagerCapitalList {
    // 基础资产列表 -默认配置
    static basicCapitalList = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '交易ID', value: 'mainFlowId', type: 'mainFlowId', _inList: { sort: true, search: true }, show: true },
            { label: '收款单位', value: 'debtUnit', _inList: { sort: true, search: true }, show: true },
            { label: '申请付款单位', value: 'projectCompany', _inList: { sort: true, search: true }, show: true },
            { label: '融资人区域', value: 'debtSite', _inList: { sort: true, search: true }, show: true },
            { label: '债务人区域', value: 'projectSite', _inList: { sort: true, search: true }, show: true },
            { label: '付款确认书编号', value: 'payConfirmId', _inList: { sort: true, search: true }, show: true },
            { label: '应收账款金额', value: 'receive', type: 'receive', _inList: { sort: true, search: true }, show: true },
            { label: '资产转让折扣率', value: 'discountRate', type: 'number', _inList: { sort: true, search: true }, show: true },
            { label: '交易状态', value: 'tradeStatus', type: 'tradeStatus', _inList: { sort: true, search: true }, show: true },
            { label: '合同类型', value: 'contractType', type: 'tradeType', _inList: { sort: true, search: true }, show: true },
            { label: '冻结', value: 'freeze', type: 'freezing', show: true },
            { label: '上传发票与预录入是否一致', value: 'isInvoiceFlag', type: 'invoiceFlag', _inList: { sort: true, search: true }, show: true },
            { label: '预计放款日', value: 'priorityLoanDate', type: 'date', _inList: { sort: true, search: true }, show: true },
            { label: '实际放款日', value: 'realLoanDate', type: 'date', _inList: { sort: true, search: true }, show: true },
            { label: '保理融资到期日', value: 'factoringEndDate', type: 'date', _inList: { sort: true, search: true }, show: true },
        ],
        searches: <CheckersOutputModel[]>[
            { title: '交易ID', checkerId: 'mainFlowId', type: 'text', required: false, sortOrder: 1, show: true },
            { title: '收款单位', checkerId: 'debtUnit', type: 'text', required: false, sortOrder: 2, show: true },
            { title: '申请付款单位', checkerId: 'projectCompany', type: 'text', required: false, sortOrder: 3, show: true },
            { title: '融资人区域', checkerId: 'debtSite', type: 'text', required: false, sortOrder: 4, show: true },
            { title: '债务人区域', checkerId: 'projectSite', type: 'text', required: false, sortOrder: 5, show: true },
            { title: '资产编号', checkerId: 'tradeCode', type: 'text', required: false, sortOrder: 6, show: true },
            {
                title: '交易状态', checkerId: 'tradeStatus', type: 'select', options: { ref: '' },
                required: false, sortOrder: 7, show: true
            },
            {
                title: '合同类型', checkerId: 'contractType', type: 'select', base: 'number',
                options: { ref: '' }, required: false, sortOrder: 8, show: true
            },
            {
                title: '是否冻结', checkerId: 'freeze', type: 'select', base: 'number',
                options: { ref: 'freezingStatus' }, required: false, sortOrder: 9, show: true
            },
            {
                title: '实际上传发票与预录入是否一致', checkerId: 'isInvoiceFlag', base: 'number',
                type: 'select', options: { ref: 'defaultRadio' }, required: false, sortOrder: 10, show: true
            },
            {
                title: '总部提单日期', checkerId: 'isHeadPreDate', //headDate
                type: 'machine-loandate', required: false, sortOrder: 11, show: true
            },
        ]
    };

    // 交易文件列表 -默认配置
    static transactionFileList = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '交易ID', value: 'mainFlowId', type: 'mainFlowId', show: true },
            { label: '收款单位', value: 'debtUnit', show: true },
            { label: '申请付款单位', value: 'projectCompany', show: true },
            { label: '应收账款金额', value: 'receive', type: 'receive', show: true },
            { label: '交易状态', value: 'tradeStatus', type: 'tradeStatus', show: true },
            // { label: '《致总部公司通知书(二次转让)》', value: 'qrh', show: false, type: 'contract' },
            // { label: '《致项目公司通知书(二次转让)》', value: 'projectNotice2', show: false, },
            // { label: '《项目公司回执（二次转让）》', value: 'projectReceipt2', show: false, },
            // { label: '《确认函》', value: 'notice2', show: false, },
            { label: '付款确认书', value: 'factoringPayConfirmYyj', type: 'file', show: true },
            { label: '其他文件', value: 'otherFile', type: 'file', show: true },
            { label: '推送企业次数', value: 'pushCount', show: true },
            { label: '项目公司是否退回', value: 'isProxy', type: 'proxyType', show: true },

        ],
        searches: <CheckersOutputModel[]>[
            { title: '交易ID', checkerId: 'mainFlowId', type: 'text', required: false, sortOrder: 1, show: true },
            { title: '收款单位', checkerId: 'debtUnit', type: 'text', required: false, sortOrder: 2, show: true },
            { title: '申请付款单位', checkerId: 'projectCompany', type: 'text', required: false, sortOrder: 3, show: true },
            { title: '融资人区域', checkerId: 'debtSite', type: 'text', required: false, sortOrder: 4, show: true },
            { title: '债务人区域', checkerId: 'projectSite', type: 'text', required: false, sortOrder: 5, show: true },
            { title: '资产编号', checkerId: 'capitalPoolId', type: 'text', required: false, sortOrder: 6, show: true },
            {
                title: '交易状态', checkerId: 'tradeStatus', type: 'select',
                options: { ref: '' }, required: false, sortOrder: 7, show: true
            },
            {
                title: '合同类型', checkerId: 'type', type: 'select',
                options: { ref: '' }, required: false, sortOrder: 8, show: true
            },
            {
                title: '是否冻结', checkerId: 'freezeOne', type: 'select',
                options: { ref: 'freezingStatus' }, required: false, sortOrder: 9, show: true
            },
            // {
            //     title: '', checkerId: 'statusQrh', type: 'select', required: false, sortOrder: 10, show: false,
            //     options: { ref: '' },
            // },
            // {
            //     title: '', checkerId: 'statusProjectNotice2', type: 'select',
            //     options: { ref: '' }, required: false, sortOrder: 11, show: false
            // },
            // {
            //     title: '', checkerId: 'statusNotice2', type: 'select',
            //     options: { ref: '' }, required: false, sortOrder: 12, show: false
            // },
            // {
            //     title: '', checkerId: 'statusProjectReceipt2',
            //     options: { ref: '' }, type: 'select', required: false, sortOrder: 13, show: false
            // },
            {
                title: '《付款确认书》', checkerId: 'statusFactoringPayConfirm',
                type: 'select', required: false, sortOrder: 14, show: true, options: { ref: 'vankeSelectFlag2' },
            },
            { title: '其他文件', checkerId: 'otherFile', type: 'text', required: false, sortOrder: 15, show: true },
            { title: '推送企业次数', checkerId: 'pushCount', type: 'text', required: false, sortOrder: 16, show: true },
            { title: '总部提单日期', checkerId: 'beforeDate', type: 'quantum1', required: false, sortOrder: 17, show: true },
        ]
    };

    // 尽职调查列表 -默认配置
    static dueDiligenceList = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '交易ID', value: 'mainFlowId', type: 'mainFlowId', _inList: { sort: true, search: true }, show: true },
            { label: '收款单位', value: 'debtUnit', _inList: { sort: true, search: true }, show: true },
            { label: '申请付款单位', value: 'projectCompany', _inList: { sort: true, search: true }, show: true },
            { label: '应收账款金额', value: 'receive', type: 'receive', _inList: { sort: true, search: true }, show: true },
            { label: '交易状态', value: 'tradeStatus', type: 'tradeStatus', _inList: { sort: true, search: true }, show: true },
            { label: '尽调人', value: 'surveyMan', show: true },
            { label: '尽调状态', value: 'surveyStatus', type: 'surveyStatus', show: true },
            { label: '尽调意见', value: 'surveyInfo', type: 'receivable', show: true }
        ],
        searches: <CheckersOutputModel[]>[
            { title: '交易ID', checkerId: 'mainFlowId', type: 'text', required: false, sortOrder: 1, show: true },
            { title: '收款单位', checkerId: 'debtUnit', type: 'text', required: false, sortOrder: 2, show: true },
            { title: '申请付款单位', checkerId: 'projectCompany', type: 'text', required: false, sortOrder: 3, show: true },
            { title: '融资人区域', checkerId: 'debtSite', type: 'text', required: false, sortOrder: 4, show: true },
            { title: '债务人区域', checkerId: 'projectSite', type: 'text', required: false, sortOrder: 5, show: true },
            { title: '资产编号', checkerId: 'tradeCode', type: 'text', required: false, sortOrder: 6, show: true },
            {
                title: '交易状态', checkerId: 'tradeStatus', type: 'select', options: { ref: '' },
                required: false, sortOrder: 7, show: true
            },
            {
                title: '合同类型', checkerId: 'contractType', type: 'select',
                options: { ref: '' }, required: false, sortOrder: 8, show: true
            },
            {
                title: '是否冻结', checkerId: 'freeze', type: 'select',
                options: { ref: 'freezingStatus' }, required: false, sortOrder: 9, show: true
            },
            {
                title: '尽调状态', checkerId: 'surveyStatus', type: 'select',
                options: { ref: 'surveyStatus' }, required: false, sortOrder: 10, show: true
            }
        ]
    };
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // 多标签页，A,B,C,D,E,F......
    static readonly config = {
        vankeCapitallist: <TabConfigModel>{
            title: '项目管理',
            tabList: [
                {
                    label: '基础资产',
                    value: 'A',
                    subTabList: [
                        {
                            label: '基础资产',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            count: 0,
                            edit: {
                                leftheadButtons: [
                                    {
                                        label: '交易变动记录',
                                        operate: 'transaction_changes',
                                        post_url: '/',
                                        disabled: false,
                                        showButton: true,
                                    },
                                    {
                                        label: '批量补充信息',
                                        operate: 'batch_information',
                                        post_url: '/',
                                        disabled: true,
                                    },
                                    {
                                        label: '移除交易',
                                        operate: 'remove_transaction',
                                        post_url: '/',
                                        disabled: true,
                                    },
                                    {
                                        label: '添加交易',
                                        operate: 'add_transaction',
                                        post_url: '/',
                                        disabled: false,
                                    },
                                ],
                                rightheadButtons: [
                                    {
                                        label: '下载附件',
                                        operate: 'download_file',
                                        post_url: '/trade/down_file',
                                        disabled: true,
                                        showButton: true,
                                    },
                                    {
                                        label: '导出清单',
                                        operate: 'export_file',
                                        post_url: '/trade/down_list',
                                        disabled: true,
                                        showButton: true,
                                    },
                                ],
                                rowButtons: []
                            },
                            searches: ProjectManagerCapitalList.basicCapitalList.searches,
                            headText: ProjectManagerCapitalList.basicCapitalList.heads,
                        },
                    ],
                    post_url: '/project_manage/pool/trade_list',
                    params: 1,
                },
                {
                    label: '交易文件',
                    value: 'B',
                    subTabList: [
                        {
                            label: '进行中',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            edit: {
                                leftheadButtons: [
                                    {
                                        label: '生成合同',
                                        operate: 'generate_Contract',
                                        post_url: '/jd/passApproval',
                                        disabled: true,
                                    },
                                    {
                                        label: '生成并签署合同',
                                        operate: 'contract_sign',
                                        post_url: '/jd/passApproval',
                                        disabled: true,
                                    },
                                    // {
                                    //     label: '推送企业',
                                    //     operate: 'download_approval_list',
                                    //     post_url: '/custom/avenger/down_file/download_approval_list',
                                    //     disabled: false,
                                    //     flag: 2,
                                    // },
                                    {
                                        label: '回传文件',
                                        operate: 'return_file',
                                        post_url: '/custom/avenger/down_file/download_approval_list',
                                        disabled: false,
                                        flag: 2,
                                    },
                                ],
                                rightheadButtons: [
                                    {
                                        label: '下载附件',
                                        operate: 'download_file',
                                        post_url: '/jd/approval',
                                        disabled: true,
                                        showButton: true,
                                    },
                                    {
                                        label: '导出清单',
                                        operate: 'export_file',
                                        post_url: '/jd/approval',
                                        disabled: true,
                                        showButton: true,
                                    },
                                ],
                                rowButtons: []
                            },
                            searches: ProjectManagerCapitalList.transactionFileList.searches,
                            headText: ProjectManagerCapitalList.transactionFileList.heads,
                        },
                    ],
                    post_url: '/project_manage/file_contract/list',
                    params: 2,

                },
                {
                    label: '尽职调查',
                    value: 'C',
                    subTabList: [
                        {
                            label: '进行中',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            edit: {
                                rightheadButtons: [
                                    {
                                        label: '下载附件',
                                        operate: 'download_file',
                                        post_url: '/jd/passApproval',
                                        disabled: true,
                                        showButton: true,
                                    },
                                    {
                                        label: '导出清单',
                                        operate: 'export_file',
                                        post_url: '/jd/passApproval',
                                        disabled: true,
                                        showButton: true,
                                    },
                                ],
                                rowButtons: []
                            },
                            searches: ProjectManagerCapitalList.dueDiligenceList.searches,
                            headText: ProjectManagerCapitalList.dueDiligenceList.heads,
                        },
                    ],
                    post_url: '/project_manage/pool/trade_list',
                    params: 3,
                },
                {
                    label: '产品信息',
                    value: 'D',
                    subTabList: [
                        {
                            label: '进行中',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            edit: {
                                headButtons: [],
                                rowButtons: []
                            },
                            searches: [],
                            headText: [],
                        },
                    ],
                    post_url: '/list/main/mainList',
                    params: 4,
                },
            ]
        },
    };
    static getConfig(name) {
        return this.config[name];
    }
}

/***
 *  子标签页，针对采购融资交易列表，根据特定需求修改
 */
export enum SubTabEnum {
    /** 进行中 */
    DOING = '1',
    /** 待还款 */
    TODO = '10',
    /** 已完成 */
    DONE = '3',
    FOUR = '4',
    FIVE = '5',
}

export enum ApiProxyEnum {
    /** 采购融资 */
    A = 'avenger',
    /** 地产abs */
    B = 'avenger',
    C = 'avenger',
    D = 'avenger',
    E = 'avenger',
}


/***
 * 在数组特定位置插入元素
 * @param array 原数组
 * @param positionKeyWord 参考关键字
 * @param ele 插入元素
 * @param position 相对于参考元素位置 after | before
 */
function arraySplice(array: ListHeadsFieldOutputModel[], ele: ListHeadsFieldOutputModel,
    positionKeyWord: string, position: string) {
    const findIndex = array.findIndex(find => find.value === positionKeyWord);
    const idx = position === 'before' ? findIndex : findIndex + 1;
    array.splice(idx, 0, ele);
    return array;
}
