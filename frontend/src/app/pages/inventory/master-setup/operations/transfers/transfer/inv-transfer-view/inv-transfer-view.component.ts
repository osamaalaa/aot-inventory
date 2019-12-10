import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, iif, of } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { InvTransferItemsService } from '../../../lib/Strategy/inv-transfer/invTrafItems.strategy';
import { InvTransferDetailService } from '../../../lib/Strategy/inv-transfer/invTrafDetails.strategy';

@Component({
  selector: 'app-inv-transfer-view',
  templateUrl: './inv-transfer-view.component.html',
  styleUrls: ['./inv-transfer-view.component.scss'],
  providers: [
    OperationMasterService,
    InvTransferItemsService,
    InvTransferDetailService
  ],
})
export class InvTransferViewComponent implements OnInit {

  @Input() INV_TRANSFER_ID: any;

  
  @Input() notificationData: any;


  invTransferData:any = {};

  invTransferItems:any[] = [];

  isAcceptLoading:boolean = false;

  isRejectLoading:boolean = false;

  constructor(
    private operationsService:OperationsService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient,
    private drawerRef: NzDrawerRef,
    public operationMasterService: OperationMasterService,
    private invTransferItemsService: InvTransferItemsService,
    private invTransferDetailService: InvTransferDetailService
  ) { 
    this.operationMasterService.setItemStrategy(this.invTransferItemsService);
    this.operationMasterService.setDetailStrategy(this.invTransferDetailService);
    this.operationMasterService.setMasterKey("INV_TRANSFER_ID")
    this.operationMasterService.setItemsKey("INV_TRANSFER_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_TRANSFER_ITEMS_D_ID")
  }

  ngOnInit() {
    this.fetchData();
  }
  loading:boolean = false;
  fetchData(){
    this.loading = true;
    forkJoin([
      this.operationsService.getOneTransfer(this.INV_TRANSFER_ID),
      this.operationsService.getInvTransferItemsAgainstInvTransferId(this.INV_TRANSFER_ID)
    ]).subscribe((results)=>{
      this.loading = false;
      this.invTransferData = results[0].rows[0];
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
        this.http.post(`/issueproc/issueProcessingForInvTransfer`,{INV_TRANSFER_ID:this.INV_TRANSFER_ID})

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
