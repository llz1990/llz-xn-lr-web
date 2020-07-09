import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {DragDropModule} from '@angular/cdk/drag-drop';
import { MachineAccountRoutingModule } from './machine-account-routing.module';
import { DemoListComponent } from './pages/demo-list/demo-list.component';
import { PublicModule } from '../../public/public.module';
import { DynamicFormModule } from '../../common/dynamic-form/dynamic-form.module';
import { DataModule } from '../../pages/console/data/data.module';
import { MachineAccountShareModule } from './share/share.module';
import { ZhongdengListComponent } from './pages/zhongdeng-list/zhongdeng-list.component';
import { ZhongdengFlowComponent } from './pages/zhongdeng-flow/zhongdeng-flow.component';
import { ZhongdengComponent } from './pages/zhongdeng-flow/zhongdeng.component';
import { ZhongdengRecordComponent } from './pages/zhongdeng-record/zhongdeng-record.component';
import { SortablejsModule } from 'angular-sortablejs';

const COMPONENTS = [
    DemoListComponent,
    ZhongdengListComponent,
    ZhongdengFlowComponent,
    ZhongdengComponent,
    ZhongdengRecordComponent,
];

@NgModule({
    imports: [
        CommonModule,
        PublicModule,
        DynamicFormModule,
        MachineAccountShareModule,
        MachineAccountRoutingModule,
        DataModule,
        SortablejsModule,

    ],
    declarations: [
        ...COMPONENTS
    ],
})
export class MachineAccountModule { }
