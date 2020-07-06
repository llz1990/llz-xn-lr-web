import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordDragonComponent } from './pages/record-dragon/record-dragon.component';
import { NewComponent } from './share/components/record/new.component';
import { DragonRecordComponent } from './share/components/record/record.component';
import { DragonEditComponent } from './share/components/record/edit.component';
import { DragonViewComponent } from './share/components/record/view.component';
import { CapitalPoolComponent } from './pages/capital-pool/capital-pool.component';
import { CapitalPoolUnhandledListComponent } from './pages/capital-pool/capital-pool-unhandled-list/capital-pool-unhandled-list.component';
import CapitalPoolUnhandledMainList from './pages/capital-pool/capital-pool-unhandled-list/capital-pool-unhandled-main-list';
import { CapitalPoolCommListComponent } from './pages/capital-pool/capital-pool-comm-list/capital-pool-comm-list.component';
import CapitalPoolTradingList from './pages/capital-pool/capital-pool-comm-list/capital-pool-trading-list';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import ReceiptList from './pages/receipt-list/receipt-list';
import { DragonProjectInfoComponent } from './pages/project-company-supplierInfo/additional-materials.component';
import DragonAdditionalMaterials from './common/additional-materials';
import { DragonTransactionsListComponent } from './pages/common/dragon-transactions-list.component';
import DragonTransactionTabConfig from './common/transaction.config';
import { BatchModifyComponent } from './pages/capital-pool/capital-pool-comm-list/batch-modify.component';
import { DragonFlowDetailComponent } from './share/components/record/flow-detail.component';
import DragonpaymentTabConfig from './common/upload-payment-confirmation';
import DragonInvoiceTabConfig from './common/invoice-management';
import { DragonIntermediaryManagementComponent } from './pages/intermediary-management/intermediary-management-list.componment';
import IntermediaryManagementTabConfig from './common/intermediary-management';
import { DragonUploadPaymentsComponent } from './pages/upload-payment-confirmation/upload-payment-confirmation.component';
import FactorsignTabConfig from './pages/factor-sign-contract/factor-sign-contract-data';
import { DragonFactorSignComponent } from './pages/factor-sign-contract/factor-sign-contract.component';
import DragonFactorSign from './pages/factor-sign-contract/factor-sign-contract-data';
import { TransferContractManagerComponent } from './pages/contract-template/contract-template.component';
import onceContractTemplateTab from './common/once-contract-template.tab';
import secondContractTemplateTab from './common/second-contract-template.tab';
import { VankeEnterpoolComponent } from './pages/enter-capital-tool/enter-capital-pool-confirmation.component';
import vankeEnterPoolConfig from './common/enter-pool-capital';
import { DragonInvoiceManagementComponent } from './pages/invoice-management/invoice-management.component';
import ProjectManagerList from './common/project-management';
import { VankeProjectmanageComponent } from './pages/vanke-project-manager/vanke-project-management.component';
import ProjectManagerplanList from './pages/vanke-project-manager/vanke-project-plan-list/vanke-project-plan';
import { VankeProjectmanagePlanComponent } from './pages/vanke-project-manager/vanke-project-plan-list/vanke-project-plan-list.component';
import { VankeCapitalpoolComponent } from './pages/vanke-project-manager/vanke-capital-pool/vanke-capital-pool.component';
import ProjectManagerCapitalList from './pages/vanke-project-manager/vanke-capital-pool/vanke-capital-pool';
import { DragonView2Component } from './share/components/record/view2.component';

