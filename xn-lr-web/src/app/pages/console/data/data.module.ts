import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../../../public/public.module';

import { PiaojcComponent } from './piaojc.component';
import { MoneyTableComponent } from './money-table.component';
import { EnterpriseComponent } from './enterprise.component';
import { DriveComponent } from './drive.component';
import { FactoringEfficiencyComponent } from './factoring-efficiency.component';
import { ClientMapComponent } from './client-map.component';
import { CapitalMapComponent } from './capital-map.component';

const COMPONENTS = [
    PiaojcComponent,
    MoneyTableComponent,
    EnterpriseComponent,
    DriveComponent,
    FactoringEfficiencyComponent,
    ClientMapComponent,
    CapitalMapComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PublicModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class DataModule { }
