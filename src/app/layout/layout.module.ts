import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FactoringBusinessModule } from '../avenger/factoring-business/factoring-business.module';

import { PortalHeaderComponent } from './default/portal-header.component';
import { PortalNavComponent } from './default/portal-nav.component';
import { PortalFooterComponent } from './default/portal-footer.component';
import { IndexComponent as PortalIndexComponent } from './default/index.component';

import { ConsoleHeaderComponent } from './admin/console-header.component';
import { ConsoleAsideComponent } from './admin/console-aside.component';
import { IndexComponent as ConsoleIndexComponent } from './admin/index.component';

const COMPONENTS = [
    PortalHeaderComponent,
    PortalNavComponent,
    PortalFooterComponent,
    PortalIndexComponent,

    ConsoleHeaderComponent,
    ConsoleAsideComponent,
    ConsoleIndexComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FactoringBusinessModule
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class LayoutModule { }
