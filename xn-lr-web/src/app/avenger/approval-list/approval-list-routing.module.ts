import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import ApprovallistIndexTabConfig from './approval-list-table';
import { AvengerListComponent } from '../common/avenger-list.component';
const routes: Routes = [
    {path: '', component: AvengerListComponent, data: ApprovallistIndexTabConfig.getConfig('avenger')}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AvengerApprovallistRouteModule {
}
