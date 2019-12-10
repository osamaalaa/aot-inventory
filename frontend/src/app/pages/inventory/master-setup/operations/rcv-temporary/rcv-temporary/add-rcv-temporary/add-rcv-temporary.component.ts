import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { RcvTempDetailService } from '../../../lib/Strategy/rcv-temporary/rcvTempDetailsStrategy';
import { RcvTempItemsService } from '../../../lib/Strategy/rcv-temporary/rcvTempItemsStrategy';
import { switchMap } from 'rxjs/operators';
import { RcvDocumentFormComponent } from '../../../rcv-document/rcv-document/rcv-document-form/rcv-document-form.component';
import { RcvTemporaryFormComponent } from '../rcv-temporary-form/rcv-temporary-form.component';


enum STEPS{
  RCV_TEMP,
  RCV_TEMP_ITEMS
}


@Component({
  selector: 'app-add-rcv-temporary',
  templateUrl: './add-rcv-temporary.component.html',
  providers: [
    OperationMasterService,
    RcvTempItemsService,
    RcvTempDetailService
  ],
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class AddRcvTemporaryComponent implements OnInit {

  // STORES_ID: string | number;

  DOCUMENT_ID: string | number;

  currentStep = STEPS.RCV_TEMP;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operationsService:OperationsService,
    private ui: UIService,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private rcvTempItemsService: RcvTempItemsService,
    private rcvTempDetailService: RcvTempDetailService
  ) {
    this.operationMasterService.setItemStrategy(this.rcvTempItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvTempDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_TEMP_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_TEMP_ITEMS_D_ID")
    
  }
  

  ngOnInit() {}
 
  /** On Add Rcv Document*/
  insertRcvTemp(formData: any) {
    this.operationsService.insertRcvTemp(formData).subscribe(data => {
      this.loading = false;
      let x = data.rows.R_DOCUMENT_ID;
      this.DOCUMENT_ID = parseInt(x)
      this.currentStep = STEPS.RCV_TEMP_ITEMS
    },
      error => {
        this.ui.createMessage('error', 'Error while adding Rcv Document')
      }
    )
  }

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.RCV_TEMPORARY;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateRcvTemporary(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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
    this.router.navigate(['..','doc'], { relativeTo: this.route })
  }

  
  @ViewChild('formComp') formComp: RcvTemporaryFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.insertRcvTemp(this.formComp.form.value)
    }
  }
}
