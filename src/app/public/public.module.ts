import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaterangepickerModule } from './directive/date-range-picker/date-range-picker.module';
import { DatePickerComponent } from './component/date-picker/date-picker.component';

import { XnInputComponent } from './form/xn-input.component';
import { XnInput1Component } from './form/xn-input1.component';
import { TextInputComponent } from './form/text-input.component';
import { EndInputComponent } from './form/end-input.component';
import { MoneyInputComponent } from './form/money-input.component';
import { CardInputComponent } from './form/card-input.component';
import { RadioInputComponent } from './form/radio-input.component';
import { RadioBillingTypeInputComponent } from './form/radio-billingType-input.component';
import { CheckboxInputComponent } from './form/checkbox-input.component';
import { SelectInputComponent } from './form/select-input.component';
import { MselectInputComponent } from './form/mselect-input.component';
import { FileInputComponent } from './form/file-input.component';
import { InvoiceInputComponent } from './form/invoice-input.component';
import { OrderInputComponent } from './form/order-input.component';
import { Order5InputComponent } from './form/order5-input.component';
import { MfileInputComponent } from './form/mfile-input.component';
import { PickerInputComponent } from './form/picker-input.component';
import { WselectInputComponent } from './form/wselect-input.component';
import { TextareaInputComponent } from './form/textarea-input.component';
import { ToArrayInputComponent } from './form/toArray-input.component';
import { ShowInputComponent } from './form/show-input.component';
import { SmsInputComponent } from './form/sms-input.component';
import { DselectInputComponent } from './form/dselect-input.component';
import { TselectInputComponent } from './form/tselect-input.component';
import { VkSelectInputComponent } from './form/vk-select-input.component';
import { VkSelect1InputComponent } from './form/vk-select1-input.component';
import { VkSelect2InputComponent } from './form/vk-select2-input.component';
import { DcheckboxInputComponent } from './form/dcheckbox-input.component';
import { ConditionsInputComponent } from './form/conditions-input.component';
import { PasswordInputComponent } from './form/password-input.component';
import { XnDatePipe } from './pipe/xn-date.pipe';
import { XnMoneyPipe } from './pipe/xn-money.pipe';
import { XnHtmlPipe } from './pipe/xn-html.pipe';
import { XnOrgPipe } from './pipe/xn-org.pipe';
import { XnInvoiceStatusPipe } from './pipe/xn-invoice-status.pipe';
import { XnDselectPipe } from './pipe/xn-dselect.pipe';
import { XnGatherTypePipe } from './pipe/xn-gather-type.pipe';
import { xnZhiyaPipe } from './pipe/xn-zhiya.pipe';
import { InvoiceTransferInputComponent } from './form/vanke/invoice-transfer-input';
import {XnJsonPipe} from './pipe/xn-json.pipe';
import {XnContractFilterPipe} from './pipe/xn-contract-filter.pipe';
import {XnLabelPipe} from './pipe/xn-label.pipe';
import {XnPayTypePipe} from './pipe/xn-pay-type.pipe';
import {XnSignerTypePipe} from './pipe/xn-signer-type.pipe';

