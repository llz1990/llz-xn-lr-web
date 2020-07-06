import { ListHeadsFieldOutputModel } from '../../../config/list-config-model';

export default class VankebusinessdataTabConfig {
    static vankebusinessRelated = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '流程id', value: 'recordId', type: 'recordId', width: '19%' },
            { label: '流程类型', value: 'linkName', type: 'text', width: '10%' },
            { label: '流程', value: 'flowName', type: 'text', width: '10%' },
            { label: '当前步骤', value: 'nowProcedureName', width: '10%' },
            { label: '流程发起时间', value: 'createTime', type: 'date',width: '10%' },
            { label: '流程结束时间', value: 'updateTime', type: 'date', width: '10%' },
        ],

    };
    static choseContractTemplate = {
        title: ' 合同模板选择',
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '合同模板', value: 'templateName', type: 'templateName', width: '19%' },
            { label: '签署方式', value: 'signType', type: 'text', width: '10%' },
            { label: '生成逻辑', value: 'style', type: 'text', width: '10%' },
        ],
        searches: [
            { title: '搜索合同模板', checkerId: 'templateName', type: 'text', },
            { title: '选择签署方式', checkerId: 'signType', type: 'text', },
            { title: '选择生成逻辑', checkerId: 'style', type: 'text', },
        ]
    };
};
