import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../../public/public.module';
import { DragonRoutingModule } from './dragon-routing.module';
import { DragonShareModule } from './share/share.module';
import { RecordDragonComponent } from './pages/record-dragon/record-dragon.component';
import { CapitalPoolComponent } from './pages/capital-pool/capital-pool.component';
import { CapitalPoolUnhandledListComponent } from './pages/capital-pool/capital-pool-unhandled-list/capital-pool-unhandled-list.component';
import { CapitalPoolCommListComponent } from './pages/capital-pool/capital-pool-comm-list/capital-pool-comm-list.component';
import { DynamicFormModule } from '../../common/dynamic-form/dynamic-form.module';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import { DragonProjectInfoComponent } from './pages/project-company-supplierInfo/additional-materials.component';
import { DragonTransactionsListComponent } from './pages/common/dragon-transactions-list.component';
import { BatchModifyComponent } from './pages/capital-pool/capital-pool-comm-list/batch-modify.component';
import { DragonUploadPaymentsComponent } from './pages/upload-payment-confirmation/upload-payment-confirmation.component';
import { DragonInvoiceManagementComponent } from './pages/invoice-management/invoice-management.component';
import { DragonFactorSignComponent } from './pages/factor-sign-contract/factor-sign-contract.component';
import { TransferContractManagerComponent } from './pages/contract-template/contract-template.component';
import { DragonIntermediaryManagementComponent } from './pages/intermediary-management/intermediary-management-list.componment';
import { SortablejsModule } from 'angular-sortablejs';
import { VankeEnterpoolComponent } from './pages/enter-capital-tool/enter-capital-pool-confirmation.component';
import { VankeProjectmanageComponent } from './pages/vanke-project-manager/vanke-project-management.component';
import { VankeProjectmanagePlanComponent } from './pages/vanke-project-manager/vanke-project-plan-list/vanke-project-plan-list.component';
import { VankeCapitalpoolComponent } from './pages/vanke-project-manager/vanke-capital-pool/vanke-capital-pool.component';

const COMPONENTS = [
    RecordDragonComponent,
    CapitalPoolComponent,
    CapitalPoolUnhandledListComponent,
    CapitalPoolCommListComponent,
    ReceiptListComponent,
    DragonProjectInfoComponent,
    DragonTransactionsListComponent,
    DragonIntermediaryManagementComponent,
    BatchModifyComponent,
    DragonUploadPaymentsComponent,
    DragonInvoiceManagementComponent,
    DragonFactorSignComponent,
    TransferContractManagerComponent,
    VankeEnterpoolComponent,
    VankeProjectmanageComponent,
    VankeProjectmanagePlanComponent,
    VankeCapitalpoolComponent

];


@NgModule({
    imports: [
        CommonModule,
        PublicModule,
        DragonShareModule,
        DragonRoutingModule,
        DynamicFormModule,
        SortablejsModule,
    ],
    declarations: [
        ...COMPONENTS,
    ]
})
export class DragonModule { }
