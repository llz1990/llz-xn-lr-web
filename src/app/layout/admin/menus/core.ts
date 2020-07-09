import { PUBLIC_MENU, Menu } from './interface';

/**
 *  核心企业 orgType:2
 */
export const CORE: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            {
                label: '两票一合同', css: 'fa-suitcase', isSupply: true, customFlow: 'financing1',
                children: [
                    { label: '出票登记', url: '/console/record/record/enterprise_register' },
                    { label: '委托模式', url: '/console/record/record/financing2' },
                    { label: '基础模式', url: '/console/record/record/financing' },
                    { label: '回购模式', url: '/console/record/record/financing1' },
                ]
            },
            {
                label: '标准保理(金地)', css: 'fa-suitcase', isEstate: true, dcType: 'financing14', // 金地abs
                children: [
                    {
                        label: '付款清单确认', url: '/console/gemdale/gemdale-supports',
                        isHeadQuarter: true, enterpriseType: 'financing14_1'
                    }, // 总部公司
                    {
                        label: '确认应收帐款金额', url: '/console/gemdale/confirm-receivable',
                        isProject: true, enterpriseType: 'financing14_3'
                    }, // 项目公司
                    {
                        label: '签署回执', url: '/console/receipt-list/gemdale',
                        isProject: true, enterpriseType: 'financing14_3'
                    }, // 项目公司
                ]
            },
            {
                label: '房地产供应链标准保理', css: 'fa-suitcase', isEstate: true, dcType: 'financing6', // 万科abs
                children: [
                    {
                        label: '项目公司签署合同', url: '/console/receipt-list/vanke',
                        isProject: true, enterpriseType: 'financing6_3'
                    }, // 项目公司
                    {
                        label: '补充业务资料', url: '/console/additional-materials',
                        isProject: true, enterpriseType: 'financing6_3'
                    }, // 项目公司
                ]
            },
            {
                label: '龙光地产标准保理', css: 'fa-suitcase', isEstate: true, dcType: 'financing52', // 龙光
                children: [
                    {
                        label: '项目公司签署合同', url: '/console/receipt-list/vanke',
                        isProject: true, enterpriseType: ' financing52_3'
                    }, // 项目公司
                    {
                        label: '补充业务资料', url: '/dragon/projectCompany-addInfo',
                        isProject: true, enterpriseType: 'financing52_3'
                    }, // 项目公司
                    {
                        label: '龙光项目公司签署合同', url: '/dragon/receipt-list',
                        isProject: true, enterpriseType: 'financing52_3'
                    }, // 项目公司
                ]
            },
            { label: '所有交易', url: '/console/main-list/list' },
            { label: '保证金支付记录表', url: '/console/deposit/list' },
            PUBLIC_MENU['Avenger'],
        ]
    },
    {
        label: '我的数据', css: 'fa-database',
        children: [
            { label: '客户计划', url: '/console/manage/plan-manage' },
        ]
    },
    {
        label: '我的资料',
        css: 'fa-info-circle',
        children: [...PUBLIC_MENU['我的资料'].children,
        { label: '财报资料', url: '/console/record/record/financing_report_upload' },
        { label: '征信报告', url: '/console/record/record/credit_report_upload' },
        ]
    },
    {
        label: '管理功能', css: 'fa-user-circle-o',
        children: [...PUBLIC_MENU['管理功能'].children as any,
        { label: '上传营业执照', url: '/console/record/record/upload_base', isProject: true, enterpriseType: 3 }]
    },
];
