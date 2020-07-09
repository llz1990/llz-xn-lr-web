/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：CheckersOutputModel
 * @summary：checker项、列表表头配置字段信息, checker项前端后模板输出配置保持一致
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan            新增         2019-05-21
 * **********************************************************************
 */
import { c } from '@angular/core/src/render3';

export class CheckersOutputModel {
    /** 标题*/
    public title: string;
    /** checkerId 即每个FromControl name属性 */
    public checkerId: string;
    public name?: string;
    /** 其他配置项 */
    public options?: CheckersOptionsOutputModel;
    /** 是否必填 */
    public required: number | boolean;
    /** 根据 type 值判断，渲染对应的组件*/
    public type: string;
    /** 输入占位提示符 */
    public placeholder?: string;
    /** 值 */
    public value?: string;
    /** 提示 默认为空*/
    public memo?: string;
    /** 验证关键字*/
    public validators?: any;
    /** 排序位置*/
    public sortOrder?: number;
    /** 当前步骤 @begin|review|winder 经办|复核|高级复核*/
    public procedureId?: string;
    /** 流程id */
    public flowId?: string;
    /** 可选项*/
    public selectOptions?: any[];
    /** 构建列表查询搜索项 选择结果的数据类型  默认 string  , 'number' 即为number */
    public base?: string;
    /** 是否为采购融资 */
    public isAvenger?: boolean;
    public show?: boolean;

    constructor() {
        this.memo = '';
    }
}

/**
 * 其他配置项字段
 */
export class CheckersOptionsOutputModel {
    /** 文件大小限制 */
    public picSize?: number;
    /** 文件格式限制  图片 pdf excel*/
    public fileext?: string;
    /** 文件格式限制 excel */
    public excelext?: string;
    /** select|radio|checkbox 等选项全局配置 key 值  select-options 文件中配置 */
    public ref?: string;
    /** 是否只读 */
    public readonly?: boolean;
    /** 时间段控件选择面版位置 top down */
    public position?: string;
    public helpType?: number;
    public helpMsg?: string;
}

/**
 *  select-options 全局配置选择项数据结构
 */
export class SelectItemsModel {
    /** 标题名 */
    public label: string;
    /** 对应值 */
    public value: string | number | number[] | string[] | boolean;
    /** 总部公司 */
    public headquarters?: string;
    /** 子项 */
    public children?: SelectItemsModel[];
}

export class EnterpriseTypeOutputModel {
    label: string;
    value: string;
    data?: BusinessModelOutputModel[];
}

/**
 * 注册申请，企业模式选择，模式配置
 */
export class BusinessModelOutputModel {
    label: string;
    value: string;
    checked?: boolean;
    data?: BusinessModelOutputModel[];
}
