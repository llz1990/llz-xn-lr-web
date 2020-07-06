/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：ContractModule
 * @summary：保理风控-交易控制-合同控制
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-05-30
 * **********************************************************************
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {RiskSharedModule} from '../../risk-shared.module';
import {ContractControlIndexComponent} from './contract-control-index.component';
import {EnterpriseContractComponent} from './enterprise-contract.component';
import {EnterpriseContractModalComponent} from './enterprise-contract-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ContractRoutingModule,
        RiskSharedModule
    ],
    declarations: [
        ContractControlIndexComponent,
        EnterpriseContractComponent,
    ],
})
export class ContractModule {
}
