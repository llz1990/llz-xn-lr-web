import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent as ConsoleHomeComponent } from './home.component';
import { HomeComponent as BlockchainHomeComponent } from './blockchain/home.component';
import { DetailComponent as BlockchainDetailComponent } from './blockchain/detail.component';

import Todo from '../../logic/todo';
import SysMessages from '../../logic/sys-messages';
import PaymentMessages from '../../logic/payment-messages';
import TodoAvenger from '../../logic/todo-avenger';
import { RecordComponent } from './record/record.component';
import { NewComponent } from './record/new.component';
import { EditComponent } from './record/edit.component';
import { ViewComponent } from './record/view.component';
import { View2Component } from './record/view2.component';
import { InfoComponent } from './record/info.component';
import { BlocksComponent } from './blockchain/blocks.component';
import { MainFlowComponent } from './flow/main-flow.component';
import { FlowDetailComponent } from './flow/flow-detail.component';
import { PiaojcComponent } from './data/piaojc.component';
import { MoneyTableComponent } from './data/money-table.component';
import { EnterpriseComponent } from './data/enterprise.component';
import { DriveComponent } from './data/drive.component';
import { FactoringEfficiencyComponent } from './data/factoring-efficiency.component';
import { ClientMapComponent } from './data/client-map.component';
import { CapitalMapComponent } from './data/capital-map.component';
import { LimitManageComponent } from './manage/limit-manage.component';
import { ApprovalConditionsComponent } from './manage/approval-conditions.component';
import { LvManageComponent } from './manage/lv-manage.component';
import { LvWanManageComponent } from './manage/lv-wan-manage.component';
import { UserManageComponent } from './manage/user-manage.component';
import { ModeModificationComponent } from './manage/mode-modification.component';
import { RoleManageComponent } from './manage/role-manage.component';
import { InvoiceManageComponent } from './manage/invoice-manage.component';
import { MessageComponent } from './manage/message.component';
import { CaStatusComponent } from './manage/ca-status.component';
import { CaDetailComponent } from './manage/ca-detail.component';
import { PortalManageComponent } from './manage/portal-manage.component';
import { PowerManageComponent } from './manage/power-manage.component';
import { PortalListManageComponent } from './manage/portal-list-manage.component';
import { BankManageComponent } from './manage/bank-manage.component';
import { InvoicesManageComponent } from './manage/invoices-manage.component';
import { PlanManageComponent } from './manage/plan-manage.component';
import { WhiteListManageComponent } from './manage/white-list-manage.component';
import { ReportFormListComponent } from './data/report-form-list.component';
import { ReportFormDetailComponent } from './data/report-form-detail.component';
import { ReportingListComponent } from './manage/reporting-list.component';
import { ReportingDetailComponent } from './manage/reporting-detail.component';
import { HonourListComponent } from './manage/honour-list.component';
import { HonourFactoryListComponent } from './manage/honour-factory-list.component';
import { CommListComponent } from '../../public/component/comm-list.component';
import RegisterCompany from '../../logic/register-company';
import { RegisterDetailComponent } from '../../public/modal/register-detail.component';
import { InterestComponent } from './tools/interest.component';
import { RiskComponent } from './tools/risk.component';
import BankList from '../../logic/bank-card';
import { CommDetailComponent } from '../../public/component/comm-detail.component';
import { CommAddComponent } from '../../public/component/comm-add.component';
import { CommEditComponent } from '../../public/component/comm-edit.component';
import HonourList from '../../logic/honour-list';
import InvoiceUnfillList from '../../logic/invoice-unfill-list';
import MainList from '../../logic/main-list';
import CreateAuth from '../../logic/create-auth';
import { CapitalPoolCommListComponent } from '../../public/component/capital-pool-comm-list.component';
import CapitalPoolTradingList from '../../logic/capital-pool-trading-list';
import { CapitalPoolUnhandledListComponent } from '../../public/component/capital-pool-unhandled-list.component';
import CapitalPoolUnhandledMainList from '../../logic/capital-pool-unhandled-main-list';
import InstitutionalReview from '../../logic/institutional-review';
import { BillTradeListComponent } from './bill/bill-trade-list.component';
import { BillReceiveListComponent } from './bill/bill-receive-list.component';
import { TradeComponent } from './record/trade.component';
import InvoiceList from '../../logic/invoice-list';
import LimitList from '../../logic/limit-list';
import { ExportDataComponent } from './tools/export-data.component';
import { AccountReceiptListComponent } from '../../public/component/account-receipt-list.component';
import AccountReceipt from '../../logic/account-receipt';
import { ComfirmInformationIndexComponent } from './gemdale-mode/confirm-inforamtion-index.component';
import TabConfig from './gemdale-mode/tab-pane';
import { ComfirmationSignComponent } from './gemdale-mode/confirmation-sign-component';
import { YajvleSignContractComponent } from './vnake-mode/yajvle-sign-contract.component';
import { TransSupplementInfoComponent } from './gemdale-mode/trans-supplement-info-component';
import PayPlan from '../../logic/pay-plan';
import InvoiceDisplayList from '../../logic/invoice-display-list';
import { PaymentComponent } from './manage/payment.component';
import { AccountingLoadComponent } from './vnake-mode/contract-template/accounting-load.component';
import { InvoiceDisplayDetailComponent } from '../../public/component/invoice-display-detail.component';
import { InvoiceShowListComponent } from './risk-control/risk-warning/invoice-show-list.component';
import { CapitalPoolIndexComponent } from './capital-pool/capital-pool-index.component';
import UploadInvoicePdf from '../../logic/upload-inovice-pdf';
import { InvoiceSearchComponent } from './manage/invoice-search.component';
import { InvoceSearchRecordComponent } from './invoceSearch/invoce-Search-component';
import { InvoceSingleInfoComponent } from './invoceSearch/invoce-single-info-component';
import Vanke from '../../logic/vanke';
import Gemdale from '../../logic/gemdale';
import DirectedPayment from '../../logic/directed-payment';
import { ReceiptListComponent } from './manage/receipt-list.component';
import ReceiptList from '../../logic/receipt-list';
import { ReceiptListVkComponent } from './manage/receipt-list-vk.component';
import ReceiptListVK from '../../logic/receipt-list-vk';
import { AdditionalMaterialsComponent } from './manage/additional-materials.component';
import AdditionalMaterials from '../../logic/additional-materials';
import { SupplierUnsignedContractComponent } from './manage/supplier-unsigned-contract.component';
import SupplierUnsignedContract from '../../logic/supplierUnsignedContract';
import { InvoiceReplaceComponent } from '../../public/form/hw-mode/invoice-replace.component';
import { InvoiceReplaceRecordComponent } from '../../public/form/hw-mode/invoice-replace-record.component';
import { ServiceFeeComponent } from './service-fee/service-fee.component';
import { ServiceFeePromisePayComponent } from './service-fee-promise-pay/service-fee-promise-pay.component';
import { DiscountManageComponent } from './bank/discount-manage/discount-manage.component';
import { FinancingManageComponent } from './bank/financing-manage/financing-manage.component';
import { BankRecordComponent } from './record/bank/record.component.component';
import { BankNewComponent } from './record/bank/new.component';
import { BankEditComponent } from './record/bank/edit.component';
import Deposit from '../../logic/deposit';
import MainDepositList from '../../logic/main-list-deposit';
import { DepositMessageComponent } from './deposit/deposit-message.component';
import { ProtocolManagementIndexComponent } from './bank-management/portocol-management/protocol-management-index.component';
import { PaymentNoticeIndexComponent } from './bank-management/payment-notice/payment-notice-index.component';
import { ClientIndexComponent } from './bank-management/clients/client-index.component';
import { InvoicesIndexComponent } from './bank-management/invoices/invoices-index.component';
import { ContractTemplateIndexComponent } from './vnake-mode/contract-template/contract-template-index.component';
import { VankeYjlSupplierSignComponent } from './vnake-mode/vanke-yjl-supplier-sign.component';
import { FinancingDetailComponent } from './risk-control/progress/financing-detail.component';
import { AvengerRecordComponent } from '../../avenger/shared/components/record/record.component';
import { AvengerNewComponent } from '../../avenger/shared/components/record/new.component';
import { AvengerEditComponent } from '../../avenger/shared/components/record/edit.component';
import { AvengerViewComponent } from '../../avenger/shared/components/record/view.component';
import TodoDragon from '../../modules/dragon/Tododragon';
import { XnTabsComponent } from '../../public/component/tabs/tabs.component';
import { AvengerListComponent } from '../../avenger/common/avenger-list.component';
import { DragonInvoiceManagementComponent } from '../../avenger/invoice-management/invoice-management.component';
import IndexTabConfig from '../../avenger/common/index-tab.config';

