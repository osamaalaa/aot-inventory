import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, of, iif } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { RcvTempItemsService } from '../../lib/Strategy/rcv-temporary/rcvTempItemsStrategy';
import { RcvTempDetailService } from '../../lib/Strategy/rcv-temporary/rcvTempDetailsStrategy';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { switchMap } from 'rxjs/operators';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rcv-doc-view',
  templateUrl: './rcv-doc-view.component.html',
  styleUrls: ['./rcv-doc-view.component.scss'],
  providers: [
    OperationMasterService,
    RcvTempItemsService,
    RcvTempDetailService
  ],
})
export class RcvTempViewComponent implements OnInit {

  @Input() DOCUMENT_ID: any;
  @Input() notificationData: any;

  rcvDocumentData:any = {};

  rcvDocumentItems:any[] = [];

  constructor(
    private operationsService:OperationsService,
    public operationMasterService: OperationMasterService,
    private rcvTempItemsService: RcvTempItemsService,
    private rcvTempDetailService: RcvTempDetailService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private dashboardService:DashboardService,
    private http:HttpClient,
    private drawerRef: NzDrawerRef
  ) {
    this.operationMasterService.setItemStrategy(this.rcvTempItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvTempDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_TEMP_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_TEMP_ITEMS_D_ID")
   }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneRcvTemp(this.DOCUMENT_ID),
      this.operationsService.getAllRcvTempITems(this.DOCUMENT_ID)
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
        this.http.post(`/issueproc/issueProcessingForRCVTemporary`,{DOCUMENT_ID:this.notificationData.RCV_TEMPORARY_ID}) 
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
