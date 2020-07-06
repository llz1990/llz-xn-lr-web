/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：XnSelectTransformPipe
 * @summary：鍵值對匹配，将 [{label:'是',value:'1',children:[{...}]}]枚举转换根据值value值显示鍵名label
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          重構                2019-05-19
 * **********************************************************************
 */
import { Pipe, PipeTransform } from '@angular/core';
import { SelectOptions } from '../../config/select-options';
import { isArray } from 'util';
import { isNgTemplate } from '@angular/compiler';

/**
 *  将 [{label:'是',value:'1',children:[{...}]}]枚举转换根据value 值显示label 标签 或者 string : ref 键值对在select-options 中的配置属性名
 */
@Pipe({ name: 'xnSelectDeepTransform' })
export class XnSelectDeepTransformPipe implements PipeTransform {
    /**
     *  param 为数列时，直接匹配对应的值，字符串时，在select-options 匹配对应的名稱
     * @param value  |前传值
     * @param param  |后传值
     */
    transform(value: any, param: any): string {
        return fnTransform(value, param);
    }
}

export function fnTransform(value: any, param: any): string {
    if(!param || !value){
        return '';
    }
    let obj = $.extend(true,{},value);
    let currentLabel = SelectOptions.getLabel(SelectOptions.get(param),String(obj.type));
    if(['1','99'].includes(String(obj.type))){
        return currentLabel;
    }else if(String(obj.type)==='2' && String(obj.selectBank)!=='0'){
        let children = SelectOptions.get(param).find((pro)=>pro.value===String(obj.type)).children;
        let chidLabel = children.find((child)=>child.value===String(obj.selectBank)).label;
        return currentLabel + '-' + chidLabel;
    }else{
        return '';
    }
}
