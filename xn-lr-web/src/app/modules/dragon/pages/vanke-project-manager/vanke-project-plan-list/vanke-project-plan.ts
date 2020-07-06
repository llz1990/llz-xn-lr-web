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



export default class ProjectManagerplanList {
    // 交易列表 -采购融资，默认配置
    static ABSplanbusiness = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '资产池编号', value: 'capitalPoolId', type: 'mainFlowId' },
            { label: '资产池名称', value: 'capitalPoolName' },
            { label: '专项计划名称', value: 'projectName',type: 'projectName' },
            { label: '发行规模', value: 'sumReceive', type: 'money' },
            { label: '产品设立日', value: 'productCreateTime', type: 'date' },
            { label: '法定到期日', value: 'productendTimeList', type: 'moreDate' },
            { label: '交易个数', value: 'tradeNumber' },
        ],
        searches: <CheckersOutputModel[]>[
            { title: '资产池名称', checkerId: 'capitalPoolName', type: 'text', required: false, sortOrder: 2 },
        ]
    };


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // 多标签页，A,B,C,D,E,F......
    static readonly config = {
        projectplanManager: <TabConfigModel>{
            title: '项目管理',
            tabList: [
                {
                    label: 'ABS储架项目',
                    value: 'A',
                    subTabList: [
                        {
                            label: 'ABS储架项目',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            count: 0,
                            edit: {
                                headButtons: [
                                    {
                                        label: '设立专项计划',
                                        operate: 'set-plan',
                                        post_url: '/jd/approval',
                                        disabled: false,
                                    },
                                    {
                                        label: '设立专项计划（旧）',
                                        operate: 'set-oldplan',
                                        post_url: '/jd/approval',
                                        disabled: false,
                                    },
                                    {
                                        label: '选择项目',
                                        operate: 'chose-plan',
                                        post_url: '/jd/approval',
                                        disabled: false,
                                    }
                                ],

                                rowButtons: [
                                    {
                                        label: '基础资产',
                                        operate: 'confirm_receivable',
                                        post_url: '/customer/changecompany',
                                        disabled: false,
                                        showButton: true,
                                        click: (base: CommBase, params, xn: XnService, hwModeService: HwModeService) => {
                                        }
                                    },
                                    {
                                        label: '添加交易',
                                        operate: 'add_transaction',
                                        post_url: '/customer/changecompany',
                                        disabled: false,
                                        click: (base: CommBase, params, xn: XnService, hwModeService: HwModeService) => {
                                        }
                                    },
                                ]
                            },
                            searches: ProjectManagerplanList.ABSplanbusiness.searches,
                            headText: ProjectManagerplanList.ABSplanbusiness.heads,
                        },
                    ],
                    post_url: '/project_manage/pool/pool_list',
                    params: 1,


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
