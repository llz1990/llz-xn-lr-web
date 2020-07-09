import { ListHeadsFieldOutputModel, TabConfigModel } from "../../../config/list-config-model";
import { CheckersOutputModel } from "../../../config/checkers";
import CommBase from "../../../public/component/comm-base";
import { XnService } from "../../../services/xn.service";
import { HwModeService } from "../../../services/hw-mode.service";

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



export default class ProjectManagerList {
    // 交易列表 -采购融资，默认配置
    static ABSbusiness = {
        heads: <ListHeadsFieldOutputModel[]>[
            { label: '项目编号', value: 'projectNum', },
            { label: '项目名称', value: 'projectName', type: 'mainFlowId' },
            { label: '总部公司', value: 'headquarters' },
            { label: '项目类型', value: 'projectType', type: 'text' },
            { label: '获批时间', value: 'passTime', type: 'date' },
            { label: '交易场所', value: 'dealSite',},
        ],
        searches: <CheckersOutputModel[]>[
            { title: '储架名称', checkerId: 'projectName', type: 'text', required: false, sortOrder: 2 },
            {
                title: '总部公司', checkerId: 'headquarters', type: 'select', options: { ref: 'abs_headquarters' },
                required: false, sortOrder: 4
            },
            { title: '项目类型', checkerId: 'projectType', type: 'select', options: { ref: 'projectTypeset' }, required: false, sortOrder: 5 },
        ]
    };


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // 多标签页，A,B,C,D,E,F......
    static readonly config = {
        projectManager: <TabConfigModel>{
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
                                        label: '设立项目',
                                        operate: 'set-up-project',
                                        post_url: '/jd/approval',
                                        disabled: false,
                                    },
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
                                    // {
                                    //     label: '统计信息',
                                    //     operate: 'confirm_receivable1',
                                    //     post_url: '/customer/changecompany',
                                    //     disabled: false,
                                    //     click: (base: CommBase, params, xn: XnService, hwModeService: HwModeService) => {
                                    //     }
                                    // },
                                ]
                            },
                            searches: ProjectManagerList.ABSbusiness.searches,
                            headText: [...ProjectManagerList.ABSbusiness.heads,
                                { label: '已发行量', value: 'predictPeriods1', },
                                { label: '总发行量', value: 'publishSum' },
                            ],
                        },
                    ],
                    post_url: '/project_manage/project/project_list',
                    params: 1,


                },
                {
                    label: '再保理银行项目',
                    value: 'F',
                    subTabList: [
                        {
                            label: '进行中',
                            value: 'DOING',
                            canSearch: true,
                            canChecked: true,
                            edit: {
                                headButtons: [
                                    {
                                        label: '设立项目',
                                        operate: 'set-up-project',
                                        post_url: '/jd/approval',
                                        disabled: false,
                                    },
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
                                        label: '统计信息',
                                        operate: 'confirm_receivable1',
                                        post_url: '/customer/changecompany',
                                        disabled: false,
                                        click: (base: CommBase, params, xn: XnService, hwModeService: HwModeService) => {
                                        }
                                    },
                                ]
                            },
                            searches: ProjectManagerList.ABSbusiness.searches,
                            headText: [...ProjectManagerList.ABSbusiness.heads,
                                { label: '累计发生额', value: 'predictPeriods1', },
                                { label: '余额', value: 'publishSum' },
                            ],
                        },
                    ],
                    post_url: '/project_manage/project/project_list',
                    params: 2,

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
