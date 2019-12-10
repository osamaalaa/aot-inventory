import { OnInit, Component, ViewChild } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute, Router } from '@angular/router'
import { WorkFlowService } from 'src/app/services/api.workflow.service'
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { InvTransferFormComponent } from '../inv-transfer-form/inv-transfer-form.component';
import { concat, switchMap, tap, map, finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OperationMasterService } from '../../../../lib/OperationMasterService';
import { InvTransferItemsService } from '../../../../lib/Strategy/inv-transfer/invTrafItems.strategy';
import { InvTransferDetailService } from '../../../../lib/Strategy/inv-transfer/invTrafDetails.strategy';
enum STEPS {
  INV_TRANSFER,
  INV_TRANSFER_ITEMS,
  INV_TRANSFER_ITEMS_D
}
@Component({
  selector: 'app-add-inv-transfer',
  templateUrl: './add-inv-transfer.component.html',
  providers: [
    OperationMasterService,
    InvTransferItemsService,
    InvTransferDetailService
  ],
  
})
export class AddInvTransferComponent implements OnInit {

  currentStep = STEPS.INV_TRANSFER;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
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
  isCustodyTransfer
  ngOnInit() {
    this.route
    .data
    .subscribe(v => {
      this.isCustodyTransfer = v.isTransferCustody;
    });
   }


  savingForm = false;
  loadingStep = false;
  INV_TRANSFER_ID = null;
  addtransfer(formData: any): void {
    this.loadingStep = true;
    this.savingForm = true;
    this.operationsService.addtransfer(formData).subscribe(
      data => {
        this.loadingStep = false
        this.savingForm = false
        this.INV_TRANSFER_ID = data.rows.R_INV_TRANSFER_ID
        this.currentStep = STEPS.INV_TRANSFER_ITEMS
      },
      error => {
        this.loadingStep = false;
        this.savingForm = false;
      }
    )
  }

  @ViewChild('formComp') formComp: InvTransferFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.addtransfer(this.formComp.form.getRawValue())
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
        this.workFlowLoading = false;
      },
      error => {
        this.workFlowLoading = false
        this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }



  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