import { XnZichanPipe } from './pipe/xn-zichan.pipe';
import { XnClassfyPipe } from './pipe/xn-classify.pipe';
import { XnPayPipe } from './pipe/xn-pay.pipe';
import { XnStorageTypePipe } from './pipe/xn-storage-type.pipe';
import { XnTradeStatusPipe } from './pipe/xn-trade-status.pipe';
import { XnTrade1StatusPipe } from './pipe/xn-trade1-status.pipe';
import { XnTrade2StatusPipe } from './pipe/xn-trade2-status.pipe';
import { XnTrade3StatusPipe } from './pipe/xn-trade3-status.pipe';
import { XnTypePipe } from './pipe/xn-type.pipe';
import { XnOperatorPipe } from './pipe/xn-operator.pipe';
import { XnInputShowPipe } from './pipe/xn-input-show.pipe';
import { DateInputComponent } from './form/date-input.component';
import { Date1InputComponent } from './form/date1-input.component';
import { DatetimeInputComponent } from './form/datetime-input.component';
import { Ng2Bs3ModalModule } from '../common/modal/ng2-bs3-modal';
import { InvoiceEditModalComponent } from './modal/invoice-edit-modal.component';
import { HtmlModalComponent } from './modal/html-modal.component';
import { HonourEditModalComponent } from './modal/honour-edit-modal.component';
import { HonourInputComponent } from './form/honour-input.component';
import { InvoiceViewModalComponent } from './modal/invoice-view-modal.component';
import { XnBcDataTypePipe } from './pipe/xn-bc-data-type.pipe';
import { XnProxyStatusPipe } from './pipe/xn-proxy-status.pipe';
import { HonourViewModalComponent } from './modal/honour-view-modal.component';
import { PlatformRateViewComponent } from './form/platform-rate-view.component';
import { FinancingFactoringModalComponent } from './modal/financing-factoring-modal.component';
import { PageComponent } from './component/page.component';
import { XnMainFlowStatusPipe } from './pipe/xn-main-flow-status.pipe';
import { XnDepositMainFlowStatusPipe } from './pipe/xn-main-flow-deposit-status.pipe';
import { HonourNewModalComponent } from './modal/honour-new-modal.component';
import { LoginModalComponent } from './modal/login-modal.component';
import { ContractNewModalComponent } from './modal/contract-new-modal.component';
import { GroupNewModalComponent } from './modal/group-new-modal.component';
import { ContractViewModalComponent } from './modal/contract-view-modal.component';
import { BillViewModalComponent } from './modal/bill-view-modal.component';
import { ContractEditModalComponent } from './modal/contract-edit-modal.component';
import { SupervisorEditModalComponent } from './modal/supervisor-edit-modal.component';
import { GroupEditModalComponent } from './modal/group-edit-modal.component';
import { Group5EditModalComponent } from './modal/group5-edit-modal.component';
import { GroupViewModalComponent } from './modal/group-view-modal.component';
import { Group5ViewModalComponent } from './modal/group5-view-modal.component';
import { SupervisorViewModalComponent } from './modal/supervisor-view-modal.component';
import { BillEditModalComponent } from './modal/bill-edit-modal.component';
import { ContractInputComponent } from './form/contract-input.component';
import { GroupInputComponent } from './form/group-input.component';
import { Group5InputComponent } from './form/group5-input.component';
import { FixedfileInputComponent } from './form/fixedfile-input.component';
import { SupervisorInputComponent } from './form/supervisor-input.component';
import { NumberInputComponent } from './form/number-input.component';
import { BillInputComponent } from './form/bill-input.component';
import { PdfSignModalComponent } from './modal/pdf-sign-modal.component';
import { UserEditModalComponent } from './modal/user-edit-modal.component';
import { WselectEditModalComponent } from './modal/wselect-edit-modal.component';
import { PowerEditModalComponent } from './modal/power-edit-modal.component';
import { HonourDetailModalComponent } from './modal/honour-detail-modal.component';
import { RegisterDetailComponent } from './modal/register-detail.component';
import { InvoiceFactoryEditModalComponent } from './modal/invoice-factory-edit-modal.component';
import { UserAddModalComponent } from './modal/user-add-modal.component';
import { UserDeleteModalComponent } from './modal/user-delete-modal.component';
import { AdminMoveModalComponent } from './modal/admin-move-modal.component';
import { WhiteListAddModalComponent } from './modal/white-list-add-modal.component';
import { AssetAddModalComponent } from './modal/asset-add-modal.component';
import { MapAddModalComponent } from './modal/map-add-modal.component';
import { WhiteListDeleteModalComponent } from './modal/white-list-delete-modal.component';
import { XnCaStatusPipe } from './pipe/xn-ca-status.pipe';
import { XnCaStepPipe } from './pipe/xn-ca-step.pipe';
import { ArticleAddModalComponent } from './modal/article-add-modal.component';
import { ArticleEditModalComponent } from './modal/article-edit-modal.component';
import { ArticleDeleteModalComponent } from './modal/article-delete-modal.component';
import { BankAddModalComponent } from './modal/bank-add-modal.component';
import { InvoicesAddModalComponent } from './modal/invoices-add-modal.component';
import { ReportExcelModalComponent } from './modal/report-excel-modal.component';
import { PlanAddModalComponent } from './modal/plan-add-modal.component';
import { ApprovalAddModalComponent } from './modal/approval-add-modal.component';
import { ApprovalEditModalComponent } from './modal/approval-edit-modal.component';
import { ApprovalReadModalComponent } from './modal/approval-read-modal.component';
import { ApprovalDeleteModalComponent } from './modal/approval-delete-modal.component';
import { PlanEditModalComponent } from './modal/plan-edit-modal.component';
import { PlanDeleteModalComponent } from './modal/plan-delete-modal.component';
import { InvoicesEditModalComponent } from './modal/invoices-edit-modal.component';
import { LoadwordEditModalComponent } from './modal/loadword-edit-modal.component';
import { LogDetailModalComponent } from './modal/log-detail-modal.component';
import { BankDeleteModalComponent } from './modal/bank-delete-modal.component';
import { InvoicesDeleteModalComponent } from './modal/invoices-delete-modal.component';
import { FileViewModalComponent } from './modal/file-view-modal.component';
import { LoginSelectModalComponent } from './modal/login-select-modal.component';
import { RegisterSubmitListModalComponent } from './modal/register-submit-list-modal.component';
import { FlowProcessComponent } from './flow/flow-process.component';
import { ShowViewModalComponent } from './modal/show-view-modal.component';
import { ShowPhotoModalComponent } from './modal/show-photo-modal.component';
import { RepaymentInputModalComponent } from './modal/repayment-input-modal.component';
import { BuildXmlModalComponent } from './modal/build-xml-modal.component';
import { CommListComponent } from './component/comm-list.component';
import { BankCardAddComponent } from './component/bank-card-add.component';
import { BankCardEditComponent } from './component/bank-card-edit.component';
import { DescEditModalComponent } from './modal/desc-edit-modal.component';
import { CommAddComponent } from './component/comm-add.component';
import { CommDetailComponent } from './component/comm-detail.component';
import { CommEditComponent } from './component/comm-edit.component';
import { QuantumInputComponent } from './form/quantum-input.component';
import { Quantum1InputComponent } from './form/quantum1-input.component';
import { InputSwitchComponent } from './form/input-switch.component';
import { Date2InputComponent } from './form/date2-input.component';
import { EnterSelectInputComponent } from './form/enter-select-input.component';
import { XnFilterTextPipe } from './pipe/xn-filter-text.pipe';
import { TextIconInputComponent } from './form/text-icon-input.component';
import { XnFilterRowPipe } from './pipe/xn-filter-row.pipe';
import { XnBrPipe } from './pipe/xn-br.pipe';
import { DataContentComponent } from './form/data-content.component';
import { ContractVankeInputComponent } from './form/contract-vanke-input.component';
import { ContractVankeNewModalComponent } from './modal/contract-vanke-new-modal.component';
import { InvoiceVankeInputComponent } from './form/invoice-vanke-input.component';
import { VankeAuditStandardModalComponent } from './modal/audit-standard-modal.component';

import { ContractVankeEditModalComponent } from './modal/contract-vanke-edit-modal.component';

import { AssignorInfoComponent } from './form/assignor-info.component';
import { ContractVankeOfficeInputComponent } from './form/contract-vanke-office-input.component';
import { FinancingFactoringVankeModalComponent } from './modal/financing-factoring-vanke-modal.component';
import { InvoiceVankePreInputComponent } from './form/invoice-vanke-pre-input.component';
import { XnFilterDonePipe } from './pipe/xn-filter-done.pipe';
import { InvoiceVankeEditModalComponent } from './modal/invoice-vanke-edit-modal.component';


import { QrcodeViewModalComponent } from './modal/qrcode-view-modal.component';
import { XnSelectTransformPipe } from './pipe/xn-select-transform.pipe';
import { XnSelectDeepTransformPipe } from './pipe/xn-select-deep.pipe';
import { RatesDateStartModalComponent } from './modal/rates-date-start-modal.component';
import { RatesPreModalComponent } from './modal/rates-pre-modal.component';
import { DateInputDayComponent } from './component/date-input.component';
import { XnMoneyCNPipe } from './pipe/xn-money-CN.pipe';
import { InputMaskDirective } from './directive/input-mask';

import { FlowProcess1Component } from './flow/flow-process-1.component';
import { FlowProcess3Component } from './flow/flow-process-3.component';
import { FlowProcess6Component } from './flow/flow-process-6.component';
import { FlowProcess7Component } from './flow/flow-process-7.component';
import { FlowProcess0Component } from './flow/flow-process-0.component';
import { FeeComponent } from './form/fee.component';
import { FeePromisePayComponent } from './form/fee-promise-pay.component';
import { FeeBankFinancingComponent } from './form/fee-bank-financing.component';
import { FeeBankDiscountComponent } from './form/fee-bank-discount.component';
import { BankListComponent } from './form/bank-list.component';
import { FactoringListComponent } from './form/factoring-list.component';
import { BankHonourNewModalComponent } from './form/bank/honour-new-modal.component';
import { BankHonourInputComponent } from './form/bank/honour-input.component';
import { BankContractInputComponent } from './form/bank/contract-input.component';
import { BankContractNewModalComponent } from './form/bank/contract-new-modal.component';
import { BankInvoiceInputComponent } from './form/bank/invoice-input.component';
import { BankInvoiceNewModalComponent } from './form/bank/invoice-new-modal.component';
import { BankHonourViewModalComponent } from './form/bank/honour-view-modal.component';
import { BankContractViewModalComponent } from './form/bank/contract-view-modal.component';
import { BankInvoiceViewModalComponent } from './form/bank/invoice-view-modal.component';
import { FileConsistencyComponent } from './form/bank/file-consistency.component';
import { FileLogicalComponent } from './form/bank/file-logical.component';
import { SignContractsComponent } from './form/bank/sign-contracts.component';
import { SignContractsModalComponent } from './form/bank/sign-contracts-modal.component';
import { ScanFileComponent } from './form/bank/scan-file.component';
import { BackFileComponent } from './form/bank/mfile-input-back-file.component';
import { BankSelectInputComponent } from './form/bank/bank-select-input.component';


