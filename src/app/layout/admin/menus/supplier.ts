import { Menu, PUBLIC_MENU } from './interface';

/**
 *  供应商 orgType:1
 */
export const SUPPLIER: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            {
                label: '两票一合同', css: 'fa-suitcase', customFlow: 'financing1',
                children: [
                    { label: '基础模式', url: '/console/record/record/financing' },
                ]
            },
            {
                label: '定向收款保理', css: 'fa-suitcase',
                children: [
                    { label: '托管协议签约', url: '/console/record/record/financing11' },
                    { label: '变更协议', url: '/console/record/record/financing12' },
                    { label: '待替换发票交易列表', url: '/console/record/record-change/change_invoice' },
                ]
            },
            { label: '供应商待签署合同交易', url: '/console/record/unsigned_contract' },
            PUBLIC_MENU['所有交易'],
            //   PUBLIC_MENU['Avenger'],
            { label: '台账', url: '/machine-account' },

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
        children: [...PUBLIC_MENU['管理功能'].children,
        { label: '上传营业执照', url: '/console/record/record/upload_base', customFlow: 'financing3' }], // 供应商且为标准保理
    },

];
