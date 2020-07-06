import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoringBusinessModule } from '../../avenger/factoring-business/factoring-business.module';
import { LayoutModule } from '../../layout/layout.module';
import { DataModule } from './data/data.module';
import { PublicModule } from '../../public/public.module';

import { HomeComponent as ConsoleHomeComponent } from './home.component';
import { HomeComponent as BlockchainHomeComponent } from './blockchain/home.component';
import { DetailComponent as BlockchainDetailComponent } from './blockchain/detail.component';

import { ConsoleRoutingModule } from './console-routing.module';
import { RecordComponent } from './record/record.component';
import { NewComponent } from './record/new.component';
import { EditComponent } from './record/edit.component';
import { BankEditComponent } from './record/bank/edit.component';
import { ViewComponent } from './record/view.component';
import { View2Component } from './record/view2.component';
import { MemoComponent } from './record/memo.component';
import { Contract3Component } from './record/contract3.component';
import { Contract4Component } from './record/contract4.component';
import { Contract5Component } from './record/contract5.component';
import { Contract3MessageComponent } from './record/contract3-message.component';
import { MainFlowComponent } from './flow/main-flow.component';
import { BlocksComponent } from './blockchain/blocks.component';

import { EnsureComponent } from './risk-control/progress/ensure.component';
import { DepositMessageComponent } from './deposit/deposit-message.component';
import { LimitManageComponent } from './manage/limit-manage.component';
import { ApprovalConditionsComponent } from './manage/approval-conditions.component';
import { LvManageComponent } from './manage/lv-manage.component';
import { BillTradeListComponent } from './bill/bill-trade-list.component';
import { BillReceiveListComponent } from './bill/bill-receive-list.component';
import { LvWanManageComponent } from './manage/lv-wan-manage.component';
import { UserManageComponent } from './manage/user-manage.component';
import { RoleManageComponent } from './manage/role-manage.component';
import { InvoiceManageComponent } from './manage/invoice-manage.component';
import { BankManageComponent } from './manage/bank-manage.component';
import { InvoicesManageComponent } from './manage/invoices-manage.component';
import { LoadWordManageComponent } from './manage/load-word-manage.component';
import { PlanManageComponent } from './manage/plan-manage.component';
import { MessageComponent } from './manage/message.component';
import { CaStatusComponent } from './manage/ca-status.component';
import { PortalManageComponent } from './manage/portal-manage.component';
import { PowerManageComponent } from './manage/power-manage.component';
import { PortalListManageComponent } from './manage/portal-list-manage.component';
import { InfoComponent } from './record/info.component';
import { TradeComponent } from './record/trade.component';
import { FlowDetailComponent } from './flow/flow-detail.component';
import { FlowDetailRecordComponent } from './flow/flow-detail-record.component';
import { FlowDetailChartComponent } from './flow/flow-detail-chart.component';
import { FlowDetailLogsComponent } from './flow/flow-detail-logs.component';
import { FlowDetailDataComponent } from './flow/flow-detail-data.component';
import { WhiteListManageComponent } from './manage/white-list-manage.component';
import { ReportingListComponent } from './manage/reporting-list.component';
import { ReportFormListComponent } from './data/report-form-list.component';
import { ReportingDetailComponent } from './manage/reporting-detail.component';
import { ReportFormDetailComponent } from './data/report-form-detail.component';
import { HonourListComponent } from './manage/honour-list.component';
import { HonourFactoryListComponent } from './manage/honour-factory-list.component';
import { RegisterCompanyComponent } from './data/register-company.component';
import { InterestComponent } from './tools/interest.component';
import { ExportDataComponent } from './tools/export-data.component';
import { SelectChartComponent } from './tools/select-chart.component';
import { SelectBoxComponent } from './tools/select-box.component';
import { RiskComponent } from './tools/risk.component';
import { ModeModificationComponent } from './manage/mode-modification.component';
import { InvoiceSearchComponent } from './manage/invoice-search.component';
import { LvVankePublicComponent } from './manage/lv-vanke-public.component';
import { InvoiceShowListComponent } from './risk-control/risk-warning/invoice-show-list.component';
import { FinancingDetailComponent } from './risk-control/progress/financing-detail.component';
import { CapitalPoolIndexComponent } from './capital-pool/capital-pool-index.component';
import { ServiceFeeComponent } from './service-fee/service-fee.component';
import { ServiceFeePromisePayComponent } from './service-fee-promise-pay/service-fee-promise-pay.component';
import { TransferInfoComponent } from './record/transfer-info.component';
import { TransferAccountsComponent } from './record/transfer-accounts.component';
import { RegisterCodeInfoComponent } from './record/register-code-info.component';
import { RegisterCodeInfoViewComponent } from './record/register-code-info-view.component';
import { TransferAccountsViewComponent } from './record/transfer-accounts-view.component';
import { TransferInfoViewComponent } from './record/transfer-info-view.component';
import { PaymentComponent } from './manage/payment.component';
import { CaDetailComponent } from './manage/ca-detail.component';
import { DiscountManageComponent } from './bank/discount-manage/discount-manage.component';
import { FinancingManageComponent } from './bank/financing-manage/financing-manage.component';
import { BankRecordComponent } from './record/bank/record.component.component';
import { BankNewComponent } from './record/bank/new.component';
import { ProtocolManagementIndexComponent } from './bank-management/portocol-management/protocol-management-index.component';
import { PaymentNoticeIndexComponent } from './bank-management/payment-notice/payment-notice-index.component';
import { InvoicesIndexComponent } from './bank-management/invoices/invoices-index.component';
import { ClientIndexComponent } from './bank-management/clients/client-index.component';
import { ContractTemplateIndexComponent } from './vnake-mode/contract-template/contract-template-index.component';
import { ComfirmInformationIndexComponent } from './gemdale-mode/confirm-inforamtion-index.component';
import { ComfirmationSignComponent } from './gemdale-mode/confirmation-sign-component';
import { ReceiptListComponent } from './manage/receipt-list.component';
import { AdditionalMaterialsComponent } from './manage/additional-materials.component';
import { AccountingLoadComponent } from './vnake-mode/contract-template/accounting-load.component';
import { TransSupplementInfoComponent } from './gemdale-mode/trans-supplement-info-component';
import { InvoceSingleInfoComponent } from './invoceSearch/invoce-single-info-component';
import { InvoceSearchRecordComponent } from './invoceSearch/invoce-Search-component';
import { BankFormService } from './record/bank/bank.form.service';
import { AmountControlCommService } from './risk-control/transaction-control/amount/amount-control-comm.service';
import { RiskControlService } from './risk-control/risk-control.service';
import { AvengerSharedModule } from '../../avenger/shared/shared.module';

