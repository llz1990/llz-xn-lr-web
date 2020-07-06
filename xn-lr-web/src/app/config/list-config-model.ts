/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：list-config-model.ts
 * @summary：交易列表数据结构模型
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan             新增         2019-05-27
 * **********************************************************************
 */

import { CheckersOutputModel } from './checkers';

/***
 * 交易列表表头显示字段，及字段配置
 */
export class ListHeadsFieldOutputModel {
    /** 字段名称 */
    public label: string;
    /** 字段id */
    public value: string;
    /** dom中根据type 的类型对文件进行不同处理，达到特定显示 */
    public type: string;
    /** 列表列是否可排序 */
    public sort?: boolean;
    public _inList?: Issort;
    public width?: string;
    public show?: boolean;

}

/**
 *  按钮组参数字段
 */
export class ButtonConfigModel {
    /** 按钮标题 */
    public label: string;
    /** 操作行为 */
    public operate: string;
    /** 操作api */
    public post_url?: string;
    /** 是否为选中操作 */
    public disabled?: boolean;
    /** 某些条件下是否显示按钮 */
    public showButton?: boolean;
    /** 其他配置 */
    public options?: ButtonConfigModel;
    public click?: any;
    public flag?: number;
}

/**
 *  列表编辑
 */
export class ListButtonEditModel {
    /** 表头操作 */
    headButtons?: ButtonConfigModel[];
    leftheadButtons?: ButtonConfigModel[];
    rightheadButtons?: ButtonConfigModel[];
    /** 行内操作 */
    rowButtons?: ButtonConfigModel[];
}

/**
 *  子标签页
 */
export class SubTabListOutputModel {
    /** 标签名 */
    public label: string;
    /** 标签值 */
    public value: string;
    /** 表单操作 */
    public edit?: ListButtonEditModel;
    /** 是否可搜索 */
    public canSearch?: boolean;
    /** 是否可选 */
    public canChecked?: boolean;
    /** 搜索项 */
    public searches?: CheckersOutputModel[];
    /**表头*/
    public headText?: ListHeadsFieldOutputModel[];
    public count?: number;
    public params?: number;
}
export class Issort {
    public sort: boolean;
    public search: boolean;
}

/***
 *  标签页
 */
export class TabListOutputModel {
    /** 标签名 */
    public label: string;
    /** 标签值 */
    public value: string;
    /** 子标签 */
    public subTabList?: SubTabListOutputModel[];
    /** 列表请求api */
    public post_url?: string;
    public params?: number;
}

/**
 *  交易列表
 */
export class TabConfigModel {
    /** 列表名称 */
    public title: string;
    public tabList: TabListOutputModel[];
    public value?: string;
    public hideTitle?: boolean;
}
// export class TablistparamsModel {
//     public name: string;
//     public value: number;
// }
