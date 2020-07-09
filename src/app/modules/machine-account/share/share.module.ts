import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputForms } from './components/form/input';
import { PublicModule } from '../../../public/public.module';
import { DynamicFormModule } from '../../../common/dynamic-form/dynamic-form.module';
import { ModalComponents } from './modal';
import { CoalescingComponentFactoryResolver } from '../../../coalescing-component-factory-resolver.service';
import { MachineViewComponent } from './components/record/view.component';
import { MachineRecordComponent } from './components/record/record.component';
import { MachineMemoComponent } from './components/record/memo.component';
import { MachineEditComponent } from './components/record/edit.component';
import { MachineNewComponent } from './components/record/new.component';
import { FlowDetailRecordComponent } from './components/record/flow-detail-record.component';
import { MachineFlowDetailComponent } from './components/record/flow-detail.component';
import { ShowForms } from './components/form/show';
import { VankebusinessComponent } from '../../dragon/share/components/record/vanke-business-related.component';

/**
 *  外部可用模块
 */
const EXPORT_MODULE = [

];

/**
 *  外部可用组件
 */
const COMPONENT = [
    MachineNewComponent,
    MachineEditComponent,
    MachineMemoComponent,
    MachineRecordComponent,
    MachineViewComponent,
    FlowDetailRecordComponent,
    MachineFlowDetailComponent,
    //VankebusinessComponent

];

/**
 *  编辑/显示表单组件
 */
const FROM_COMPONENT = [
    ...InputForms,
    ...ShowForms,
    ...ModalComponents,

];

/**
 *  动态生成组件
 */
export const ENTRY_COMPONENT = [
    ...FROM_COMPONENT,

];

/**
 *  自定义指令
 */
const DIRECTIVES = [

];
/**
 *  管道
 */
const PIPES = [

];

@NgModule({
    imports: [
        CommonModule,
        PublicModule,
        DynamicFormModule,
        ...EXPORT_MODULE
    ],
    declarations: [
        ...COMPONENT,
        ...ENTRY_COMPONENT,
        ...FROM_COMPONENT,
        ...PIPES,
        ...DIRECTIVES
    ],
    entryComponents: [
        ...ENTRY_COMPONENT
    ],
    exports: [
        ...EXPORT_MODULE,
        ...ENTRY_COMPONENT,
        ...FROM_COMPONENT,
    ]
})
export class MachineAccountShareModule {
    constructor(
        coalescingResolver: CoalescingComponentFactoryResolver,
        localResolver: ComponentFactoryResolver
    ) {
        coalescingResolver.registerResolver(localResolver);
    }
}
