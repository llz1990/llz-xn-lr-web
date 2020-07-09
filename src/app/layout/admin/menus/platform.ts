import { Menu, PUBLIC_MENU } from './interface';

/**
 *  平台 orgType:99
 */
export const PLATFORM: Menu[] = [
    {

        label: '我的交易', css: 'fa-suitcase',
        children: [
            { label: '所有交易', url: '/console/main-list/list' },
            { label: '平台服务费管理', url: '/console/service-fee' },
            PUBLIC_MENU['Avenger'],
            { label: '台账', url: '/machine-account' },
            { label: '中登登记列表', url: '/machine-account/zhongdeng-list' },
        ]
    },
    {
        label: '管理功能', css: 'fa-user-circle-o',
        children: [...PUBLIC_MENU['管理功能'].children,

        { label: '保后管理', url: '/console/guarant-manage' },
        { label: '合同管理', url: '/console/contract-manage' },
        { label: '一次转让合同管理', url: '/dragon/oncetransfer-contract-manage' },

        { label: '模式修改', url: '/console/manage/mode-modification' },
        {
            label: '普惠通管理', css: 'fa-university ',
            children: [
                { label: '普惠通-采购融资', url: '/console/customer-manage' },
                { label: '普惠通-银行', url: '/console/bank-puhuitong' },
            ]
        }]
    },
    {
        label: '我的数据', css: 'fa-database',
        children: [
            { label: '企业资料', url: '/console/record/info' },
            { label: '所有出票', url: '/console/record/record/enterprise_register_platform' },
            { label: '主流程详情报表', url: '/console/data/report-form-list' },
            { label: '注册公司', url: '/console/data/register-company' },
            { label: '商票展示', url: '/console/data/honour-list' },
            { label: '企业上报交易数据', url: '/console/data/reporting-list' },
            PUBLIC_MENU['区块链数据'],
            { label: '深圳CA审核进度', url: '/console/szca/ca-status' },
            { label: '发票展示', url: '/console/invoice-display/list' },

        ]
    },

];
