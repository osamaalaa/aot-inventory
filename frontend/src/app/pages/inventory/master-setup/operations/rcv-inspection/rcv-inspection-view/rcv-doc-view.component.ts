import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, iif, of } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { RcvInspDetailService } from '../../lib/Strategy/rcv-inspection/rcvInspDetailsStrategy';
import { RcvInspItemsService } from '../../lib/Strategy/rcv-inspection/rcvInspItemsStrategy';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rcv-doc-view',
  templateUrl: './rcv-doc-view.component.html',
  styleUrls: ['./rcv-doc-view.component.scss'],
  providers: [
    OperationMasterService,
    RcvInspDetailService,
    RcvInspItemsService
  ],
})
export class RcvInspViewComponent implements OnInit {

  @Input() DOCUMENT_ID: any;
  @Input() notificationData: any;

  rcvDocumentData:any = {};

  rcvDocumentItems:any[] = [];

  constructor(
    private operationsService:OperationsService,
    public operationMasterService: OperationMasterService,
    private rcvInspItemsService: RcvInspItemsService,
    private rcvInspDetailService: RcvInspDetailService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private dashboardService:DashboardService,
    private http:HttpClient,
    private drawerRef: NzDrawerRef
  ) {
    this.operationMasterService.setItemStrategy(this.rcvInspItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvInspDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_INSPECTION_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_INSPECTION_ITEMS_D_ID")
   }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneRcvInspection(this.DOCUMENT_ID),
      this.operationsService.getAllRcvInspectionITems(this.DOCUMENT_ID)
    ]).subscribe((results)=>{
      this.loading = false;
      this.rcvDocumentData = results[0].rows[0]  || {};
      this.rcvDocumentItems = results[1].rows;
    },error=>{
      this.loading = false;
    })
  }



  isAcceptLoading:boolean = false;

  isRejectLoading:boolean = false;

  whenApproveClicked() {
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    this.isAcceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
    .pipe(
      switchMap(data=>{
        let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        return iif(()=>isLastStep,
        this.http.post(`/issueproc/issueProcessingForRCVInspection`,{DOCUMENT_ID:this.notificationData.RCV_INSPECTION_ID}) 

        ,of(data)
        )
      })
    ).subscribe(
      success=>{
        this.isAcceptLoading = false;
        this.drawerRef.close()
        this.homeMenuService.refreshNotification$.next(true)
      },
      error=>{
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
