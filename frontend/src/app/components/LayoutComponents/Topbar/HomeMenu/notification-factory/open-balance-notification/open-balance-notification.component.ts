import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { OpenBalViewComponent } from 'src/app/pages/inventory/master-setup/operations/open-balance/open-bal-view/open-bal-view.component';
import { HomeMenuService } from '../../home-menu.service';
import { DashboardService } from '../../../../../../services/dashboard.service'
import { UIService } from 'src/app/services/ui.service';
import { switchMap } from 'rxjs/operators';
import { iif, of, forkJoin } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
@Component({
  selector: 'app-open-balance-notification',
  templateUrl: './open-balance-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class OpenBalanceNotificationComponent implements OnInit {

  @Input() notificationData:any;

  constructor(
    private drawerService:NzDrawerService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private dashboardService:DashboardService,
    private operationsService:OperationsService,
    private ui:UIService
  ) { }

  ngOnInit() {
  }

  openBalanceComponent(INV_OPEN_BALANCE_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<OpenBalViewComponent,
     { INV_OPEN_BALANCE_ID: string | number ,
      notificationData:any
    }, string>({
      nzTitle: "Open Balance",
      nzContent: OpenBalViewComponent,
      nzContentParams: {
        INV_OPEN_BALANCE_ID: INV_OPEN_BALANCE_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }

  whenApproveClicked(item,e) {
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID

    e.stopPropagation();
    item.acceptLoading = true;
    this.workFlowService.approveRequestPro(item.REQUEST_ID)               
    .pipe(                                                                                      
      switchMap(data=>{                               
        let isLastStep: boolean = item.LAST_STEP_NEED_ACTION_FLAG == 'Y';                           
        return iif(()=>isLastStep,  
        forkJoin([
          this.operationsService.updateInvOpenBalance(this.notificationData.INV_OPEN_BALANCE_ID,
            {
              DOCUMENT_STATUS: CONSTANTS.DOCUMENT_STATUS.VALIDATED
            }),
          this.dashboardService.approveOpenBalance({
            EMPLOYEE_ID :EMPLOYEE_ID,
            ID :item.INV_OPEN_BALANCE_ID,
            DOC_TYPE_ID:CONSTANTS.WORKFLOW.DOC_TYPE.OPEN_BALANCE
          })
        ])                                                                        
  
        ,of(data)
        )
      })
    ).subscribe(
      success=>{
        item.acceptLoading = false;
        this.homeMenuService.refreshNotification$.next(true)
      },
      error=>{
        item.acceptLoading = false;
      }
    )
  }

  whenRejectClicked(item,e) {
    e.stopPropagation()
    item.rejectLoading = true;
    this.workFlowService.rejectRequestPro(item.REQUEST_ID).subscribe((data) => {
      this.operationsService.updateInvOpenBalance(this.notificationData.INV_OPEN_BALANCE_ID,
        {
          DOCUMENT_STATUS: CONSTANTS.DOCUMENT_STATUS.CANCELLED
        }).subscribe()
      item.rejectLoading = false;
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      item.rejectLoading = false;
    })
  }
}