import { HwExcelInputComponent } from './form/hw-mode/hw-excel-input.component';
import { EditSelectInputComponent } from './form/hw-mode/edit-select-input.component';
import { CalculateServiceFeeComponent } from './form/bank/calculate-service-fee.component';
import { BankCardSingleInputComponent } from './form/hw-mode/bank-card-single-input.component';
import { THeadFixedComponent } from './form/thead-fixed.component';
import { MfileViewInputComponent } from './form/mfile-view-input.component';
import { BankCardAddModalComponent } from './modal/bank-card-add-modal.component';
import { FlowProcess11Component } from './flow/flow-process-11.component';
import { FileEditInput1Component } from './form/hw-mode/file-edit-input1.component';
import { FileEditInput1ModalComponent } from './form/hw-mode/modal/file-edit-input1-modal.component';
import { FlowProcess12Component } from './flow/flow-process-12.component';
import { FlowProcess13Component } from './flow/flow-process-13.component';
import { FlowProcess14Component } from './flow/flow-process-14.component';
import { InfoChangeComponent } from './form/hw-mode/info-change.component';
import { Select1InputComponent } from './form/hw-mode/select1-input.component';
import { DataContent1Component } from './form/data-content1.component';
import { AccountsReceivableComponent } from './form/hw-mode/accounts-receivable.component';
import { NewFileModalComponent } from './form/hw-mode/modal/new-file-modal.component';
import { SupplementFileModalComponent } from './form/hw-mode/modal/supplement-file.modal.component';
import { PayBackInputModalComponent } from './form/hw-mode/modal/pay-back-input-modal.component';
import { AccountsReceivable1Component } from './form/hw-mode/accounts-receivable1.component';
import { BankCardSingleInput1Component } from './form/hw-mode/bank-card-single-input1.component';
import { Date3InputComponent } from './form/date3-input.component';
import { XnCardPipe } from './pipe/xn-card.pipe';
import { XnCurrencyValue } from './pipe/xn-currency-value.pipe';
import { XnCurrencyChinese } from './pipe/xn-currency-chinese.pipe';
import { FlowProcess5Component } from './flow/flow-process-5.component';

import { DataViewModalComponent } from './modal/data-view-modal.component';
import { FlowDetailDataShowComponent } from '../pages/console/flow/flow-detail-data-show.component';
import { InstitutionalReviewListComponent } from './component/institutional-review-list.component';
import { FileEditInput2Component } from './form/hw-mode/file-edit-input2.component';
import { ContractEdit1ModalComponent } from './modal/contract-edit1-modal.component';
import { ContractView1ModalComponent } from './modal/contract-view1-modal.component';
import { AuditCriteriaModalComponent } from './form/hw-mode/modal/audit-criteria-modal.component';
import { CapitalPoolAlertRatioModalComponent } from './modal/capital-pool-alert-ratio-modal.component';
import { PaginationModule } from './component/pagination/pagination.module';
import { CapitalPoolNameModalComponent } from './modal/capital-pool-name-modal.component';
import { MultiplePickerInputComponent } from './form/vanke/multiple-picker-input.component';
import { MultiplePickerModalComponent } from './form/vanke/multiple-picker-modal.component';
import { DownFileTableInputComponent } from './form/vanke/down-file-table-input.component';
import { EditInfoModalComponent } from './component/edit-info-modal.component';
import { UploadPaymentInputComponent } from './form/vanke/upload-payment-input.component';
import { ManagerInformationInputComponent } from './form/vanke/manager-information-input.component';
import { InvoiceReplaceInputComponent } from './form/invoice-replace-input.component';
import { XnInvoiceStatus1Pipe } from './pipe/xn-invoice-status1.pipe';
import { InvoiceReplaceViewModalComponent } from './form/hw-mode/modal/invoice-replace-view-modal.component';
import { InvoiceSearchCompanyModalComponent } from './form/hw-mode/modal/invoice-search-company-modal.component';

import { CapitalPoolIntermediaryAgencyModalComponent } from './modal/capital-pool-intermediary-agency-modal.component';

import { DataContent3Component } from './form/data-content3.component';
import { ContractHwInputComponent } from './form/hw-mode/contract-hw-input.component';
import { ContractHwNewModalComponent } from './form/hw-mode/modal/contract-hw-new-modal.component';
import { UploadFileTableInputComponent } from './form/vanke/upload-file-table-input.component';
import { HeadquartersSelectInputComponent } from './form/headquarters-select-input.component';
import { Fixedfile1InputComponent } from './form/fixedfile1-input.component';
import { ArrayTruncatePipe } from './pipe/xn-array-trancat.pipe';

