import { Menu, PUBLIC_MENU } from './interface';

/**
 *  银行  orgType:4
 */
export const BANK: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            { label: '保理保证管理', url: '/console/bank/discount' },
            { label: '保理融资管理', url: '/console/bank/financing' },
            PUBLIC_MENU['所有交易']
        ]
    },
    // 银行角色功能
    {
        label: '银行功能', css: 'fa-th',
        children: [
            { label: '协议管理', url: '/console/management/protocol-management' },
            { label: '通知书管理', url: '/console/management/payment-notice' },
            { label: '客户业务统计', url: '/console/management/client' },
            { label: '发票登记与查询', url: '/console/management/invoices' },
        ]
    }, {
        label: '管理功能', css: 'fa-user-circle-o', isAdmin: true,
        children: [
            { label: '用户管理', url: '/console/manage/user-manage' }
        ]
    }
];
