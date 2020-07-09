/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：RiskSharedModule
 * @summary：风控共享模块
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-05-30
 * **********************************************************************
 */

import {NgModule} from '@angular/core';
import {PublicModule} from '../../../public/public.module';
import {PanelChangeComponent} from './panel-change.component';
import {EditButtonComponent} from './edit-button.component';
import {SimplePageComponent} from './simple-page.component';

@NgModule({
    imports: [
        PublicModule,
    ],
    declarations: [
        PanelChangeComponent,
        EditButtonComponent,
        SimplePageComponent
    ],
    exports: [
        PanelChangeComponent,
        EditButtonComponent,
        SimplePageComponent,
        PublicModule
    ],
})
export class RiskSharedModule {
}