import { XnStockTypePipe } from './pipe/xn-stock-type.pipe';
import { XnStoreTypePipe } from './pipe/xn-store-type.pipe';
import { XnTextPipe } from '../pages/console/risk-control/pipe/xn-text.pipe';
import { SearchListComponent } from './component/search-list.component';
import { XnEnumSelectItemPipe } from '../pages/console/risk-control/pipe/xn-enum-selectItem.pipe';
import { XnPercentPipe } from '../pages/console/risk-control/pipe/xn-percent.pipe';
import { XnInputWindComponent } from './form/xn-input-wind.component';
import { DateInputWindComponent } from './form/date-input-wind.component';
import { TextInputWindComponent } from './form/text-input-wind.component';
import { SelectInputWindComponent } from './form/select-input-wind.component';
import { DselectInputWindComponent } from './form/dselect-input-wind.component';
import { XnSelectItemPipe } from '../pages/console/risk-control/pipe/xn-selectItem.pipe';
import { MultistageSelectInputComponent } from './form/multistage-select-input.component';
import { MultistageSelectInput1Component } from './form/multistage-select-input1.component';
import { XnArrayPipe } from './pipe/xn-array.pipe';
import { ArrayListToStringPipe } from './pipe/xn-arraylist-tostring.pipe';
import { XnUseQuotaStatusPipe } from './pipe/xn-use-quota-status.pipe';
import { InvoiceDataViewModalComponent } from './modal/invoice-data-view-modal.component';
import { MflowInputComponent } from './form/mflow-input.component';
import { MoneyMaskDirective } from './directive/money-mask';
import { ContractVankeInput1Component } from './form/contract-vanke-input1.component';
import { FlowProcessUploadBaseComponent } from './flow/flow-process-upload-base.component';
import { DownloadAttachmentsmodalComponent } from './modal/download-attachmentsmodal.component';
import { GeneratingContractModalComponent } from './modal/generating-contract-modal.component';
import { GeneratingContractStampModalComponent } from './modal/generating-contract-stamp-modal.component';
import { ExportListModalComponent } from './modal/export-list-modal.component';
import { ExportListModal01Component } from './modal/export-list-modal01.component';
import { BulkUploadModalComponent } from './modal/bulk-upload-modal.component';
import { XnPushTypePipe } from './pipe/xn-push-type.pipe';
import { ReceiptListVkComponent } from '../pages/console/manage/receipt-list-vk.component';
import { LinkageSelectInputComponent } from './form/linkage-select-input.component';
import { SupplierUnsignedContractComponent } from '../pages/console/manage/supplier-unsigned-contract.component';
import { StorageRackSelectInputComponent } from './form/storage-rack-select-input.component';
import { DateInputNullComponent } from './form/date-input-null.component';
import { PerformanceInputComponent } from './form/performance-input.component';
import { ContractVankeSupplementModalComponent } from './modal/contract-vanke-supplement-modal.component';
import { MoneyControlInputComponent } from './form/money-control-input.component';
import { DateInputControlNullComponent } from './form/date-input-control-null.component';

import { InvoiceDirectionViewModalComponent } from './modal/invoice-direction-view-modal.component';
import { XnSafeResourcePipe } from './pipe/xn-safe-resource.pipe';
import { ContractFilesViewModalComponent } from './modal/contract-files-view-modal.component';
import { VankeYjlSupplierSignComponent } from '../pages/console/vnake-mode/vanke-yjl-supplier-sign.component';
import { YajvleSignContractComponent } from '../pages/console/vnake-mode/yajvle-sign-contract.component';
import { ContractComponent } from '../pages/console/record/contract.component';
import { XnRegisterStatusPipe } from './pipe/xn-register-status.pipe';
import { InputTableComponent } from './form/avenger/xn-input-tabel.component'; // 客户管理表单引入
import { XnStringToArrayPipe } from './pipe/xn-string-to-array-trancat.pipe';
import { MfilesViewModalComponent } from './modal/mfiles-view-modal.component';
import { MultipleSelectInputComponent } from './form/hw-mode/multiple-select-input.component';
import { CustomerWhiteStatusModalComponent } from './form/avenger/customer-whiteStatus.modal.component';
import { CheckFormInputComponent } from './form/avenger/xn-check-form-input.component';
import { GuarantReportComponent } from './form/avenger/guarant-report.component';
import { GuarantEarningFormComponent } from './form/avenger/guarant-earningForm-table.component';
import { EditTableComponent } from './component/edit-table.component';
import { UploadTableInputComponent } from './form/financial-report-info/upload-table-input.component';
import { AssetsTableInputComponent } from './form/financial-report-info/assets-table-input-component';
import { OpponentModalComponent } from '../pages/console/risk-control/survey/opponent-modal.component';
import { BankCreditModalComponent } from '../pages/console/risk-control/survey/bank-credit-modal.component';
import { InfoDetailModalComponent } from '../pages/console/risk-control/survey/info-detail-modal.component';
import { HouseHoldStaffModel } from '../pages/console/risk-control/progress/progress-in-houseHold-pop-staff.component';
import {
    EnterpriseContractModalComponent
} from '../pages/console/risk-control/transaction-control/contract/enterprise-contract-modal.component';
import {
    EnterpriseTransactionControlModalComponent
} from '../pages/console/risk-control/transaction-control/transaction/enterprise-transaction-control-modal.component';
import { ProfitTableInputComponent } from './form/financial-report-info/profit-table-input.component';
import { CashTableInputComponent } from './form/financial-report-info/cash-table-input.component';
import { XnPercentagePipe } from './pipe/xn-percentage.pipe';
import { AvengerInterestComponent } from './form/vanke/avenger-interest.component';

import { InvoiceDisplayDetailComponent } from './component/invoice-display-detail.component';

// 资产池
import { CapitalPoolCommListComponent } from './component/capital-pool-comm-list.component';
import { QrcodeComponent } from './custom/qrcode.component';

// 定向保理支付
import { AccountReceiptListComponent } from './component/account-receipt-list.component';
import { InvoiceReplaceComponent } from './form/hw-mode/invoice-replace.component';
import { InvoiceReplaceRecordComponent } from './form/hw-mode/invoice-replace-record.component';
import { HomeCommListComponent } from './component/home-comm-list.component';
import { CapitalPoolUnhandledListComponent } from './component/capital-pool-unhandled-list.component';
import { CompanyDetailUploadComponent } from './form/vanke/company-detail-upload.component';
import { CommonMfileInputComponent } from './form/vanke/mfile-changeinput.component';
import { BusinessDetailComponent } from './modal/businessLicense-view-modal.component';
import { XnTabsComponent } from './component/tabs/tabs.component';
import { TooltipModule } from './directive/tooltip/tooltip.module';
import { VankeTypeSelectInputComponent } from './form/vanke/vanke-input-chose.component';
import { XntransFer } from './pipe/xn-transfer.pipes';
import { DragonPageComponent } from './component/newpage.component';
import { VankeViewContractModalComponent } from './modal/contract-vanke-mfile-detail.modal';
import { Date4InputComponent } from './form/date4-input.component';
import { VankeModelId } from '../modules/dragon/pipe/vanke-modeld.pipe';
/**
 *  组件
 */