const COMPONENTS = [
    ConsoleHomeComponent,
    RecordComponent,
    NewComponent,
    EditComponent,
    BankEditComponent,
    ViewComponent,
    View2Component,
    MemoComponent,
    Contract3Component,
    Contract4Component,
    Contract5Component,
    Contract3MessageComponent,
    BlockchainHomeComponent,
    BlockchainDetailComponent,
    MainFlowComponent,
    BlocksComponent,
    EnsureComponent,
    DepositMessageComponent,
    LimitManageComponent,
    ApprovalConditionsComponent,
    LvManageComponent,
    BillTradeListComponent,
    BillReceiveListComponent,
    LvWanManageComponent,
    UserManageComponent,
    RoleManageComponent,
    InvoiceManageComponent,
    BankManageComponent,
    InvoicesManageComponent,
    LoadWordManageComponent,
    PlanManageComponent,
    MessageComponent,
    CaStatusComponent,
    PortalManageComponent,
    PowerManageComponent,
    PortalListManageComponent,
    InfoComponent,
    TradeComponent,
    FlowDetailComponent,
    FlowDetailRecordComponent,
    FlowDetailChartComponent,
    FlowDetailLogsComponent,
    FlowDetailDataComponent,
    // FlowDetailDataShowComponent,
    WhiteListManageComponent,
    ReportingListComponent,
    ReportFormListComponent,
    ReportingDetailComponent,
    ReportFormDetailComponent,
    HonourListComponent,
    HonourFactoryListComponent,
    RegisterCompanyComponent,
    InterestComponent,
    ExportDataComponent,
    SelectChartComponent,
    SelectBoxComponent,
    RiskComponent,
    ModeModificationComponent,
    InvoiceSearchComponent,
    LvVankePublicComponent,
    InvoiceShowListComponent, // 发票列表展示
    // 融资详情
    FinancingDetailComponent,
    CapitalPoolIndexComponent, // 资金池
    ServiceFeeComponent, // 平台服务费管理
    ServiceFeePromisePayComponent, // 保证付款服务管理

    TransferInfoComponent, // 出让信息
    TransferAccountsComponent, // 应收账款转让
    RegisterCodeInfoComponent, // 录入编码信息
    RegisterCodeInfoViewComponent,
    TransferAccountsViewComponent,
    TransferInfoViewComponent,

    PaymentComponent, // 付款管理

    CaDetailComponent, // 深圳ca详细信息

    DiscountManageComponent, // 银行保理保证
    FinancingManageComponent, // 保理融资管理

    BankRecordComponent,
    BankNewComponent,

    ProtocolManagementIndexComponent, // 定向保理支付
    PaymentNoticeIndexComponent,
    InvoicesIndexComponent,
    ClientIndexComponent,
    ContractTemplateIndexComponent, // vanke 合同管理
    ComfirmInformationIndexComponent, // 金地模式
    ComfirmationSignComponent, // 金地模式-集团公司签署付款确认书
    ReceiptListComponent, // 金地优化-项目公司批量签署回执,

    AdditionalMaterialsComponent,
    AccountingLoadComponent,
    TransSupplementInfoComponent,
    // 保理商补充标准保理交易保理到期日
    InvoceSingleInfoComponent, // 批量查询发票记录表
    InvoceSearchRecordComponent, // 详情发票记录
];

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        ConsoleRoutingModule,
        FactoringBusinessModule,
        PublicModule,
        DataModule,
        AvengerSharedModule,
    ],
    declarations: [...COMPONENTS],
    providers: [BankFormService, AmountControlCommService, RiskControlService]
})
export class ConsoleModule { }