const routes: Routes = [
    {
        // 房地产供应链标准保理
        path: 'pre_record/:id',
        pathMatch: 'full',
        component: RecordDragonComponent
    },
    {
        // 资产池
        path: 'capital-pool',
        children: [{
            path: 'capital-pool-main-list',
            component: CapitalPoolComponent
        },
        { // 资产池 - 未入池交易列表
            path: 'unhandled-list',
            component: CapitalPoolUnhandledListComponent,
            data: CapitalPoolUnhandledMainList
        },
        { // 资产池 - 交易列表
            path: 'trading-list',
            component: CapitalPoolCommListComponent,
            data: CapitalPoolTradingList,
            runGuardsAndResolvers: 'always',
        },
        { // 资产池 - 交易列表 - 批量补充
            path: 'batch-modify',
            component: BatchModifyComponent,
        },
        ]
    },
    // {
    //     path: 'dragon-list',
    //     component: DragonTransactionsListComponent
    // },
    {
        // 项目公司补充业务资料
        path: 'projectCompany-addInfo',
        component: DragonProjectInfoComponent,
        data: DragonAdditionalMaterials
    },
    // 龙光交易列表
    {
        path: 'dragon-list',
        pathMatch: 'full',
        component: DragonTransactionsListComponent,
        data: { ...DragonTransactionTabConfig.get('dragonProjectList'), hideTitle: true }
    },
    // 中介机构账号管理
    {
        path: 'intermediary-list',
        pathMatch: 'full',
        component: DragonIntermediaryManagementComponent,
        data: { ...IntermediaryManagementTabConfig.getConfig('intermediary'), hideTitle: false }
    },
    // 龙光上传付确
    {
        path: 'confirmation-list',
        pathMatch: 'full',
        component: DragonUploadPaymentsComponent,
        data: { ...DragonpaymentTabConfig.getConfig('dragon'), hideTitle: false }
    },
    // 开票管理
    // {
    //     path: 'invoice-list',
    //     pathMatch: 'full',
    //     component: DragonInvoiceManagementComponent,
    //     data: { ...DragonInvoiceTabConfig.getConfig('invoice'), hideTitle: false }
    // },
    {
        path: 'factorSign/sign-contract',
        component: DragonFactorSignComponent,
        data: DragonFactorSign,
    },
    {
        // 项目管理
        path: 'vanke',
        children: [{
            //拟入池交易列表
            path: 'enter-pool',
            component: VankeEnterpoolComponent,
            data: vankeEnterPoolConfig.get('enterPoolList'),
        },
        { // 项目列表
            path: 'project-management',
            component: VankeProjectmanageComponent,
            data: ProjectManagerList.getConfig('projectManager'),
        },
        { // 项目列表-专项计划列表
            path: 'projectPlan-management',
            component: VankeProjectmanagePlanComponent,
            data: ProjectManagerplanList.getConfig('projectplanManager'),
        },
        { // 项目列表-专项计划列表-交易列表-基础资产、交易文件、尽职调查、产品信息
            path: 'capital-pool',
            component: VankeCapitalpoolComponent,
            data: ProjectManagerCapitalList.getConfig('vankeCapitallist'),
        },
        ]
    },
    // {
    //     path: 'vanke/enter-pool',
    //     component: VankeEnterpoolComponent,
    //     data: vankeEnterPoolConfig.get('enterPoolList'),
    // },
    // {
    //     path: 'vanke/project-management',
    //     component: VankeProjectmanageComponent,
    //     data: ProjectManagerList.getConfig('projectManager'),
    // },
    // {
    //     path: 'vanke/projectPlan-management',
    //     component: VankeProjectmanagePlanComponent,
    //     data: ProjectManagerplanList.getConfig('projectplanManager'),
    // },
    {
        // 流程
        path: 'record',
        children: [
            {
                path: 'new/:id/:headquarters',
                pathMatch: 'full',
                component: NewComponent,
            },
            // {
            //     path: 'new/:id/:headquarters/:productType',
            //     pathMatch: 'full',
            //     component: NewComponent,
            // },
            // {
            //     path: 'new/:id/:headquarters/:productType/:fitProject',
            //     pathMatch: 'full',
            //     component: NewComponent,
            // },
            {
                path: 'record/:id',
                component: DragonRecordComponent
            },
            {
                path: 'new/:id/:relatedRecordId',
                component: NewComponent
            },
            {
                path: 'new',
                component: NewComponent
            },
            {
                path: ':type/edit/:id',
                component: DragonEditComponent
            },
            {
                path: ':type/view/:id',
                component: DragonViewComponent
            },
            {
                path: 'view/:id',
                component: DragonViewComponent
            },
            {
                path: 'view',
                component: DragonView2Component
            },
        ]
    },
    {
        path: 'main-list/detail/:id',
        component: DragonFlowDetailComponent,
    },
    {
        // 生成应收账款回执
        path: 'receipt-list',
        component: ReceiptListComponent,
        data: ReceiptList,
    },
    {
        path: 'oncetransfer-contract-manage',
        component: TransferContractManagerComponent,
        data: { ...onceContractTemplateTab.getConfig('onceContract'), hideTitle: false }
    },
    {
        path: 'secondtransfer-contract-manage',
        component: TransferContractManagerComponent,
        data: { ...secondContractTemplateTab.getConfig('secondContract'), hideTitle: false }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DragonRoutingModule { }
