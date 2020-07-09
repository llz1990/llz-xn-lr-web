/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：DynamicDecorators
 * @summary：动态表单装饰器
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                WuShenghui    移除表单 ngSwitchCase   2019-06-24
 * **********************************************************************
 */
import { ReflectiveInjector } from '@angular/core';
import { DynamicComponentService } from './dynamic.service';

const injector = ReflectiveInjector.resolveAndCreate([
    { provide: 'dynamicComponentService', useClass: DynamicComponentService }
]);

export const dynamicComponentService = injector.get('dynamicComponentService');

export function DynamicForm(options: { type: string | string[], formModule: string, default?: boolean }): ClassDecorator {

    return (constructor: any) => {
        dynamicComponentService.setComponentInfo(constructor, options);
    };
}
