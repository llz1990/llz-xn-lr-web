import { Menu, PUBLIC_MENU } from './interface';

/**
 *  保理商 orgType:3
 */
export const FACTORING: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            PUBLIC_MENU['所有交易'],
            { label: '收款登记', url: '/console/record/record/factoring_repayment' },
            { label: '待补发票', url: '/console/invoice-unifll-list/list' },
            { label: '保证付款服务费管理', url: '/console/service-fee-promise-pay' },
            { label: '保证金支付记录表', url: '/console/deposit/list' },
            // 定向收款保理
            {
                label: '定向收款保理', css: 'fa-suitcase',
                children: [
                    { label: '定向收款提单', url: '/console/record/record-directed/financing_pre13' },
                    { label: '保理商确认回款', url: '/console/record/record/financing_confirm_loan13' },
                    { label: '待替换发票交易列表', url: '/console/record/record-change/change_invoice' },
                ]
            },
            PUBLIC_MENU['FactoringList'],
            { label: '台账', url: '/machine-account' },
        ]
    },
    {
        label: '地产ABS', css: 'fa-money',
        children: [
            {
                label: '房地产供应链标准保理', css: 'fa-suitcase',
                children: [
                    {
                        label: '上传付款计划', url: '/console/record/record-vanke/financing_pre6',
                        activeGroups: [
                            '/dragon/record/new/financing_pre6',
                            '/console/record/record-vanke/dragon/pre_record/financing_pre6',
                        ]
                    },
                    { label: '付款管理', url: '/console/payment/vanke/vanke' },
                    { label: '雅居乐批量签署合同', url: '/console/yajvle/sign-contract' },    // 增加雅居乐签署保理合同界面
                    { label: '保理商签署补充协议', url: '/dragon/factorSign/sign-contract' },    // 保理商签署补充协议
                ]
            },
            {
                label: '金地', css: 'fa-suitcase',
                children: [
                    { label: '上传付款计划', url: '/console/record/record-gemdale/financing_pre14' },
                    { label: '付款管理', url: '/console/payment/gemdale/gemdale' },
                    { label: '批量签署合同', url: '/console/gemdale/sign-contract' },
                ]
            },
            { label: '资产池', url: '/console/capital-pool' },
            // {label: '合同模板管理', url: '/console/vanke-model/contract-template'},
            // { label: '交易列表', url: '/console/standard_factoring/trans_lists' },
            { label: '审批放款', url: '/console/approval_list' },
            {
                label: '资产管理', css: 'fa-suitcase',
                children: [
                    { label: '拟入池交易列表', url: '/dragon/vanke/enter-pool' },
                    //{ label: '二次转让合同模板', url: '' },
                    { label: '二次转让合同管理', url: '/dragon/secondtransfer-contract-manage' },
                    { label: '项目管理', url: '/dragon/vanke/project-management' }
                ]
            },
        ]
    },
    {
        label: '风控管理', css: 'fa-industry',
        children: [
            { label: '风险地图', url: '/console/risk/risk-map' },
            { label: '客户管理', url: '/console/survey/survey' },
            {
                label: '交易控制', css: 'fa-bar-chart', // console/transaction-control/transaction-control
                children: [
                    { label: '合同控制', url: '/console/transaction-control/contract' },
                    { label: '额度控制', url: '/console/transaction-control/amount' },
                    { label: '交易控制', url: '/console/transaction-control/transaction' },
                    { label: '费率控制', url: '/console/transaction-control/rate' },
                ]
            }, // 交易控制
            { label: '过程管理', url: '/console/progress/progress' },
            { label: '风险预警', url: '/console/risk-control/risk-warning' }, // 风险预警
            { label: '综合监测', url: '/console/risk-control/comprehensive-testing' },
        ]

    },
    {
        label: '我的客户', css: 'fa-star',
        children: [
            { label: '额度管理', url: '/console/manage/limit-manage' },
            { label: '两票一合同利率', url: '/console/manage/lv-manage' },
            { label: '标准保理利率', url: '/console/manage/lv-wan-manage' },
            { label: '审批条件', url: '/console/manage/approval-conditions' },
            { label: '保证金管理', url: '/console/manage/deposit-manage' },
        ]
    },
    {
        label: '我的数据', css: 'fa-database',
        children: [
            { label: '融资详情', url: '/console/data/enterprise' },
            { label: '客户地图', url: '/console/data/client-map' },
            { label: '资产结构', url: '/console/data/piaojc' },
            { label: '资金回笼', url: '/console/data/money-table' },
            { label: '客户计划', url: '/console/manage/plan-manage' },
            { label: '商票展示', url: '/console/honour-list/list' },
            { label: '发票展示', url: '/console/invoice-display/list' },
        ]
    },
    PUBLIC_MENU['我的资料'],
    {
        label: '管理功能', css: 'fa-user-circle-o',
        children: [...PUBLIC_MENU['管理功能'].children,
        { label: '上传中登网文件', url: '/console/upload/upload-invoice-pdf' },
        { label: '发票查询', url: '/console/search/invoice-search' },
        { label: '中介机构账号管理', url: '/dragon/intermediary-list' },
        { label: '数据导出', url: '/console/export/export-data' }]
    },
    {
        label: '财务部功能', css: 'fa-leanpub',
        children: [
            { label: '上传付款确认书', url: '/dragon/confirmation-list' },
            { label: '回款管理', url: '/console/payment-management' },
            // { label: '开票管理', url: '/dragon/invoice-list' },
            { label: '开票管理', url: '/console/invoice-list',ofFactoring: ['100006'] },
        ]

    },
    {
        label: '银行台账', css: 'fa-bank',
        children: [
            { label: '转账流水', url: '/console/bill/bill-trade-list' },
            { label: '商票接收', url: '/console/bill/bill-receive-list' },
        ]
    }
];
