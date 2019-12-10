import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { forkJoin, of, iif } from 'rxjs';
import { JODispeneItemsService } from '../../lib/Strategy/job-order-dispence/joDispenceItemStrategy';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { JODispenceDetailService } from '../../lib/Strategy/job-order-dispence/joDispenceDetailsStrategy';
import { flatMap, switchMap } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jo-disp-doc-view',
  templateUrl: './jo-disp-doc-view.component.html',
  styleUrls: ['./jo-disp-doc-view.component.scss'],
  providers:[OperationMasterService,JODispenceDetailService,JODispeneItemsService]
})
export class JoDispDocViewComponent implements OnInit {

 
  @Input() DOCUMENT_ID: any;
  @Input() notificationData: any;

  isRejectLoading:boolean;
  
  isAcceptLoading:boolean;

  dispData:any = {};

  dispenceItems:any[] = [];

  jobOrderId:any;

  constructor(
    private operationsService:OperationsService,
    public operationMasterService:OperationMasterService,
    private jODispeneItemsService:JODispeneItemsService,
    private jODispenceDetailService:JODispenceDetailService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient,
    private drawerRef: NzDrawerRef
  ) { 
    this.operationMasterService.setItemStrategy(this.jODispeneItemsService);
    this.operationMasterService.setDetailStrategy(this.jODispenceDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("DSP_DOCUMENT_ITEMS_ID")
    this.operationMasterService.setDetailsKey("DSP_DOCUMENT_ITEMS_D_ID")
  }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneDispense(this.DOCUMENT_ID).pipe(
        flatMap(data=>{
          let requestId = data.rows[0].BASE_DOCUMENT_ID;

          this.operationsService.getOneReqDoc(requestId).subscribe(reqData=>{
            this.jobOrderId = reqData.rows[0].BASE_DOCUMENT_ID
          })
          return of(data)
        })
      ),
      this.operationsService.getDispenceItemsAgainstDocumentId(this.DOCUMENT_ID)
    ]).subscribe((results)=>{
      this.loading = false;
      this.dispData = results[0].rows[0] || {};
      this.dispenceItems = results[1].rows || [];
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
            this.http.post(`/issueproc/issueProcessingForDSPdoc`,{DSP_DOCUMENT_ID:this.notificationData.DSP_DOCUMENT_ID}),
            this.http.post(`/dspdocitemsd/addItemBalancedsp/${this.notificationData.DSP_DOCUMENT_ID}`,{})
        ]),of(data)
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
      this.homeMenuService.refreshNotification$.next(true)
      this.drawerRef.close()
    }, error => {
      this.isRejectLoading = false;
      this.drawerRef.close()
    })
  }

}
