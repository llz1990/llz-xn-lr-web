/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：DynamicFormModule
 * @summary：动态表单模块
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                WuShenghui    移除表单 ngSwitchCase   2019-06-24
 * **********************************************************************
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDirective } from './dynamic-host.directive';
import { DynamicComponentService } from './dynamic.service';
import { InputForms } from './form/input';
import { ShowForms } from './form/show';
import { InputComponent } from './form/input.component';
import { ShowComponent } from './form/show.component';
import { PublicModule } from '../../public/public.module';

/**
 * 自定义组件
 */
const COMPONENT = [
    InputComponent,
    ShowComponent,
];

/**
 *  动态生成组件
 */
const ENTRY_COMPONENT = [
    ...InputForms,
    ...ShowForms,
];

/**
 *  自定义指令
 */
const DIRECTIVES = [
    DynamicDirective,
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicModule,
    ],
    declarations: [
        ...COMPONENT,
        ...ENTRY_COMPONENT,
        ...DIRECTIVES
    ],
    exports: [
        ...COMPONENT,
        ...ENTRY_COMPONENT
    ],
    entryComponents: [
        ...ENTRY_COMPONENT
    ],
    providers: [
        DynamicComponentService
    ]
})
export class DynamicFormModule {
}
