import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SortablejsModule } from 'angular-sortablejs';

import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth-guard.service';
import { ModalService } from './services/modal.service';
import { MsgBoxService } from './services/msg-box.service';
import { XnService } from './services/xn.service';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';
import { NavService } from './services/nav.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent as PortalHomeComponent } from './pages/portal/home.component';
import { LoginComponent } from './pages/user/login.component';
import { IndexComponent as UserIndexComponent } from './pages/user/index.component';
import { ColumnComponent } from './pages/portal/column.component';
import { EnterpriseListComponent } from './pages/portal/enterprise-list.component';
import { DetailComponent } from './pages/portal/detail.component';
import { EnterpriseDetailComponent } from './pages/portal/enterprise-detail.component';
import { PortalCarouselComponent } from './pages/portal/portal-carousel.component';
import { PortalNewsComponent } from './pages/portal/portal-news.component';
import { PortalDoingComponent } from './pages/portal/portal-doing.component';
import { PortalUnionComponent } from './pages/portal/portal-union.component';
import { PortalSpaceComponent } from './pages/portal/portal-space.component';
import { PortalEnterpriseComponent } from './pages/portal/portal-enterprise.component';
import { PortalLinksComponent } from './pages/portal/portal-links.component';
import { CaComponent } from './pages/user/ca.component';

import { IndexComponent as OaIndexComponent } from './pages/oa/index.component';
import { JumpComponent } from './pages/oa/jump.component';

import { PortalVideoComponent } from './pages/portal/portal-video.component';
import { InvoiceUploadService } from './services/invoice-upload.service';
import { LoadingPercentService } from './services/loading-percent.service';
import { LoadingPercentNewService } from './services/loading-percent-new.service';
import { UploadPicService } from './services/upload-pic.service';

import { ContractTypeCommunicateService } from './services/contract-type-communicate.service';
import { BankCardCommunicateService } from './services/bank-card-communicate.service';
import { HwModeService } from './services/hw-mode.service';

import { DateCommunicateService } from './services/date-communicate.service';
import { MoneyCommunicateService } from './services/money-communicate.service';
import { IslcCommunicateService } from './services/islc-communicate.service';
import { UnsupportedBrowserComponent } from './pages/portal/unsupported-browser.component';

import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './reuse-strategy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AvengerApiService } from './services/avenger-api.service';
import { DefaultInterceptor } from './services/default-interceptor';
import { FileAdapterService } from './services/file-adapter.service';
import { LocalStorageService } from './services/local-storage.service';
import { PublicCommunicateService } from './services/public-communicate.service';
import { BankPublicCommunicateService } from './services/bank-public-communicate.service';
import { LayoutModule } from './layout/layout.module';
import { PublicModule } from './public/public.module';
import { AmountControlCommService } from './pages/console/risk-control/transaction-control/amount/amount-control-comm.service';
import { DragonApiService } from './services/api-extra.service';
import { BankManagementService } from './pages/console/bank-management/bank-mangement.service';
import { CoalescingComponentFactoryResolver } from './coalescing-component-factory-resolver.service';
import { DragonPdfViewService } from './modules/services/pdf-view.service';
import { DragonTableSortService } from './modules/services/table-sort.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
       // SortablejsModule.forRoot({ animation: 150 }),
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        PublicModule,
    ],
    declarations: [
        AppComponent,
        PortalHomeComponent,
        LoginComponent,

        UserIndexComponent,
        ColumnComponent,
        EnterpriseListComponent,
        DetailComponent,
        EnterpriseDetailComponent,
        PortalSpaceComponent,
        PortalCarouselComponent,
        PortalNewsComponent,
        PortalDoingComponent,
        PortalUnionComponent,
        PortalVideoComponent,
        PortalEnterpriseComponent,
        PortalLinksComponent,
        CaComponent,
        OaIndexComponent,
        JumpComponent,
        UnsupportedBrowserComponent,
    ],
    providers: [
        ApiService,
        AvengerApiService,
        FileAdapterService,
        AuthGuard,
        ModalService,
        MsgBoxService,
        UserService,
        NavService,
        LoadingService,
        XnService,
        DragonApiService,
        // 组建通讯
        PublicCommunicateService,
        InvoiceUploadService,
        LoadingPercentService, // 百分比上传loading
        LoadingPercentNewService,
        UploadPicService,
        ContractTypeCommunicateService,
        BankCardCommunicateService,
        HwModeService,
        DateCommunicateService,
        MoneyCommunicateService,
        IslcCommunicateService,
        BankPublicCommunicateService,
        LocalStorageService,
        AmountControlCommService,
        BankManagementService,
        DragonPdfViewService,
        DragonTableSortService,
        CoalescingComponentFactoryResolver,
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(coalescingResolver: CoalescingComponentFactoryResolver) {
        coalescingResolver.init();
    }
 }
