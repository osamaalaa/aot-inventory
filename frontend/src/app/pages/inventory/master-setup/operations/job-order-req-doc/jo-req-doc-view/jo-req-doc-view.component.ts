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

@Component({
  selector: 'app-jo-req-doc-view',
  templateUrl: './jo-req-doc-view.component.html',
  styleUrls: ['./jo-req-doc-view.component.scss'],
  providers:[OperationMasterService,JOReqDocDetailService,JOReqDocItemsService]

})
export class JoReqDocViewComponent implements OnInit {

  @Input() DOCUMENT_ID: any;
  @Input() notificationData: any;


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
      this.jobOrderId = this.reqDocData.BASE_DOCUMENT_ID
      this.reqDocItems = results[1].rows || [];
    },error=>{
      this.loading = false;
    })
  }


  whenApproveClicked() {
    this.isAcceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
    .pipe(
      switchMap(data=>{
        let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        return iif(()=>isLastStep,
        forkJoin([
          this.http.post(`/issueproc/issueProcessingForReqDoc`,{REQ_DOCUMENT_ID:this.notificationData.REQ_DOCUMENT_ID})        ]),of(data)
        )
      })
    ).subscribe(
      success=>{
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
