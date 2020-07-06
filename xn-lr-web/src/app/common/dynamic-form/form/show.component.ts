import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicComponent } from '../dynamic.component';
import { DynamicDirective } from '../dynamic-host.directive';
import { dynamicComponentService } from '../dynamic.decorators';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-dynamic-show',
    template: `<ng-template #dynamic dynamic-host></ng-template>`
})
export class ShowComponent implements OnInit {

    // 动态表单模块名称
    @Input() formModule: string;
    // 当前行信息
    @Input() row: any;
    // 表单组
    @Input() form: FormGroup;

    @Input() svrConfig: any;


    @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        // if (!isNullOrUndefined(this.memo)) {
        //     this.row.type = 'textarea';
        // } else
        if (isNullOrUndefined(this.row) || isNullOrUndefined(this.row.data)) {
            this.row.type = this.row && this.row.type || 'text';
            // this.label = '未填写';
        }

        this.loadComponent();
    }

    private loadComponent() {
        console.log('dynamic show:', this.formModule);
        const component = dynamicComponentService.getComponentInstance(this.row['type'], this.formModule);
        console.log('dynamic show:', this.row['type']);

        if (!component) {
            return;
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component as any);

        const viewContainerRef = this.dynamicHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const instance = (<DynamicComponent>componentRef.instance);
        instance.row = this.row;
        instance.form = this.form;
        instance.svrConfig = this.svrConfig;

       // instance.memo = this.memo;
    }
}