const CONST_COMPONENTS = [
    DatePickerComponent,
    InvoiceDisplayDetailComponent,
    CapitalPoolCommListComponent,
    QrcodeComponent,
    AccountReceiptListComponent,
    InvoiceReplaceComponent,
    InvoiceReplaceRecordComponent,
    HomeCommListComponent,
    CapitalPoolUnhandledListComponent,

    CheckFormInputComponent,
    GuarantReportComponent,
    GuarantEarningFormComponent,
    InputTableComponent,
    XnInputComponent,
    XnInput1Component,
    TextInputComponent,
    TextIconInputComponent,
    EndInputComponent,
    MoneyInputComponent,
    CardInputComponent,
    RadioInputComponent,
    RadioBillingTypeInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,
    MselectInputComponent,
    FileInputComponent,
    HonourInputComponent,
    BankHonourInputComponent,
    InvoiceInputComponent,
    BankInvoiceInputComponent,
    OrderInputComponent,
    Order5InputComponent,
    MfileInputComponent,
    MfileViewInputComponent,
    PickerInputComponent,
    WselectInputComponent,
    TextareaInputComponent,
    ToArrayInputComponent,
    ShowInputComponent,
    SmsInputComponent,
    DselectInputComponent,
    TselectInputComponent,
    VkSelectInputComponent,
    VkSelect1InputComponent,
    VkSelect2InputComponent,
    DcheckboxInputComponent,
    ConditionsInputComponent,
    PasswordInputComponent,
    DateInputComponent,
    Date2InputComponent,
    Date1InputComponent,
    Date3InputComponent,
    Date4InputComponent,
    DatetimeInputComponent,
    ArrayTruncatePipe,
    XnDatePipe,
    VankeModelId,
    XnEnumSelectItemPipe,
    XnTextPipe,
    XnFilterRowPipe,
    XnMoneyPipe,
    XnPushTypePipe,
    XnHtmlPipe,
    XnArrayPipe,
    XnCurrencyValue,
    XnCurrencyChinese,
    XnJsonPipe,
    XnContractFilterPipe,
    XnLabelPipe,
    XnOrgPipe,
    XnInvoiceStatusPipe,
    XnDselectPipe,
    XnFilterDonePipe,
    XnGatherTypePipe,
    xnZhiyaPipe,
    XnPayTypePipe,
    XnPercentagePipe,
    XnZichanPipe,
    XnClassfyPipe,
    XnPayPipe,
    XnStoreTypePipe,
    XnSignerTypePipe,
    XnStockTypePipe,
    XnStorageTypePipe,
    XnTradeStatusPipe,
    XnTrade1StatusPipe,
    XnTrade2StatusPipe,
    XnTrade3StatusPipe,
    XnTypePipe,
    XnCardPipe,
    XnRegisterStatusPipe,
    XnSafeResourcePipe,
    XnOperatorPipe,
    XnInputShowPipe,
    XnStringToArrayPipe,
    PlatformRateViewComponent,
    XnBcDataTypePipe,
    XnProxyStatusPipe,
    XnInvoiceStatus1Pipe,
    XnUseQuotaStatusPipe,
    PageComponent,
    DragonPageComponent,
    XnMainFlowStatusPipe,
    XnDepositMainFlowStatusPipe,
    ContractInputComponent,
    BankContractInputComponent,
    GroupInputComponent,
    Group5InputComponent,
    FixedfileInputComponent,
    Fixedfile1InputComponent,
    SupervisorInputComponent,
    NumberInputComponent,
    BillInputComponent,
    AssignorInfoComponent,
    XnCaStepPipe,
    XnCaStatusPipe,
    XnBrPipe,
    XnFilterTextPipe,
    XnPercentPipe,
    XnSelectItemPipe,
    FlowProcessComponent,
    FlowProcess0Component,
    FlowProcess1Component,
    FlowProcess3Component,
    FlowProcess6Component,

    FlowProcess7Component,
    CommListComponent,
    CommAddComponent,
    CommDetailComponent,
    CommEditComponent,
    QuantumInputComponent,
    Quantum1InputComponent,
    InputSwitchComponent,
    // 可编辑下拉选项框
    EnterSelectInputComponent,
    DataContentComponent,
    DataContent3Component,
    ContractVankeInputComponent,
    ContractVankeOfficeInputComponent,
    InvoiceVankePreInputComponent,

    XnSelectTransformPipe,
    XnSelectDeepTransformPipe,
    DateInputDayComponent,
    XnMoneyCNPipe,
    InputMaskDirective,
    MoneyMaskDirective,

    FeeComponent,
    FeePromisePayComponent,
    FeeBankDiscountComponent,
    FeeBankFinancingComponent,
    BankListComponent,
    FactoringListComponent,
    FileConsistencyComponent,
    FileLogicalComponent,
    SignContractsComponent,
    ScanFileComponent,
    BackFileComponent,
    BankSelectInputComponent,
    HwExcelInputComponent,
    EditSelectInputComponent,
    BankCardSingleInputComponent,
    THeadFixedComponent,
    FlowProcess5Component,
    FlowProcess11Component,
    FileEditInput1Component,
    FlowProcess12Component,
    FlowProcess13Component,
    FlowProcess14Component,
    FlowProcessUploadBaseComponent,
    InfoChangeComponent,
    Select1InputComponent,
    DataContent1Component,
    AccountsReceivableComponent, // 应收账款证明
    AccountsReceivable1Component,
    BankCardSingleInput1Component,

    InstitutionalReviewListComponent,
    FileEditInput2Component,
    MultiplePickerInputComponent,
    DownFileTableInputComponent,
    UploadFileTableInputComponent,
    UploadPaymentInputComponent,
    ContractHwInputComponent,
    ManagerInformationInputComponent,
    CompanyDetailUploadComponent,
    InvoiceReplaceInputComponent,
    CommonMfileInputComponent,
    SearchListComponent,
    XnInputWindComponent,
    DateInputWindComponent,
    TextInputWindComponent,
    SelectInputWindComponent,
    DselectInputWindComponent,
    MultistageSelectInputComponent,
    MultistageSelectInput1Component,
    MflowInputComponent,
    ReceiptListVkComponent,
    LinkageSelectInputComponent,
    StorageRackSelectInputComponent,
    DateInputNullComponent,
    PerformanceInputComponent,
    MoneyControlInputComponent,
    DateInputControlNullComponent,
    MultipleSelectInputComponent,
    VankeYjlSupplierSignComponent, // todo 雅居乐 供应商补充协议 [暂时存在]
    YajvleSignContractComponent,
    ContractComponent,
    UploadTableInputComponent,
    AssetsTableInputComponent,
    CashTableInputComponent,
    ProfitTableInputComponent,
    InvoiceTransferInputComponent,

    XnTabsComponent,
];
/**
 *  module
 */
const EXPORT_MODULES = [
    CommonModule,
    RouterModule, // 要引入RouterModule，才能让本Module的组件有routerLink功能
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule,
    PaginationModule,
    DaterangepickerModule,
    TooltipModule,
];

/**
 * 动态组建-模态框
 */
