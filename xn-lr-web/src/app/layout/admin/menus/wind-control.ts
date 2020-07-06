import { Menu } from './interface';

/**
     *  风控平台 orgType:88
     */
export const WINDCONTROL: Menu[] = [
    {
        label: '联盟注册平台', css: 'fa-bar-chart',
        children: [
            { label: '核心企业', url: '/console/core/core' },
            { label: '成员企业', url: '/console/member/member' },
        ]
    },
    {
        label: '数字认证平台', css: 'fa-bar-chart',
        children: [
            {
                label: '数字认证', css: 'fa-suitcase',
                children: [
                    { label: '客户认证', url: '/console/digital/digital' },
                    { label: '电子合同', url: '/console/digital/digital1' },
                ]
            },

            { label: '发票认证', url: '/console/digital/invoice-display' },
            { label: '商票认证', url: '/console/digital/honour-list' }
        ]
    },
    {
        label: '数字资产平台', css: 'fa-bar-chart',
        children: [
            { label: '交易背景', url: '/console/digital/property-list' },
            { label: '交易信息', url: '/console/digital/property-list1' },
            { label: '交易资产', url: '/console/digital/property-list2' },
            { label: '交易跟踪', url: '/console/digital/property-list3' },
        ]
    },
    {
        label: '大数据平台', css: 'fa-bar-chart',
        children: [
            { label: '客户信息', url: '/console/bigData/bigData' },
            { label: '法律诉讼', url: '/console/bigData/bigData1' },
            { label: '经营状况', url: '/console/bigData/bigData2' },
            { label: '财务状况', url: '/console/bigData/bigData3' },
            { label: '应收应付', url: '/console/bigData/bigData4' },
            { label: '征信信息', url: '/console/bigData/bigData5' },
            { label: '交易状况', url: '/console/bigData/bigData6' }
        ]
    },
    {
        label: '决策支持平台', css: 'fa-bar-chart',
        children: [
            { label: '信用评级', url: '/console/decision-support-platform/credit-rating' },
            { label: '即时评级', url: '/console/decision-support-platform/immediate' },
            { label: '市场动态-宏观政策动态', url: '/console/decision-support-platform/market-dynamics' },
        ]
    },
    {
        label: '云计算平台', css: 'fa-bar-chart',
        children: [
            { label: '概况', url: '/console/cloud/overview' },
            { label: '云主机', url: '/console/cloud/cloud-hosting' },
            { label: '云监控', url: '/console/cloud/cloud-monitoring' },
            { label: '警告列表', url: '/console/cloud/alarm-list' },
        ]
    }
];
