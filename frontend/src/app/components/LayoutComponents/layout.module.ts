import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { ChartistModule } from 'ng-chartist'

import { TopbarComponent } from './Topbar/topbar.component'
import { TopbarBitcoinPriceComponent } from './Topbar/BitcoinPrice/bitcoin-price.component'
import { TopbarHomeMenuComponent } from './Topbar/HomeMenu/home-menu.component'
import { TopbarIssuesHistoryComponent } from './Topbar/IssuesHistory/issues-history.component'
import { TopbarLiveSearchComponent } from './Topbar/LiveSearch/live-search.component'
import { TopbarProfileMenuComponent } from './Topbar/ProfileMenu/profile-menu.component'
import { MenuLeftComponent } from './Menu/MenuLeft/menu-left.component'
import { MenuTopComponent } from './Menu/MenuTop/menu-top.component'
import { FooterComponent } from './Footer/footer.component'
import { BreadcrumbsComponent } from './Breadcrumbs/breadcrumbs.component'
import { SettingsComponent } from './Settings/settings.component'
import { NotificationFactoryComponent } from './Topbar/HomeMenu/notification-factory/notification-factory.component';
import { OpenBalanceNotificationComponent } from './Topbar/HomeMenu/notification-factory/open-balance-notification/open-balance-notification.component';
import { RcvDocumentNotificationComponent } from './Topbar/HomeMenu/notification-factory/rcv-document-notification/rcv-document-notification.component';
import { InvTransferNotificationComponent } from './Topbar/HomeMenu/notification-factory/inv-transfer-notification/inv-transfer-notification.component';
import { CleanUIModule } from '../CleanUIComponents/cleanui.module';
import { ReqDocumentNotificationComponent } from './Topbar/HomeMenu/notification-factory/req-document-notification/req-document-notification.component';
import { DspDocumentNotificationComponent } from './Topbar/HomeMenu/notification-factory/dsp-document-notification/dsp-document-notification.component';
import { OperationsModule } from 'src/app/pages/inventory/master-setup/operations/operations.module'
import { RcvInspNotificationComponent } from './Topbar/HomeMenu/notification-factory/rcv-inspection-notification/rcv-insp-notification.component'
import { RcvTempNotificationComponent } from './Topbar/HomeMenu/notification-factory/rcv-temporary-notification/rcv-temp-notification.component'
import { InvTransferRNotificationComponent } from './Topbar/HomeMenu/notification-factory/inv-transfer-r-notification/inv-transfer-r-notification.component'
import { InvStockingNotificationComponent } from './Topbar/HomeMenu/notification-factory/inv-stocking-notification/inv-stocking-notification.component'
import { JOReqDocumentNotificationComponent } from './Topbar/HomeMenu/notification-factory/jo-req-document-notification/jo-req-document-notification.component'
import { ItemReceiveNotificationComponent } from './Topbar/HomeMenu/notification-factory/item-receive-request/item-receive-request'

const COMPONENTS = [
  TopbarComponent,
  TopbarBitcoinPriceComponent,
  TopbarHomeMenuComponent,
  TopbarIssuesHistoryComponent,
  TopbarLiveSearchComponent,
  TopbarProfileMenuComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  BreadcrumbsComponent,
  SettingsComponent,
  NotificationFactoryComponent,
  OpenBalanceNotificationComponent,
  RcvDocumentNotificationComponent,
  InvTransferNotificationComponent,
  ReqDocumentNotificationComponent,
  DspDocumentNotificationComponent,
  RcvInspNotificationComponent,
  RcvTempNotificationComponent,
  InvTransferRNotificationComponent,
  InvStockingNotificationComponent,
  JOReqDocumentNotificationComponent,
  ItemReceiveNotificationComponent
]

@NgModule({
  imports: [OperationsModule,SharedModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, ChartistModule,CleanUIModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
