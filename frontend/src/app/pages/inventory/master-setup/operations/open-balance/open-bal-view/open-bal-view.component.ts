import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, iif, of } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { OpenBalanceItemsService } from '../../lib/Strategy/openBalanceStrategy/openBalItemsStrategy';
import { OpenBalDetailService } from '../../lib/Strategy/openBalanceStrategy/openBalDetailsStrategy';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from 'src/app/services/constants.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-open-bal-view',
  templateUrl: './open-bal-view.component.html',
  styleUrls: ['./open-bal-view.component.scss'],
  providers: [OperationMasterService, OpenBalanceItemsService, OpenBalDetailService]
})
export class OpenBalViewComponent implements OnInit {

  @Input() INV_OPEN_BALANCE_ID: any;

  @Input() notificationData: any;


  isAcceptLoading: boolean = false;

  isRejectLoading: boolean = false;

  openBalanceData: any = {};

  openBalanceItemsList: any[] = [];

  constructor(
    private operationsService: OperationsService,
    public operationMasterService: OperationMasterService,
    private openBalanceItemsService: OpenBalanceItemsService,
    private openBalDetailService: OpenBalDetailService,
    private workFlowService: WorkFlowService,
    private homeMenuService: HomeMenuService,
    private dashboardService: DashboardService,
    private http: HttpClient,
    private drawerRef: NzDrawerRef
  ) {
    this.operationMasterService.setItemStrategy(this.openBalanceItemsService);
    this.operationMasterService.setDetailStrategy(this.openBalDetailService);
    this.operationMasterService.setMasterKey("INV_OPEN_BALANCE_ID")
    this.operationMasterService.setItemsKey("INV_OPEN_BALANCE_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_OPEN_BALANCE_ITEMS_D_ID")
  }

  ngOnInit() {
    this.fetchData();
  }
  loading: boolean = false;
  fetchData() {
    this.loading = true;
    forkJoin([
      this.operationsService.getOneInvOpenBalance(this.INV_OPEN_BALANCE_ID),
      this.operationsService.getInvBalanceAgainstInvOpenBalanceId(this.INV_OPEN_BALANCE_ID)
    ]).subscribe((results) => {
      this.loading = false;
      this.openBalanceData = results[0].rows[0] || {};
      this.openBalanceItemsList = results[1].rows || [];
    }, error => {
      this.loading = false;
    })
  }



  whenApproveClicked() {
    this.isAcceptLoading = true;
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    this.notificationData.acceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
      .pipe(
        switchMap(data => {
          let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
          return iif(() => isLastStep,
            forkJoin([

              this.operationsService.updateInvOpenBalance(this.INV_OPEN_BALANCE_ID,
                {
                  DOCUMENT_STATUS: CONSTANTS.DOCUMENT_STATUS.VALIDATED
                }),
              this.dashboardService.approveOpenBalance({
                EMPLOYEE_ID: EMPLOYEE_ID,
                ID: this.notificationData.INV_OPEN_BALANCE_ID,
                DOC_TYPE_ID: CONSTANTS.WORKFLOW.DOC_TYPE.OPEN_BALANCE
              })
            ]), of(data)
          )
        })
      ).subscribe(
        success => {
          this.isAcceptLoading = false;
          this.drawerRef.close()
          this.homeMenuService.refreshNotification$.next(true)
        },
        error => {
          this.isAcceptLoading = false;
          this.drawerRef.close()
        }
      )
  }

  whenRejectClicked() {
    this.isRejectLoading = true;
    this.workFlowService.rejectRequestPro(this.notificationData.REQUEST_ID).subscribe((data) => {
      this.operationsService.updateInvOpenBalance(this.INV_OPEN_BALANCE_ID,
        {
          DOCUMENT_STATUS: CONSTANTS.DOCUMENT_STATUS.CANCELLED
        }).subscribe()
      this.isRejectLoading = false;
      this.drawerRef.close()
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      this.isRejectLoading = false;
      this.drawerRef.close()
    })
  }

}
