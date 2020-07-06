import { ListHeadsFieldOutputModel } from '../../../config/list-config-model';

export default class VankeFactorTabConfig {
    static paltformMsg = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '平台审核复核人', value: 'recordId', type: 'mainFlowId', width: '19%' },
            { label: '审核意见', value: 'modelId', type: 'text', width: '10%' },
            { label: '后补资料', value: 'flowId', type: 'text', width: '10%' },
        ],

    };
    static businessFactor = {
        title: '本笔业务要素及资料',
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '交易id', value: 'mainFlowId', type: 'mainFlowId', width: '19%' },
            { label: '总部公司', value: 'poolTradeCode', type: 'text', width: '10%' },
            { label: '项目公司', value: 'projectCompany', type: 'text', width: '10%' },
            { label: '供应商', value: 'projectCompany', type: 'text', width: '10%' },
            { label: '应收账款金额', value: 'projectCompany', type: 'text', width: '10%' },
            { label: '资产转让折扣率', value: 'projectCompany', type: 'text', width: '10%' },
            { label: '保理融资到期日', value: 'projectCompany', type: 'date', width: '10%' },

        ],
    };
    static historyLoan = {
        title: '历史已放款业务情况',
        allheads: [
            {
                title: '',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '供应商名称', value: 'debtUnit', type: 'text', width: '19%' },
                    { label: '历史业务笔数', value: 'poolTradeCode', type: 'text', width: '10%' },
                    { label: '历史业务总额', value: 'receive', type: 'text', width: '10%' },
                    { label: '历史笔均金额', value: 'discountRate', type: 'text', width: '10%' },

                ],
            },
            {
                title: '详情列表',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '交易id', value: 'mainFlowId', type: 'mainFlowId', width: '19%' },
                    { label: '总部公司', value: 'headquarters', type: 'text', width: '10%' },
                    { label: '项目公司', value: 'projectCompany', type: 'text', width: '10%' },
                    { label: '供应商', value: 'debtUnit', type: 'text', width: '10%' },
                    { label: '应收账款金额', value: 'receive', type: 'text', width: '10%' },
                    { label: '资产转让折扣率', value: 'discountRate', type: 'text', width: '10%' },
                    { label: '保理融资到期日', value: 'factoringEndDate', type: 'date', width: '10%' },

                ],
            }


        ],

    };
    static holdersInfo = {
        title: '股东信息',
        allheads: [
            {
                title: '',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '股东', value: 'stockName', type: 'text', width: '10%' },
                    { label: '股东类型', value: 'stockType', type: 'text', width: '10%' },
                    { label: '认缴出资额（万元）', value: 'shouldCapi', type: 'text', width: '10%' },
                    { label: '出资比例', value: 'stockPercent', type: 'text', width: '10%' },
                    { label: '认缴出资时间', value: 'shoudDate', type: 'date', width: '10%' },
                    { label: '备注', value: 'tagsList', type: 'text', width: '10%' }
                ],
            }
        ]

    };
    static litigationInfo = {
        allheads: [
            {
                title: '立案信息',
                label: 'caseFiling',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '案号', value: 'CaseNo', type: 'text', width: '10%' },
                    { label: '原告', value: 'ProsecutorList', type: 'list', width: '10%' },
                    { label: '被告', value: 'DefendantList', type: 'list', width: '10%' },
                    { label: '立案时间', value: 'PublishDate', type: 'text', width: '10%' },

                ],
            },
            {
                title: '开庭公告',
                label: 'courtAnnoV4',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '案由', value: 'CaseReason', type: 'text', width: '10%' },
                    { label: '案号', value: 'CaseNo', type: 'text', width: '10%' },
                    { label: '上诉人', value: 'Prosecutorlist', type: 'list', width: '10%' },
                    { label: '被上诉人', value: 'Defendantlist', type: 'list', width: '10%' },
                    { label: '开庭日', value: 'LianDate', type: 'text', width: '10%' },
                ],
            },
            {
                title: '法院公告',
                label: 'courtNoticeV4',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '公告类型', value: 'Category', type: 'text', width: '10%' },
                    { label: '公告人', value: 'Court', type: 'list', width: '10%' },
                    { label: '当事人', value: 'Party', type: 'list', width: '10%' },
                    { label: '刊登日期', value: 'PublishedDate', type: 'text', width: '10%' },
                ],
            },
            {
                title: '裁判文书信息',
                label: 'judgeDocV4',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '案件编号', value: 'CaseNo', type: 'text', width: '10%' },
                    { label: '裁判文书名字', value: 'CaseName', type: 'text', width: '10%' },
                    { label: '案由', value: 'CaseReason', type: 'text', width: '10%' },
                    { label: '执行法案', value: 'Court', type: 'text', width: '10%' },
                    { label: '发布时间', value: 'SubmitDate', type: 'text', width: '10%' },

                ],
            },
            {
                title: '失信被执行人',
                label: 'shiXinInfo',
                heads: <ListHeadsFieldOutputModel[]>[
                    { label: '案件编号', value: 'Anno', type: 'text', width: '10%' },
                    { label: '被执行人履行情况', value: 'Executestatus', type: 'text', width: '10%' },
                    { label: '生效法律文书确定的义务', value: 'Yiwu', type: 'text', width: '10%' },
                    { label: '执行法院', value: 'ExecuteGov', type: 'text', width: '10%' },
                    { label: '作出执行依据', value: 'Executeunite', type: 'text', width: '10%' },
                    { label: '发布时间', value: 'Liandate', type: 'text', width: '10%' }, //Publicdate

                ],

            },

        ]
    };
};
