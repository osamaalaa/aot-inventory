import { Component, OnInit, Input } from '@angular/core';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { OpenBalanceItemsService } from '../../lib/Strategy/openBalanceStrategy/openBalItemsStrategy';
import { OpenBalDetailService } from '../../lib/Strategy/openBalanceStrategy/openBalDetailsStrategy';
import { OperationsService } from 'src/app/services/operations.service';
import { forkJoin, iif, of } from 'rxjs';
import { JOReqDocDetailService } from '../../lib/Strategy/job-order-req-doc/job-order-req-doc-details.strategy';
import { JOReqDocItemsService } from '../../lib/Strategy/job-order-req-doc/job-order-req-doc-items.strategy';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { HttpClient } from '@angular/common/http';
import { NzDrawerRef } from 'ng-zorro-antd';
import { switchMap } from 'rxjs/operators';
import { ReqDocItemsService } from '../../lib/Strategy/req-doc/reqDocItemsStrategy';
import { ReqDocDetailService } from '../../lib/Strategy/req-doc/reqDocDetailsStrategy';

@Component({
  selector: 'app-req-doc-view',
  templateUrl: './req-doc-view.component.html',
  styleUrls: ['./req-doc-view.component.scss'],
  providers:[OperationMasterService,
    ReqDocItemsService,
    ReqDocDetailService]

})
export class ReqDocViewComponent implements OnInit {

  @Input() DOCUMENT_ID: any;
  @Input() notificationData: any;

  @Input() isItemReturnRequest:any;
  @Input() isItemLostRequest:any;
  @Input() isRequestItems:any;
  @Input() isEmployeeCustodyRequest:any;
  isAcceptLoading:boolean = false;

  isRejectLoading:boolean = false;
  
  reqDocData:any = {};

  reqDocItems:any[] = [];

  jobOrderId:any;

  constructor(
    private operationsService:OperationsService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneReqDoc(this.DOCUMENT_ID),
      this.operationsService.geReqItemsAgainstDocumentId(this.DOCUMENT_ID)
    ]).subscribe((results)=>{
      this.loading = false;
      this.reqDocData = results[0].rows[0] || {};
      this.reqDocItems = results[1].rows || [];
    },error=>{
      this.loading = false;
    })
  }


  whenApproveClicked() {
    this.isAcceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
   .subscribe(
      success=>{
        let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        if(isLastStep){
          if(this.isItemReturnRequest){
             this.http.post(`/issueproc/issueProcessingForItemReturnRequest`,{DOCUMENT_ID:this.notificationData.ITEM_RETURN_REQUEST_ID}).subscribe()
  
          }else if(this.isEmployeeCustodyRequest){
             this.http.post(`/issueproc/issueProcessingForEmployeeCustody`,{DOCUMENT_ID:this.notificationData.EMPLOYEE_CUSTODY_REQUEST_ID}).subscribe()
  
          }
          else if(this.isItemLostRequest){
             this.http.post(`/issueproc/issueProcessingForItemLostRequest`,{DOCUMENT_ID:this.notificationData.ITEM_LOST_REQUEST_ID}).subscribe()
  
          }
          else if(this.isRequestItems){
            this.http.post(`/issueproc/issueProcessingForReqDocumentNew`,{DOCUMENT_ID:this.DOCUMENT_ID}).subscribe()
          }
          else{
             this.http.post(`/issueproc/issueProcessingForReqDocumentAction`,{DOCUMENT_ID:this.notificationData.REQUEST_DOCUMENT_ID}).subscribe()
          }
        }
        this.isAcceptLoading = false;
        this.homeMenuService.refreshNotification$.next(true);
        this.drawerRef.close()
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
      this.homeMenuService.refreshNotification$.next(true);
      this.drawerRef.close()

    }, error => {
      this.isRejectLoading = false;
      this.drawerRef.close()
    })
  }
}
