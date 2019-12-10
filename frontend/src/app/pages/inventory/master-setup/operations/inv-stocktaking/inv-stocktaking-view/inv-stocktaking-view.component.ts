import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { switchMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { HttpClient } from '@angular/common/http';
import { InvStocktakingService } from '../inv-stocktaking.service';

@Component({
  selector: 'app-inv-stocktaking-view',
  templateUrl: './inv-stocktaking-view.component.html',
  styleUrls: ['./inv-stocktaking-view.component.scss'],
  providers:[InvStocktakingService]
})
export class InvStocktakingViewComponent implements OnInit {

  invStocktakingdata: any = {};
  @Input() INV_STOCKTAKING_ID: any;
  @Input() notificationData: any;

  constructor(
    private operationsService: OperationsService,
    private workFlowService:WorkFlowService,
    private dashboardService:DashboardService,
    private drawerRef: NzDrawerRef,
    private homeMenuService:HomeMenuService,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.fetchData()
  }

  loading: boolean = false;
  fetchData() {
    this.operationsService.getOneInvStocktaking(this.INV_STOCKTAKING_ID).subscribe(
      data => {
        this.invStocktakingdata = data.rows[0];
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }


  isAcceptLoading:boolean = false;

  isRejectLoading:boolean = false;

  whenApproveClicked() {
    this.isAcceptLoading = true;
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    this.notificationData.acceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
      .pipe(
        switchMap(data => {
          let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
          return iif(() => isLastStep,
          this.http.post(`/issueproc/issueProcessingForInvStocking`,{INV_STOCKTAKING_ID:this.notificationData.INV_STOCKTAKING_ID}) 

            , of(data)
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
      this.isRejectLoading = false;
      this.drawerRef.close()
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      this.isRejectLoading = false;
      this.drawerRef.close()
    })
  }

}
