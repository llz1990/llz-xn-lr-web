import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JumpComponent } from './jump.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { PiaojcComponent } from '../console/data/piaojc.component';
import { MoneyTableComponent } from '../console/data/money-table.component';
import { EnterpriseComponent } from '../console/data/enterprise.component';
import { DriveComponent } from '../console/data/drive.component';
import { FactoringEfficiencyComponent } from '../console/data/factoring-efficiency.component';
import { ClientMapComponent } from '../console/data/client-map.component';
import { CapitalMapComponent } from '../console/data/capital-map.component';

const routes: Routes = [
    {
        path: '',
        component: JumpComponent
    },
    {
        path: 'data',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'piaojc',
                component: PiaojcComponent
            },
            {
                path: 'money-table',
                component: MoneyTableComponent
            },
            {
                path: 'enterprise',
                component: EnterpriseComponent
            },
            {
                path: 'drive',
                component: DriveComponent
            },
            {
                path: 'factoring-efficiency',
                component: FactoringEfficiencyComponent
            },
            {
                path: 'client-map',
                component: ClientMapComponent
            },
            {
                path: 'capital-map',
                component: CapitalMapComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OARoutingModule { }
