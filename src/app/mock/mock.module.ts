import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FactoringBusinessModule } from '../avenger/factoring-business/factoring-business.module';
import { DynamicFormModule } from '../common/dynamic-form/dynamic-form.module';
import { PublicModule } from '../public/public.module';
import { DataModule } from '../pages/console/data/data.module';
import { MockRoutingModule } from './mock-routing.module';

import { MockIndexComponent } from './index.component';
import { MockInputIndexComponent } from './input/index.component';
import { MockShowIndexComponent } from './show/index.component';

import { HttpModule } from '@angular/http';
import { ApiService } from '../services/api.service';
import { AvengerApiService } from '../services/avenger-api.service';
import { FileAdapterService } from '../services/file-adapter.service';
import { AuthGuard } from '../services/auth-guard.service';
import { ModalService } from '../services/modal.service';
import { MsgBoxService } from '../services/msg-box.service';
import { UserService } from '../services/user.service';
import { NavService } from '../services/nav.service';
import { LoadingService } from '../services/loading.service';
import { XnService } from '../services/xn.service';
import { PublicCommunicateService } from '../services/public-communicate.service';
import { InvoiceUploadService } from '../services/invoice-upload.service';
import { LoadingPercentService } from '../services/loading-percent.service';
import { UploadPicService } from '../services/upload-pic.service';
import { ContractTypeCommunicateService } from '../services/contract-type-communicate.service';
import { BankCardCommunicateService } from '../services/bank-card-communicate.service';
import { HwModeService } from '../services/hw-mode.service';
import { DateCommunicateService } from '../services/date-communicate.service';
import { MoneyCommunicateService } from '../services/money-communicate.service';
import { IslcCommunicateService } from '../services/islc-communicate.service';
import { BankPublicCommunicateService } from '../services/bank-public-communicate.service';
import { LocalStorageService } from '../services/local-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DefaultInterceptor } from '../services/default-interceptor';
import { AvengerSharedModule } from '../avenger/shared/shared.module';
import { DragonShareModule } from '../modules/dragon/share/share.module';
import { DragonApiService } from '../services/api-extra.service';
import { MachineAccountShareModule } from '../modules/machine-account/share/share.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        HttpModule,
        MockRoutingModule,
        FactoringBusinessModule,
        DynamicFormModule,
        PublicModule,
        DataModule,
        AvengerSharedModule,
        DragonShareModule,
        MachineAccountShareModule
    ],
    declarations: [
        MockIndexComponent,
        MockInputIndexComponent,
        MockShowIndexComponent,
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
        UploadPicService,
        ContractTypeCommunicateService,
        BankCardCommunicateService,
        HwModeService,
        DateCommunicateService,
        MoneyCommunicateService,
        IslcCommunicateService,
        BankPublicCommunicateService,
        LocalStorageService,
        DragonApiService,

        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    ],
    bootstrap: [MockIndexComponent]
})
export class MockModule {
    constructor() {
        console.log('mock constructor :');
    }
}
