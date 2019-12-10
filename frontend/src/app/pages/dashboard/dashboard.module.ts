import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { DashboardRouterModule } from './dashboard-routing.module'
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module'
import { ChartistModule } from 'ng-chartist'
import { NvD3Module } from 'ng2-nvd3'

import 'd3'
import 'nvd3'

// dashboard
import { DashboardBetaComponent } from 'src/app/pages/dashboard/beta/beta.component';
import { ApprovalListComponent } from './approval-list/approval-list.component'
import { OpenBalViewComponent } from '../inventory/master-setup/operations/open-balance/open-bal-view/open-bal-view.component';
import { JobOrderListComponent } from './job-order-list/job-order-list.component';
import { OperationsModule } from '../inventory/master-setup/operations/operations.module'

const COMPONENTS = [

  DashboardBetaComponent

]

@NgModule({
  imports: [
    SharedModule,
    DashboardRouterModule,
    CleanUIModule,
    ChartistModule,
    NvD3Module,
    FormsModule,
    OperationsModule
  ],
  declarations: [...COMPONENTS, ApprovalListComponent, JobOrderListComponent],
  entryComponents:[OpenBalViewComponent]
})
export class DashboardModule {}