const ENTRY_COMPONENTS = [
    EditTableComponent,
    InvoiceReplaceViewModalComponent,
    InvoiceEditModalComponent,
    InvoiceDataViewModalComponent,
    HtmlModalComponent,
    HonourEditModalComponent,
    InvoiceViewModalComponent,
    HonourViewModalComponent,
    FileViewModalComponent,
    DataViewModalComponent,
    FlowDetailDataShowComponent,
    ShowViewModalComponent,
    ShowPhotoModalComponent,
    FinancingFactoringModalComponent,
    UserEditModalComponent,
    WselectEditModalComponent,
    PowerEditModalComponent,
    QrcodeViewModalComponent,
    HonourDetailModalComponent,
    RegisterDetailComponent,
    InvoiceFactoryEditModalComponent,
    UserAddModalComponent,
    WhiteListAddModalComponent,
    AssetAddModalComponent,
    MapAddModalComponent,
    WhiteListDeleteModalComponent,
    ArticleAddModalComponent,
    ArticleEditModalComponent,
    ArticleDeleteModalComponent,
    UserDeleteModalComponent,
    AdminMoveModalComponent,
    BankAddModalComponent,
    InvoicesAddModalComponent,
    BankInvoiceNewModalComponent,
    ReportExcelModalComponent,
    PlanAddModalComponent,
    ApprovalAddModalComponent,
    ApprovalEditModalComponent,
    ApprovalReadModalComponent,
    ApprovalDeleteModalComponent,
    PlanDeleteModalComponent,
    PlanEditModalComponent,
    InvoicesEditModalComponent,
    LoadwordEditModalComponent,
    LogDetailModalComponent,
    BankDeleteModalComponent,
    InvoicesDeleteModalComponent,
    HonourNewModalComponent,
    BankHonourNewModalComponent,
    LoginModalComponent,
    ContractNewModalComponent,
    BankContractNewModalComponent,
    GroupNewModalComponent,
    ContractViewModalComponent,
    BillViewModalComponent,
    ContractEditModalComponent,
    SupervisorEditModalComponent,
    GroupEditModalComponent,
    Group5EditModalComponent,
    GroupViewModalComponent,
    Group5ViewModalComponent,
    SupervisorViewModalComponent,
    BillEditModalComponent,
    PdfSignModalComponent,
    LoginSelectModalComponent,
    RegisterSubmitListModalComponent,
    RepaymentInputModalComponent,
    BuildXmlModalComponent,
    ContractVankeNewModalComponent,
    VankeAuditStandardModalComponent,
    InvoiceVankeInputComponent,
    ContractVankeEditModalComponent,
    FinancingFactoringVankeModalComponent,
    ContractFilesViewModalComponent,
    InvoiceVankeEditModalComponent,
    RatesDateStartModalComponent,
    RatesPreModalComponent,
    EditInfoModalComponent,
    BankHonourViewModalComponent,
    BankContractViewModalComponent,
    BankInvoiceViewModalComponent,
    SignContractsModalComponent,
    CalculateServiceFeeComponent,
    BankCardAddModalComponent,
    BankCardAddComponent,
    BankCardEditComponent,
    DescEditModalComponent,
    DownloadAttachmentsmodalComponent,
    FileEditInput1ModalComponent,
    NewFileModalComponent,
    SupplementFileModalComponent,
    PayBackInputModalComponent,
    ContractEdit1ModalComponent,
    ContractView1ModalComponent,
    AuditCriteriaModalComponent, // 两票一同，保理商初审-审核标准
    CapitalPoolNameModalComponent,
    CapitalPoolAlertRatioModalComponent,
    CapitalPoolIntermediaryAgencyModalComponent,
    MultiplePickerModalComponent,
    ContractHwNewModalComponent,
    HeadquartersSelectInputComponent,
    ContractVankeInput1Component,
    GeneratingContractModalComponent,
    GeneratingContractStampModalComponent,
    ExportListModalComponent,
    ExportListModal01Component,
    BulkUploadModalComponent,
    SupplierUnsignedContractComponent,
    ContractVankeSupplementModalComponent,
    MfilesViewModalComponent,
    InvoiceDirectionViewModalComponent,
    InvoiceSearchCompanyModalComponent,
    CustomerWhiteStatusModalComponent,
    InvoiceTransferInputComponent,
    AvengerInterestComponent,
    BusinessDetailComponent,
    VankeViewContractModalComponent


];

/**
 * 保理风控-模态框
 */
const EXPORT_RISK_ENTRY_COMPONENT_MODAL = [
    OpponentModalComponent,
    BankCreditModalComponent,
    InfoDetailModalComponent,
    HouseHoldStaffModel,
    EnterpriseContractModalComponent,
    EnterpriseTransactionControlModalComponent
];


