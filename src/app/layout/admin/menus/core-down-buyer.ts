import { Menu } from './interface';

/**
 *  核心企业（下游采购商）orgType:5
 */
export const COREDOWNBUYER: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            {
                label: '两票一合同', css: 'fa-suitcase',
                children: [
                    { label: '出票登记', url: '/console/record/record/enterprise_register' },
                ]
            },
        ]
    },
];
