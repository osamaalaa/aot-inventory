import { OnInit, Component, ViewChild } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute, Router } from '@angular/router'
import { WorkFlowService } from 'src/app/services/api.workflow.service'
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { switchMap } from 'rxjs/operators';
import { InvTransferRFormComponent } from '../inv-transferR-form/inv-transferR-form.component';
import { OperationMasterService } from '../../../../lib/OperationMasterService';
import { InvTransferRItemsService } from '../../../../lib/Strategy/inv-transfer-R/invTransferRItems';
import { InvTransferRDetailService } from '../../../../lib/Strategy/inv-transfer-R/invTransferRDetails';
enum STEPS {
  INV_TRANSFER,
  INV_TRANSFER_ITEMS,
  INV_TRANSFER_ITEMS_D
}
@Component({
  selector: 'app-add-inv-transferR',
  templateUrl: './add-inv-transferR.component.html',
  providers: [
    OperationMasterService,
    InvTransferRItemsService,
    InvTransferRDetailService
  ],
  
})
export class AddInvTransferRComponent implements OnInit {

  currentStep = STEPS.INV_TRANSFER;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
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

  @ViewChild('formComp') formComp: InvTransferRFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.addtransfer(this.formComp.form.value)
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
