import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { concat, switchMap, tap, map, finalize } from 'rxjs/operators';
import { InvTransferFormComponent } from '../inv-transfer-form/inv-transfer-form.component';
import { OperationMasterService } from '../../../../lib/OperationMasterService';
import { InvTransferItemsService } from '../../../../lib/Strategy/inv-transfer/invTrafItems.strategy';
import { InvTransferDetailService } from '../../../../lib/Strategy/inv-transfer/invTrafDetails.strategy';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
@Component({
  selector: 'app-edit-inv-transfer',
  templateUrl: './edit-inv-transfer.component.html',
  providers: [
    OperationMasterService,
    InvTransferItemsService,
    InvTransferDetailService
  ],
})
export class EditInvTransferComponent implements OnInit {

  invtransFormData: any;

  // STORES_ID: string | number;
  
  INV_TRANSFER_ID: string | number;


  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private invTransferItemsService: InvTransferItemsService,
    private invTransferDetailService: InvTransferDetailService
  ) {
    this.getinvtransData();
    this.getinvtransid();
    this.fetchData();
    this.operationMasterService.setItemStrategy(this.invTransferItemsService);
    this.operationMasterService.setDetailStrategy(this.invTransferDetailService);
    this.operationMasterService.setMasterKey("INV_TRANSFER_ID")
    this.operationMasterService.setItemsKey("INV_TRANSFER_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_TRANSFER_ITEMS_D_ID")
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

  /** Get Edit data from resolver */
  getinvtransData(): void {
    this.invtransFormData = this.route.snapshot.data['invtransferstoreData'].rows[0]
  }


  /** Get item item id from route param */
  getinvtransid(): void {
    this.INV_TRANSFER_ID = this.route.snapshot.params['INV_TRANSFER_ID']
  }
  /** Update Item Alias form */
  updateinvtransfer(formData: any) {
    this.operationsService.updatetransfer(this.INV_TRANSFER_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Inv Transfer')
        this.navigateToList()
      },
      error => {
        this.ui.createMessage('error', 'Error while updating Inv Transfer')
      }
    )
  }



  invTransferItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.operationsService.getInvTransferItemsAgainstInvTransferId(this.INV_TRANSFER_ID).subscribe(
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
    if (this.invtransFormData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE;
    if(this.isCustodyTransfer){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.CUSTODY_TRANSFER;

    }else{
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_TRANSFER;

    }

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updatetransfer(this.INV_TRANSFER_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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

  
  @ViewChild('formComp') formComp: InvTransferFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      let body = this.formComp.form.getRawValue()
      body.VALDIATED_DATE = null
      body.CONFIRMED_DATE = null
      this.updateinvtransfer(body)
    }
  }
}
