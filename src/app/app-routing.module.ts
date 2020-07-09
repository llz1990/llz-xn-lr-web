import { NgModule } from '@angular/core';
import { Routes, PreloadAllModules, RouterModule } from '@angular/router';
import { IndexComponent as ConsoleIndexComponent } from './layout/admin/index.component';
import { LoginComponent } from './pages/user/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { IndexComponent as UserIndexComponent } from './pages/user/index.component';
import { IndexComponent as PortalIndexComponent } from './layout/default/index.component';
import { HomeComponent as PortalHomeComponent } from './pages/portal/home.component';
import { ColumnComponent } from './pages/portal/column.component';
import { EnterpriseListComponent } from './pages/portal/enterprise-list.component';
import { DetailComponent } from './pages/portal/detail.component';
import { EnterpriseDetailComponent } from './pages/portal/enterprise-detail.component';

import { CaComponent } from './pages/user/ca.component';

import { IndexComponent as OaIndexComponent } from './pages/oa/index.component';

import { UnsupportedBrowserComponent } from './pages/portal/unsupported-browser.component';

const routes: Routes = [
    {
        path: '',
        component: PortalIndexComponent,
        children: [
            {
                path: '',
                component: PortalHomeComponent
            },
            {
                path: 'portal/column/:id',
                component: ColumnComponent
            },
            {
                path: 'portal/enterprise',
                component: EnterpriseListComponent
            },
            {
                path: 'portal/detail/:id',
                component: DetailComponent
            },
            {
                path: 'portal/enterprise/:id',
                component: EnterpriseDetailComponent
            },
        ]
    },
    {
        path: 'console',
        component: ConsoleIndexComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: 'app/pages/console/console.module#ConsoleModule',
    },
    {
        path: 'dragon',
        component: ConsoleIndexComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: 'app/modules/dragon/dragon.module#DragonModule',
    },
    {
        path: 'machine-account',
        component: ConsoleIndexComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: 'app/modules/machine-account/machine-account.module#MachineAccountModule'
    },

    {
        path: 'user',
        component: UserIndexComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: CaComponent
            },
            {
                path: '**',
                redirectTo: '/user/login',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'oa',
        component: OaIndexComponent,
        loadChildren: 'app/pages/oa/oa.module#OAModule',
    },
    {
        path: 'unsupported_browser',
        component: UnsupportedBrowserComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules }),],

    exports: [RouterModule]
}) export class AppRoutingModule {
}
