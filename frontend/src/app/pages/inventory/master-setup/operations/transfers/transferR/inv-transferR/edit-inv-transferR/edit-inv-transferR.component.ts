import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { switchMap } from 'rxjs/operators';
import { OperationMasterService } from '../../../../lib/OperationMasterService';
import { InvTransferRItemsService } from '../../../../lib/Strategy/inv-transfer-R/invTransferRItems';
import { InvTransferRDetailService } from '../../../../lib/Strategy/inv-transfer-R/invTransferRDetails';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
@Component({
  selector: 'app-edit-inv-transferR',
  templateUrl: './edit-inv-transferR.component.html',
  providers: [
    OperationMasterService,
    InvTransferRItemsService,
    InvTransferRDetailService
  ],
})
export class EditInvTransferRComponent implements OnInit {

  invtransferRFormData: any;

  // STORES_ID: string | number;
  
  INV_TRANSFER_R_ID: string | number;


  tranferData:any;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private invTransferRItemsService: InvTransferRItemsService,
    private invTransferRDetailService: InvTransferRDetailService
  ) {
    this.getinvtransData();
    this.fetchTransferData();
    this.getinvtransid();
    this.fetchData();
    this.operationMasterService.setItemStrategy(this.invTransferRItemsService);
    this.operationMasterService.setDetailStrategy(this.invTransferRDetailService);
    this.operationMasterService.setMasterKey("INV_TRANSFER_R_ID")
    this.operationMasterService.setItemsKey("INV_TRANSFER_R_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_TRANSFER_R_ITEMS_D_ID")
  }
  isCustodyTransfer
  ngOnInit() {
    this.checkIfReadOnly();
    this.route
    .data
    .subscribe(v => {
      this.isCustodyTransfer = v.isTransferCustody;
    });
  }

  isFetchingTransferData:boolean;
  fetchTransferData(){
    this.isFetchingTransferData = true;
    let INV_TRANSFER_ID = this.invtransferRFormData.BASE_DOCUMENT_ID
    this.operationsService.getOneTransfer(INV_TRANSFER_ID).subscribe(
      data=>this.tranferData = data.rows[0],
      error=>this.ui.createMessage("error","Coulnt fetch data"),
      ()=>this.isFetchingTransferData = false
    )
  }

  /** Get Edit data from resolver */
  getinvtransData(): void {
    this.invtransferRFormData = this.route.snapshot.data['invtransferstoreData'].rows[0]
  }


  /** Get item item id from route param */
  getinvtransid(): void {
    this.INV_TRANSFER_R_ID = this.route.snapshot.params['INV_TRANSFER_R_ID']
  }
  /** Update Item Alias form */
  updateinvtransfer(formData: any) {
    // this.operationsService.updatetransfer(this.INV_TRANSFER_R_ID, formData).subscribe(
    //   data => {
    //     this.ui.createMessage('success', 'Updated Inv Transfer')
    //     this.navigateToList()
    //   },
    //   error => {
    //     this.ui.createMessage('error', 'Error while updating Inv Transfer')
    //   }
    // )
  }



  invTransferItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.operationsService.getTransferRItems(this.INV_TRANSFER_R_ID).subscribe(
      data => {
        this.invTransferItems = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting inventory transfer list : ' + error.error.message)
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }


  readOnly = false;
  checkIfReadOnly() {
    if (this.invtransferRFormData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE;
    if(this.isCustodyTransfer){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.CUSTODY_TRANSFER_R;

    }else{
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_TRANSFER_R;

    }

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updatetransferR(this.INV_TRANSFER_R_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
      switchMap(REQUEST_ID => this.workFlowService.newActionPro(REQUEST_ID)),
    ).subscribe(
      done => {
        this.workFlowInitiateDone = true;
        this.readOnly = true;
        this.workFlowLoading = false;
      },
      error => {
        this.workFlowLoading = false
        this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }

}
