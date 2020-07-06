import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';
import { CommonModule } from '@angular/common';
import { InputForms } from './components/form/input';
import { ShowForms } from './components/form/show';
import { NewComponent } from './components/record/new.component';
import { PublicModule } from '../../../public/public.module';
import { DynamicFormModule } from '../../../common/dynamic-form/dynamic-form.module';
import { DragonViewComponent } from './components/record/view.component';
import { DragonRecordComponent } from './components/record/record.component';
import { DragonMemoComponent } from './components/record/memo.component';
import { DragonEditComponent } from './components/record/edit.component';
import { FlowProcessComponent } from '../process/flow-process.component';
import { CoalescingComponentFactoryResolver } from '../../../coalescing-component-factory-resolver.service';
import { ModalComponents } from './modal';
import { DragonFlowDetailComponent } from './components/record/flow-detail.component';
import { FlowDetailRecordComponent } from './components/record/flow-detail-record.component';
import { VankebusinessComponent } from './components/record/vanke-business-related.component';
import { VankeRelatedFileComponent } from './components/record/vanke-related-file.component';
import { DragonView2Component } from './components/record/view2.component';

/**
 *  外部可用模块
 */
const EXPORT_MODULE = [

];

/**
 *  外部可用组件
 */
const COMPONENT = [
    NewComponent,
    DragonEditComponent,
    DragonMemoComponent,
    DragonRecordComponent,
    DragonViewComponent,
    DragonFlowDetailComponent,
    FlowDetailRecordComponent,
    VankebusinessComponent,
    VankeRelatedFileComponent,
    DragonView2Component


];

/**
 *  编辑/显示表单组件
 */
const FROM_COMPONENT = [
    ...InputForms,
    ...ShowForms,
    ModalComponents,
];

/**
 *  动态生成组件
 */
export const ENTRY_COMPONENT = [
    ...FROM_COMPONENT,
    FlowProcessComponent,

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
        SortablejsModule,
        PublicModule,
        DynamicFormModule,
        ...EXPORT_MODULE
    ],
    declarations: [
        ...COMPONENT,
        ...ENTRY_COMPONENT,
        ...FROM_COMPONENT,
        ...PIPES,
        ...DIRECTIVES,
        ...EXPORT_MODULE
    ],
    entryComponents: [
        ...ENTRY_COMPONENT
    ],
    exports: [
        ...EXPORT_MODULE,
        ...ENTRY_COMPONENT,
        ...FROM_COMPONENT,
        ...COMPONENT,
    ]
})
export class DragonShareModule {
    constructor(
        coalescingResolver: CoalescingComponentFactoryResolver,
        localResolver: ComponentFactoryResolver
    ) {
        coalescingResolver.registerResolver(localResolver);
    }
}
