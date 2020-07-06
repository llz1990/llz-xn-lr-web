/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：AvengerListModule
 * @summary：交易列表 【采购融资，审批放款】
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                   wangqing          审批放款         2019-06-14
 * **********************************************************************
 */

import {NgModule} from '@angular/core';
import {AvengerSharedModule} from '../shared/shared.module';
import { AvengerInvoiceRouteModule } from './invoice-management-routing.module';
import { AvengerCommonModule } from '../common/avenger-common.module';
import { DragonInvoiceManagementComponent } from './invoice-management.component';

const COMPONENTS = [
    DragonInvoiceManagementComponent
];
@NgModule({
    imports: [
        AvengerSharedModule,
        AvengerCommonModule,
        AvengerInvoiceRouteModule
    ],
    declarations: [...COMPONENTS],
    entryComponents: [
    ],
})
export class AvengerInvoiceManagementModule {
}