// @ts-ignore
@NgModule({
    imports: [
        ...EXPORT_MODULES
    ],
    declarations: [
        ...CONST_COMPONENTS,
        ...ENTRY_COMPONENTS,
        ...EXPORT_RISK_ENTRY_COMPONENT_MODAL,
        VankeTypeSelectInputComponent,
        XnInputComponent,
        XnInput1Component,
        TextInputComponent,
        TextIconInputComponent,
        EndInputComponent,
        MoneyInputComponent,
        CardInputComponent,
        RadioInputComponent,
        RadioBillingTypeInputComponent,
        CheckboxInputComponent,
        SelectInputComponent,
        MselectInputComponent,
        FileInputComponent,
        HonourInputComponent,
        BankHonourInputComponent,
        BankHonourViewModalComponent,
        InvoiceInputComponent,
        BankInvoiceInputComponent,
        BankContractViewModalComponent,
        OrderInputComponent,
        Order5InputComponent,
        MfileInputComponent,
        MfileViewInputComponent,
        PickerInputComponent,
        WselectInputComponent,
        TextareaInputComponent,
        ToArrayInputComponent,
        ShowInputComponent,
        SmsInputComponent,
        DselectInputComponent,
        TselectInputComponent,
        VkSelectInputComponent,
        VkSelect1InputComponent,
        VkSelect2InputComponent,
        DcheckboxInputComponent,
        ConditionsInputComponent,
        PasswordInputComponent,
        DateInputComponent,
        Date2InputComponent,
        Date1InputComponent,
        Date3InputComponent,
        Date4InputComponent,
        DatetimeInputComponent,
        ArrayTruncatePipe,
        XnDatePipe,
        VankeModelId,
        XnEnumSelectItemPipe,
        XnTextPipe,
        XnFilterRowPipe,
        XnMoneyPipe,
        XnPushTypePipe,
        XnHtmlPipe,
        XnArrayPipe,
        ArrayListToStringPipe,
        XnJsonPipe,
        XnContractFilterPipe,
        XnLabelPipe,
        XnOrgPipe,
        XnInvoiceStatusPipe,
        XnDselectPipe,
        XnFilterDonePipe,
        XnGatherTypePipe,
        xnZhiyaPipe,
        XnPayTypePipe,
        XnZichanPipe,
        XnClassfyPipe,
        XnPayPipe,
        XnStoreTypePipe,
        XnStockTypePipe,
        XnStorageTypePipe,
        XnTradeStatusPipe,
        XnTrade1StatusPipe,
        XnTrade2StatusPipe,
        XnTypePipe,
        XntransFer,
        XnCardPipe,
        XnRegisterStatusPipe,
        XnSafeResourcePipe,
        XnOperatorPipe,
        XnInputShowPipe,
        XnStringToArrayPipe,
        InvoiceEditModalComponent,
        InvoiceDataViewModalComponent,
        HtmlModalComponent,
        HonourEditModalComponent,
        InvoiceViewModalComponent,
        HonourViewModalComponent,
        FileViewModalComponent,
        DataViewModalComponent,
        FlowDetailDataShowComponent,
        ShowViewModalComponent,
        ShowPhotoModalComponent,
        PlatformRateViewComponent,
        XnBcDataTypePipe,
        XnProxyStatusPipe,
        XnInvoiceStatus1Pipe,
        XnUseQuotaStatusPipe,
        FinancingFactoringModalComponent,
        PageComponent,
        DragonPageComponent,
        XnMainFlowStatusPipe,
        XnDepositMainFlowStatusPipe,
        UserEditModalComponent,
        WselectEditModalComponent,
        PowerEditModalComponent,
        HonourDetailModalComponent,
        RegisterDetailComponent,
        InvoiceFactoryEditModalComponent,
        UserAddModalComponent,
        WhiteListAddModalComponent,
        AssetAddModalComponent,
        MapAddModalComponent,
        WhiteListDeleteModalComponent,
        ArticleAddModalComponent,
        ArticleEditModalComponent,
        ArticleDeleteModalComponent,
        UserDeleteModalComponent,
        AdminMoveModalComponent,
        BankAddModalComponent,
        InvoicesAddModalComponent,
        ReportExcelModalComponent,
        PlanAddModalComponent,
        ApprovalAddModalComponent,
        ApprovalEditModalComponent,
        ApprovalReadModalComponent,
        ApprovalDeleteModalComponent,
        PlanDeleteModalComponent,
        PlanEditModalComponent,
        InvoicesEditModalComponent,
        BankInvoiceNewModalComponent,
        LoadwordEditModalComponent,
        LogDetailModalComponent,
        BankDeleteModalComponent,
        InvoicesDeleteModalComponent,
        HonourNewModalComponent,
        BankHonourNewModalComponent,
        LoginModalComponent,
        ContractNewModalComponent,
        BankContractNewModalComponent,
        GroupNewModalComponent,
        ContractViewModalComponent,
        BillViewModalComponent,
        ContractEditModalComponent,
        SupervisorEditModalComponent,
        GroupEditModalComponent,
        Group5EditModalComponent,
        GroupViewModalComponent,
        Group5ViewModalComponent,
        SupervisorViewModalComponent,
        BillEditModalComponent,
        ContractInputComponent,
        BankContractInputComponent,
        GroupInputComponent,
        Group5InputComponent,
        FixedfileInputComponent,
        Fixedfile1InputComponent,
        SupervisorInputComponent,
        NumberInputComponent,
        BillInputComponent,
        AssignorInfoComponent,
        PdfSignModalComponent,
        XnCaStepPipe,
        XnCaStatusPipe,
        XnBrPipe,
        XnFilterTextPipe,
        XnPercentPipe,
        XnSelectItemPipe,
        LoginSelectModalComponent,
        RegisterSubmitListModalComponent,
        FlowProcessComponent,
        FlowProcess0Component,
        FlowProcess1Component,
        FlowProcess3Component,
        FlowProcess6Component,

        FlowProcess7Component,
        InvoiceReplaceViewModalComponent,
        InvoiceSearchCompanyModalComponent,
        RepaymentInputModalComponent,
        BuildXmlModalComponent,
        CommListComponent,
        CommAddComponent,
        CommDetailComponent,
        CommEditComponent,
        QuantumInputComponent,
        Quantum1InputComponent,
        InputSwitchComponent,
        // 可编辑下拉选项框
        EnterSelectInputComponent,
        DataContentComponent,
        DataContent3Component,
        ContractVankeInputComponent,
        ContractVankeInput1Component,
        ContractVankeNewModalComponent,
        VankeAuditStandardModalComponent,
        InvoiceVankeInputComponent,
        InvoiceTransferInputComponent,
        ContractVankeEditModalComponent,
        ContractVankeOfficeInputComponent,
        FinancingFactoringVankeModalComponent,
        InvoiceVankePreInputComponent,
        ContractFilesViewModalComponent,
        InvoiceVankeEditModalComponent,
        VankeViewContractModalComponent,

        QrcodeViewModalComponent,
        XnSelectTransformPipe,
        XnSelectDeepTransformPipe,
        RatesDateStartModalComponent,
        RatesPreModalComponent,
        DateInputDayComponent,
        XnMoneyCNPipe,
        InputMaskDirective,
        MoneyMaskDirective,

        FeeComponent,
        FeePromisePayComponent,
        FeeBankDiscountComponent,
        FeeBankFinancingComponent,
        BankListComponent,
        FactoringListComponent,
        BankInvoiceViewModalComponent,
        FileConsistencyComponent,
        FileLogicalComponent,
        SignContractsComponent,
        SignContractsModalComponent,
        ScanFileComponent,
        BackFileComponent,
        BankSelectInputComponent,
        HwExcelInputComponent,
        EditSelectInputComponent,
        CalculateServiceFeeComponent,
        BankCardSingleInputComponent,
        THeadFixedComponent,
        BankCardAddModalComponent, // 添加银行卡信息-资产池
        DownloadAttachmentsmodalComponent,
        FlowProcess5Component,
        FlowProcess11Component,
        FileEditInput1Component,
        FileEditInput1ModalComponent,
        FlowProcess12Component,
        FlowProcess13Component,
        FlowProcess14Component,
        FlowProcessUploadBaseComponent,
        InfoChangeComponent,
        Select1InputComponent,
        DataContent1Component,
        AccountsReceivableComponent, // 应收账款证明
        NewFileModalComponent,
        SupplementFileModalComponent,
        PayBackInputModalComponent,
        AccountsReceivable1Component,
        BankCardSingleInput1Component,

        InstitutionalReviewListComponent,
        FileEditInput2Component,
        ContractEdit1ModalComponent,
        ContractView1ModalComponent,
        AuditCriteriaModalComponent,
        CapitalPoolNameModalComponent,
        CapitalPoolAlertRatioModalComponent,
        CapitalPoolIntermediaryAgencyModalComponent,
        MultiplePickerInputComponent,
        MultiplePickerModalComponent,
        DownFileTableInputComponent,
        UploadFileTableInputComponent,
        EditInfoModalComponent,
        UploadPaymentInputComponent,
        ContractHwInputComponent,
        ContractHwNewModalComponent,
        ManagerInformationInputComponent,
        InvoiceReplaceInputComponent,
        HeadquartersSelectInputComponent,
        BulkUploadModalComponent,
        SearchListComponent,
        BankCreditModalComponent,
        InfoDetailModalComponent,
        OpponentModalComponent,
        XnInputWindComponent,
        DateInputWindComponent,
        TextInputWindComponent,
        SelectInputWindComponent,
        DselectInputWindComponent,
        EnterpriseContractModalComponent,
        EnterpriseTransactionControlModalComponent,
        HouseHoldStaffModel,
        MultistageSelectInputComponent,
        MultistageSelectInput1Component,
        MflowInputComponent,
        GeneratingContractModalComponent,
        GeneratingContractStampModalComponent,
        ExportListModalComponent,
        ReceiptListVkComponent,
        LinkageSelectInputComponent,
        SupplierUnsignedContractComponent,
        StorageRackSelectInputComponent,
        DateInputNullComponent,
        PerformanceInputComponent,
        ContractVankeSupplementModalComponent,
        MfilesViewModalComponent,
        MoneyControlInputComponent,
        DateInputControlNullComponent,
        MultipleSelectInputComponent,
        InvoiceDirectionViewModalComponent,
        VankeYjlSupplierSignComponent, // todo 雅居乐 供应商补充协议 [暂时存在]
        YajvleSignContractComponent,
        ContractComponent
    ],
    // 要动态创建的组件在这里声明
    entryComponents: [
        ...EXPORT_RISK_ENTRY_COMPONENT_MODAL,
        ...ENTRY_COMPONENTS
    ],
    exports: [
        ...EXPORT_MODULES,
        ...CONST_COMPONENTS,
        ...ENTRY_COMPONENTS,
        ...EXPORT_RISK_ENTRY_COMPONENT_MODAL,
        PaginationModule,
        XnInputComponent,
        XnInput1Component,
        ShowInputComponent,
        ArrayTruncatePipe,
        XnDatePipe,
        VankeModelId,
        XnFilterRowPipe,
        XnMoneyPipe,
        XnJsonPipe,
        XnContractFilterPipe,
        XnLabelPipe,
        XnOrgPipe,
        XnInvoiceStatusPipe,
        XnStringToArrayPipe,
        XnInvoiceStatus1Pipe,
        XnDselectPipe,
        XnFilterDonePipe,
        XnGatherTypePipe,
        xnZhiyaPipe,
        XnPayTypePipe,
        XnZichanPipe,
        XnClassfyPipe,
        XnPayPipe,
        XnEnumSelectItemPipe,
        XnStoreTypePipe,
        XnStockTypePipe,
        XnProxyStatusPipe,
        XnUseQuotaStatusPipe,
        XnStorageTypePipe,
        XnTradeStatusPipe,
        XnTrade1StatusPipe,
        XnTrade2StatusPipe,
        XnTypePipe,
        XntransFer,
        XnCardPipe,
        XnTextPipe,
        XnArrayPipe,
        ArrayListToStringPipe,
        XnOperatorPipe,
        XnInputShowPipe,
        XnBcDataTypePipe,
        PageComponent,
        DragonPageComponent,
        XnMainFlowStatusPipe,
        XnDepositMainFlowStatusPipe,
        XnCaStepPipe,
        XnCaStatusPipe,
        XnBrPipe,
        XnPushTypePipe,
        XnSelectItemPipe,
        XnFilterTextPipe,
        XnRegisterStatusPipe,
        FlowProcessComponent,
        FlowProcess0Component,
        FlowProcess1Component,
        FlowProcess3Component,
        FlowProcess6Component,
        FlowProcess7Component,
        CommListComponent,
        CommAddComponent,
        CommDetailComponent,
        CommEditComponent,
        InputSwitchComponent,
        EnterSelectInputComponent,
        DataContentComponent,
        DataContent3Component,
        ContractVankeInputComponent,
        ContractVankeInput1Component,
        ContractVankeNewModalComponent,
        VankeAuditStandardModalComponent,
        InvoiceVankeInputComponent,
        InvoiceTransferInputComponent,
        ContractVankeEditModalComponent,
        ContractVankeOfficeInputComponent,
        FinancingFactoringVankeModalComponent,
        InvoiceVankePreInputComponent,
        ContractFilesViewModalComponent,
        InvoiceVankeEditModalComponent,
        XnSelectTransformPipe,
        XnSelectDeepTransformPipe,
        RatesDateStartModalComponent,
        RatesPreModalComponent,
        DateInputDayComponent,
        XnMoneyCNPipe,
        InputMaskDirective,
        MoneyMaskDirective,
        XnPercentPipe,
        XnHtmlPipe,
        InvoiceReplaceViewModalComponent,
        FeeComponent,
        FeePromisePayComponent,
        FeeBankDiscountComponent,
        FeeBankFinancingComponent,
        BankListComponent,
        FactoringListComponent,
        FileConsistencyComponent,
        FileLogicalComponent,
        BackFileComponent,
        BankSelectInputComponent,
        HwExcelInputComponent,
        EditSelectInputComponent,
        CalculateServiceFeeComponent,
        BankCardSingleInputComponent,
        THeadFixedComponent,
        BankCardAddModalComponent,
        DownloadAttachmentsmodalComponent,
        NewFileModalComponent,
        SupplementFileModalComponent,
        InstitutionalReviewListComponent,
        FileEditInput2Component,
        MultiplePickerInputComponent,
        MultiplePickerModalComponent,
        EditInfoModalComponent,
        UploadPaymentInputComponent,
        VankeTypeSelectInputComponent,
        InvoiceDataViewModalComponent,
        SearchListComponent,
        BankCreditModalComponent,
        InfoDetailModalComponent,
        OpponentModalComponent,
        XnInputWindComponent,
        DateInputWindComponent,
        TextInputWindComponent,
        SelectInputWindComponent,
        DselectInputWindComponent,
        EnterpriseContractModalComponent,
        EnterpriseTransactionControlModalComponent,
        HouseHoldStaffModel,
        MultistageSelectInputComponent,
        MultistageSelectInput1Component,
        MflowInputComponent,
        GeneratingContractModalComponent,
        GeneratingContractStampModalComponent,
        ExportListModalComponent,
        BulkUploadModalComponent,
        ReceiptListVkComponent,
        LinkageSelectInputComponent,
        SupplierUnsignedContractComponent,
        DateInputNullComponent,
        PerformanceInputComponent,
        MoneyControlInputComponent,
        DateInputControlNullComponent,
        MultipleSelectInputComponent,
        InvoiceDirectionViewModalComponent,
        VankeYjlSupplierSignComponent,
        YajvleSignContractComponent,
        ContractComponent

    ]
})
export class PublicModule {
}