const routes: Routes = [
    {
        path: '',
        component: ConsoleHomeComponent,
        data: { todo: Todo, sysMsg: SysMessages, payMsg: PaymentMessages, avengertodo: TodoAvenger, dragonTodo: TodoDragon }
    },
    {
        path: 'record/record/:id',
        component: RecordComponent
    },
    {
        path: 'record/new/:id',
        component: NewComponent
    },
    {
        path: 'record/new/:id/:relatedRecordId',
        component: NewComponent
    },
    {
        path: 'record/new',
        component: NewComponent
    },
    {
        path: 'record/:type/edit/:id',
        component: EditComponent
    },
    {
        path: 'record/:type/view/:id',
        component: ViewComponent
    },
    {
        path: 'record/view/:id',
        component: ViewComponent
    },
    { // 资产证券平台 查看子流程
        path: 'record/view',
        component: View2Component
    },
    {
        path: 'record/info',
        component: InfoComponent
    },
    {
        path: 'blockchain/home',
        component: BlockchainHomeComponent
    },
    {
        path: 'blockchain/detail/:type/:ledger/:id',
        component: BlockchainDetailComponent
    },
    {
        path: 'blockchain/blocks/:ledger/:id',
        component: BlocksComponent
    },
    {
        path: 'flow/main',
        component: MainFlowComponent
    },
    {
        path: 'flow/detail/:id',
        component: FlowDetailComponent
    },
    {
        path: 'data/piaojc',
        component: PiaojcComponent
    },
    {
        path: 'data/money-table',
        component: MoneyTableComponent
    },
    {
        path: 'data/enterprise',
        component: EnterpriseComponent
    },
    {
        path: 'data/drive',
        component: DriveComponent
    },
    {
        path: 'data/factoring-efficiency',
        component: FactoringEfficiencyComponent
    },
    {
        path: 'data/client-map',
        component: ClientMapComponent
    },
    {
        path: 'data/capital-map',
        component: CapitalMapComponent
    },
    {
        path: 'manage/limit-manage',
        component: LimitManageComponent
    },
    {
        path: 'manage/limit-manage/:id',
        component: NewComponent
    },
    {
        path: 'manage/approval-conditions',
        component: ApprovalConditionsComponent
    },
    {
        path: 'manage/lv-manage',
        component: LvManageComponent
    },
    {
        path: 'manage/lv-manage/:id',
        component: NewComponent
    },
    {
        path: 'manage/lv-wan-manage',
        component: LvWanManageComponent
    },
    {
        path: 'manage/lv-wan-manage/:id',
        component: NewComponent
    },
    {
        path: 'manage/user-manage',
        component: UserManageComponent
    },
    { // 模式修改组件
        path: 'manage/mode-modification',
        component: ModeModificationComponent
    },
    {
        path: 'manage/role-manage',
        component: RoleManageComponent
    },
    {
        path: 'manage/invoice-manage',
        component: InvoiceManageComponent
    },
    {
        path: 'manage/message',
        component: MessageComponent
    },
    {
        path: 'szca/ca-status',
        component: CaStatusComponent
    },
    { // ca详情
        path: 'szca/ca-status/detail/:id',
        component: CaDetailComponent
    },
    {
        path: 'manage/portal-manage',
        component: PortalManageComponent
    },
    {
        path: 'manage/power-manage',
        component: PowerManageComponent
    },
    {
        path: 'manage/portal-manage/:id',
        component: PortalListManageComponent
    },
    {
        path: 'manage/bank-manage',
        component: BankManageComponent
    },
    {
        path: 'manage/invoices-manage',
        component: InvoicesManageComponent
    },
    {
        path: 'manage/plan-manage',
        component: PlanManageComponent
    },
    {
        path: 'manage/white-list-manage',
        component: WhiteListManageComponent
    },
    {
        path: 'data/report-form-list',
        component: ReportFormListComponent
    },
    {
        path: 'data/report-form-list/:mainFlowId/:honourNum',
        component: ReportFormDetailComponent
    },
    {
        path: 'data/reporting-list',
        component: ReportingListComponent
    },
    {
        path: 'data/reporting-list/:id',
        component: ReportingDetailComponent
    },
    {
        path: 'data/honour-list',
        component: HonourListComponent
    },
    {
        path: 'data/honour-factory-list',
        component: HonourFactoryListComponent
    },
    { // 平台注册公司
        path: 'data/register-company',
        component: CommListComponent,
        data: RegisterCompany,
        // component: RegisterCompanyComponent
    },
    {
        path: 'data/register-company/:id',
        component: RegisterDetailComponent
    },
    {
        path: 'tools/interest',
        component: InterestComponent
    },
    {
        path: 'tools/risk',
        component: RiskComponent
    },
    {
        path: 'bank-card/list',
        component: CommListComponent,
        data: BankList
    },
    {
        path: 'bank-card/detail/:cardCode',
        component: CommDetailComponent,
        data: BankList
    },
    {
        path: 'bank-card/add',
        component: CommAddComponent,
        data: BankList
    },
    {
        path: 'bank-card/edit/:cardCode',
        component: CommEditComponent,
        data: BankList
    },
    { // honour-list
        path: 'honour-list/list',
        component: CommListComponent,
        data: HonourList
    },
    {
        path: 'honour-list/detail/:billNumber',
        component: CommDetailComponent,
        data: HonourList
    },
    { // invoice-unfill-list
        path: 'invoice-unifll-list/list',
        component: CommListComponent,
        data: InvoiceUnfillList
    },
    { // main-list
        path: 'main-list/list',
        component: CommListComponent,
        data: MainList
    },
    { // main-list-abs
        path: 'main-list-abs/list',
        component: CommListComponent,
        data: MainList
    }, { // 审核机构列表
        path: 'record/create_auth',
        component: CommListComponent,
        data: CreateAuth
    },
    { // 资产池 - 交易列表
        path: 'capital-pool/trading-list',
        component: CapitalPoolCommListComponent,
        data: CapitalPoolTradingList,
        runGuardsAndResolvers: 'always',
    },
    { // 未入池交易
        path: 'capital-pool/main-list',
        component: CapitalPoolUnhandledListComponent,
        data: CapitalPoolUnhandledMainList
    }, { // 机构审核
        path: 'manage/institutional-review',
        component: CapitalPoolCommListComponent,
        data: InstitutionalReview
    },
    {
        path: 'main-list/detail/:id/:proxy',
        component: FlowDetailComponent,
    },
    {
        path: 'main-list/detail/:id',
        component: FlowDetailComponent,
    },
    {
        path: 'bill/bill-trade-list',
        component: BillTradeListComponent
    },
    {
        path: 'bill/bill-receive-list',
        component: BillReceiveListComponent
    },
    { // 转账流水详情
        path: 'trade/detail/:mainFlowId',
        component: TradeComponent
    },
    { // 发票管理
        path: 'invoice-list/list',
        component: CommListComponent,
        data: InvoiceList
    },
    {
        path: 'invoice-list/detail/:taxpayerSegistrationNumber',
        component: CommDetailComponent,
        data: InvoiceList
    },
    {
        path: 'invoice-list/add',
        component: CommAddComponent,
        data: InvoiceList
    },
    {
        path: 'invoice-list/edit/:taxpayerSegistrationNumber',
        component: CommEditComponent,
        data: InvoiceList
    },
    { // limit-list
        path: 'limit-list/list',
        component: CommListComponent,
        data: LimitList
    },
    { // 导出excel数据
        path: 'export/export-data',
        component: ExportDataComponent
    },
    { // vanke-生成应收账款回执
        path: 'export/account-receipt',
        component: AccountReceiptListComponent,
        data: AccountReceipt
    },
    { // 金地abs 项目公司确认应收账款金额
        path: 'gemdale/confirm-receivable',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('receivable')
    },
    { // 金地abs 集团公司确认付款清单
        path: 'gemdale/gemdale-supports',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('paymentList')
    },
    { // 金地abs 集团公司 签署付款确认书
        path: 'gemdale/gemdale-supports/confirmation',
        component: ComfirmationSignComponent,
        data: TabConfig.get('headquartersSign')
    },
    { // 金地abs 保理商批量签署合同
        path: 'gemdale/sign-contract',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('signContract')
    }, { // 万科abs（雅居乐） 保理商批量签署合同
        path: 'yajvle/sign-contract',
        component: YajvleSignContractComponent,
        data: TabConfig.get('yajvleSignContract')
    }, { // 保理商 - abs地产 - 交易列表
        path: 'standard_factoring/trans_lists',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('standardFactoringList')
    }, { // 保理商 - 标准保理 - 交易列表 - 补充信息
        path: 'standard_factoring/trans_lists/supplement_info',
        component: TransSupplementInfoComponent,
        data: TabConfig.get('standardFactoringSupplementInfo')
    },
    { // 保理商 - 万科模式 - 补充信息
        path: 'vanke/supplement_info',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('vankeFactoringSupplementInfo')
    },
    { // 保理商 - 地产供应链雅居乐补充协议
        path: 'estate_chain/supplementary_agreement',
        component: ComfirmInformationIndexComponent,
        data: TabConfig.get('estateSupplyChainSupplementaryAgreement')
    },
    { // 付款计划表
        path: 'pay/pay-plan',
        component: CommListComponent,
        data: PayPlan
    },
    { // 发票展示
        path: 'invoice-display/list',
        component: CommListComponent,
        data: InvoiceDisplayList
    },
    { // 付款管理-vanke 万科,金地
        path: 'payment/vanke/:type',
        component: PaymentComponent,
    },
    { // 付款管理-vanke 金地
        path: 'payment/gemdale/:type',
        component: PaymentComponent,
    },
    { // abs 付款管理已打印带放款 - 下载会计下载
        path: 'payment/pending/load',
        component: AccountingLoadComponent,
    },
    {
        path: 'invoice-display/detail/:invoiceNum',
        component: InvoiceDisplayDetailComponent,
    }, {
        path: 'invoice-display/invoice-list',
        component: InvoiceShowListComponent, // 发票展示
    },
    {
        path: 'member/member/:id',
        component: RegisterDetailComponent
    },
    { // 发票认证
        path: 'digital/invoice-display',
        component: CommListComponent,
        data: InvoiceDisplayList
    },
    { // 商票认证
        path: 'digital/honour-list',
        component: HonourListComponent
    },
    { // 资产池
        path: 'capital-pool',
        component: XnTabsComponent,
        data: {
            title: '资产池（房地产供应链标准保理）',
            tabs: [{
                label: '万科、雅居乐',
                link: 'capital-pool',
                index: 0,
            }
                // }, {
                //     label: '龙光',
                //     link: 'dragon/capital-pool/capital-pool-main-list',
                //     index: 1
                // }]
            ]
        },
        children: [
            {
                path: 'dragon',
                loadChildren: 'app/modules/dragon/dragon.module#DragonModule'
            },
            {
                path: 'capital-pool',
                pathMatch: 'full',
                component: CapitalPoolIndexComponent,
            }, {
                path: '',
                pathMatch: 'full',
                component: CapitalPoolIndexComponent,
            }]
    },
    //
    { // 上传发票pdf
        path: 'upload/upload-invoice-pdf',
        component: CommListComponent,
        data: UploadInvoicePdf
    },
    {
        path: 'search/invoice-search',
        component: InvoiceSearchComponent
    },
    {
        path: 'search/invoice-search/record',
        component: InvoceSearchRecordComponent
    },
    {
        path: 'search/invoice-search/record/single',
        component: InvoceSingleInfoComponent,
    },
    // 万科模式改用通用列表
    {
        path: 'record',
        component: XnTabsComponent,
        data: {
            title: '上传付款计划（房地产供应链标准保理）',
            tabs: [{
                label: '万科、雅居乐',
                link: 'record-vanke/financing_pre6',
                index: 0
            }, {
                label: '地产类业务',  //龙光
                link: 'record-vanke/dragon/pre_record/financing_pre6',
                index: 1
            }]
        },
        children: [{
            path: 'record-vanke/dragon',
            loadChildren: 'app/modules/dragon/dragon.module#DragonModule'
        }, {
            path: 'record-vanke/:id',
            pathMatch: 'full',
            component: CommListComponent,
            data: { ...Vanke, hideTitle: true }
        }]
    },
    // 金地模式改用通用列表
    {
        path: 'record/record-gemdale/:id',
        component: CommListComponent,
        data: Gemdale
    },
    // 定向收款保理
    {
        path: 'record/record-directed/:id',
        component: CommListComponent,
        data: DirectedPayment
    },
    // 金地优化-项目公司批量签署回执
    {
        path: 'receipt-list/gemdale',
        component: ReceiptListComponent,
        data: ReceiptList,
    },
    // 万科优化-签署回执
    {
        path: 'receipt-list/vanke',
        component: ReceiptListVkComponent,
        data: ReceiptListVK,
    },
    // 项目公司>标准保理>补充业务资料
    {
        path: 'additional-materials',
        component: AdditionalMaterialsComponent,
        data: AdditionalMaterials,
    },
    // 我的交易>供应商待签署合同交易
    {
        path: 'record/unsigned_contract',
        component: SupplierUnsignedContractComponent,
        data: SupplierUnsignedContract
    },
    // 待替换发票交易列表
    {
        path: 'record/record-change/:id',
        component: InvoiceReplaceComponent,
    },
    // 替换发票记录
    {
        path: 'record/invoice-change/:mainFlowId',
        component: InvoiceReplaceRecordComponent,
    },
    { // 万科3.0 临时所有交易（会改）
        path: 'main-list-vanke/list',
        component: CommListComponent,
        data: MainList
    },
    {
        // 平台服务费管理
        path: 'service-fee',
        component: ServiceFeeComponent
    },
    {
        // 保证付款服务费管理
        path: 'service-fee-promise-pay',
        component: ServiceFeePromisePayComponent
    },
    {
        // 银行保理保证管理
        path: 'bank/discount',
        component: DiscountManageComponent
    },
    {
        // 银行融资管理
        path: 'bank/financing',
        component: FinancingManageComponent
    },
    {
        // 保证付款
        path: 'bank/record/:id',
        component: BankRecordComponent
    },
    {
        // 保证付款 发起交易
        path: 'bank/record/new/:id',
        component: BankNewComponent
    },
    {
        // 保证付款 edit
        path: 'bank/record/:type/edit/:id',
        component: BankEditComponent
    },
    { // 保证金管理
        path: 'manage/deposit-manage',
        component: CommListComponent,
        data: Deposit
    },
    { // 保证金列表
        path: 'deposit/list',
        component: CommListComponent,
        data: MainDepositList
    },
    {
        // 保证金详情
        path: 'deposit/detail/:mainFlowId',
        component: DepositMessageComponent
    },
    {
        path: 'management/protocol-management',
        component: ProtocolManagementIndexComponent
    }, {
        path: 'management/payment-notice',
        component: PaymentNoticeIndexComponent
    }, {
        path: 'management/client',
        component: ClientIndexComponent
    }, {
        path: 'management/invoices',
        component: InvoicesIndexComponent
    }, { // vanke 合同模版
        path: 'vanke-model/contract-template',
        component: ContractTemplateIndexComponent
    }, { // 供应商补充资料
        path: 'record/supplier_sign/:id',
        component: VankeYjlSupplierSignComponent
    },
    // 保理风控>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    {
        path: 'risk/risk-map',
        loadChildren: 'app/pages/console/risk-control/risk/risk-map.module#RiskMapModule',
    },
    { // 过程管理
        path: 'progress/progress',
        loadChildren: 'app/pages/console/risk-control/progress/progress.module#ProgressModule',
    },
    {   // 融资详情
        path: 'risk-control/risk-warning/:id',
        component: FinancingDetailComponent
    },
    { // 客户调查
        path: 'survey/survey',
        loadChildren: 'app/pages/console/risk-control/survey/survey.module#SurveyModule',

    },
    { // 风险预警
        path: 'risk-control/risk-warning',
        loadChildren: 'app/pages/console/risk-control/risk-warning/risk-warning.module#RiskWarningModule',
    },
    { // 合同控制
        path: 'transaction-control/contract',
        loadChildren: 'app/pages/console/risk-control/transaction-control/contract/contract.module#ContractModule',
    }, { // 额度控制
        path: 'transaction-control/amount',
        loadChildren: 'app/pages/console/risk-control/transaction-control/amount/amount.module#AmountModule',
    }, { // 交易控制
        path: 'transaction-control/transaction',
        loadChildren: 'app/pages/console/risk-control/transaction-control/transaction/transaction.module#TransactionModule',
    }, { // 费率控制
        path: 'transaction-control/rate',
        loadChildren: 'app/pages/console/risk-control/transaction-control/rate/rate.module#RateModule',
    },
    { // 综合监测
        path: 'risk-control/comprehensive-testing',
        loadChildren: 'app/pages/console/risk-control/monitor/monitor.module#MonitorModule',
    },
    // >>>>>>>>>>>>>>>>>>>>>>>> 采购融资>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    {
        path: 'record/avenger/record/:id',
        component: AvengerRecordComponent
    },
    {
        path: 'record/avenger/new/:id',
        component: AvengerNewComponent
    },
    {
        path: 'record/avenger/new/:id/:relatedRecordId',
        component: AvengerNewComponent
    },
    {
        path: 'record/avenger/new',
        component: AvengerNewComponent
    },
    {
        path: 'record/avenger/:type/edit/:id',
        component: AvengerEditComponent
    },
    {
        path: 'record/avenger/:type/view/:id',
        component: AvengerViewComponent
    },
    {
        path: 'bank-puhuitong',
        loadChildren: 'app/modules/bank_puhuitong/bank-puhuitong.module#BankPuhuitongModule'
    },
    // {
    //     path: 'record/avenger/detail/view/:id',
    //     component: AvengerViewComponent
    // },
    // >>>>>>>>>>>>>>>>>>>>>>>>>> 采购融资 lazyload>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    { // 客户管理
        path: 'customer-manage',
        loadChildren: 'app/avenger/customer-manage/customer-manage.module#CustomerManageModule',
    }, { // 保后管理
        path: 'guarant-manage',
        loadChildren: 'app/avenger/guarant-management/guarant-management.module#GuarantManagementModule'
    }, { // 合同管理
        path: 'contract-manage',
        loadChildren: 'app/avenger/contract-manage/contract-manage.module#ContractManageModule'
    },
    {
        path: 'main',
        component: XnTabsComponent,
        data: {
            title: '交易列表',
            tabs: [
                {
                    label: '地产类业务',  //龙光业务
                    link: 'dragon/dragon-list',
                    index: 0
                },
                {
                    label: '万科供应商保理业务',  //普惠通
                    link: 'avenger-list',
                    index: 1
                },

                // {
                //     label: '雅居乐、金地业务',   //地产类业务
                //     link: 'trans_lists',
                //     index: 1
                // },

            ]

        },
        children: [
            {
                path: 'dragon',
                loadChildren: 'app/modules/dragon/dragon.module#DragonModule'
            },
            {
                path: 'avenger-list',
                loadChildren: 'app/avenger/avenger-list/avenger-list.module#AvengerListModule',
            },

            // {
            //     path: 'trans_lists',
            //     pathMatch: 'full',
            //     component: ComfirmInformationIndexComponent,
            //     data: { ...TabConfig.get('standardFactoringList'), hideTitle: true }

            // },

        ]
    },
    // { // 交易列表
    //     path: 'main-list/avenger-list',
    //     loadChildren: 'app/avenger/avenger-list/avenger-list.module#AvengerListModule'
    // },

    //开票管理
    {
        path: 'invoice-list',
        loadChildren: 'app/avenger/invoice-management/invoice-management.module#AvengerInvoiceManagementModule'
    },
    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>审批放款>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    {
        path: 'approvalloans-manager',
        loadChildren: 'app/avenger/approval-loans/approval-loan-manage.module#AvengerApprovalLoanModule'
    },
    {
        path: 'payment-management',
        loadChildren: 'app/avenger/payment-management/payment-management.module#AvengerpaymentManagementModule'
    },
    {
        path: 'approval_list',
        loadChildren: 'app/avenger/approval-list/approval-list.module#AvengerApprovallistModule'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsoleRoutingModule { }
