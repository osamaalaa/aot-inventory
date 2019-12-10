import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, iif, of } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { switchMap } from 'rxjs/operators';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { InvTransferRItemsService } from '../../../lib/Strategy/inv-transfer-R/invTransferRItems';
import { InvTransferRDetailService } from '../../../lib/Strategy/inv-transfer-R/invTransferRDetails';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inv-transferR-view',
  templateUrl: './inv-transferR-view.component.html',
  styleUrls: ['./inv-transferR-view.component.scss'],
  providers: [
    OperationMasterService,
    InvTransferRItemsService,
    InvTransferRDetailService
  ],
})
export class InvTransferRViewComponent implements OnInit {

  @Input() INV_TRANSFER_R_ID: any;

  
  @Input() notificationData: any;


  invTransferRData:any = {};

  invTransferItems:any[] = [];

  isAcceptLoading:boolean = false;

  isRejectLoading:boolean = false;

  constructor(
    private operationsService:OperationsService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private drawerRef: NzDrawerRef,
    private http:HttpClient,
    public operationMasterService: OperationMasterService,
    private invTransferRItemsService: InvTransferRItemsService,
    private invTransferRDetailService: InvTransferRDetailService
  ) { 
    this.operationMasterService.setItemStrategy(this.invTransferRItemsService);
    this.operationMasterService.setDetailStrategy(this.invTransferRDetailService);
    this.operationMasterService.setMasterKey("INV_TRANSFER_R_ID")
    this.operationMasterService.setItemsKey("INV_TRANSFER_R_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_TRANSFER_R_ITEMS_D_ID")
  }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneTransferR(this.INV_TRANSFER_R_ID),
      this.operationsService.getTransferRItems(this.INV_TRANSFER_R_ID)
    ]).subscribe((results)=>{
      this.loading = false;
      this.invTransferRData = results[0].rows[0];
      this.invTransferItems = results[1].rows;
    },error=>{
      this.loading = false;
    })
  }


  whenApproveClicked() {
    this.isAcceptLoading = true;
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
    .pipe(
      switchMap(_=>{
        let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        return iif(()=>isLastStep,
        this.http.post(`/issueproc/issueProcessingForInvTransferR`,{INV_TRANSFER_R_ID:this.INV_TRANSFER_R_ID})
        ,of())
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
