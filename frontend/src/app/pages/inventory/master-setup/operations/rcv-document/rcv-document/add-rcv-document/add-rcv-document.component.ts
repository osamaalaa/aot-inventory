import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { RcvDocItemsService } from '../../../lib/Strategy/rcv-document/rcvDocItemStrategy';
import { RcvDocumentFormComponent } from '../rcv-document-form/rcv-document-form.component';
import { RcvDocDetailService } from '../../../lib/Strategy/rcv-document/rcvDocDetailsStrategy';
import { switchMap } from 'rxjs/operators';


enum STEPS{
  RCV_DOCUMENT,
  RCV_DOCUMENT_ITEMS,
  RCV_DOCUMENTS_ITEMS_D
}


@Component({
  selector: 'app-add-rcv-document',
  templateUrl: './add-rcv-document.component.html',
  providers: [
    OperationMasterService,
    RcvDocItemsService,
    RcvDocDetailService
  ],
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class AddRcvDocumentComponent implements OnInit {

  // STORES_ID: string | number;

  DOCUMENT_ID: string | number;

  currentStep = STEPS.RCV_DOCUMENT;

  isLoading = false;

  rcvDocumentItems= [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operationsService:OperationsService,
    private ui: UIService,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private rcvDocItemsService: RcvDocItemsService,
    private rcvDocDetailService: RcvDocDetailService
  ) {
    this.operationMasterService.setItemStrategy(this.rcvDocItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvDocDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_DOCUMENT_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_DOCUMENT_ITEMS_D_ID")
    
  }

  ngOnInit() {
  }
 
  /** On Add Rcv Document*/
  insertRcvDocument(formData: any) {
    this.operationsService.insertRcvDocument(formData).subscribe(data => {
      this.isLoading = false;
      let x = data.rows.R_DOCUMENT_ID;
      this.DOCUMENT_ID = parseInt(x)
      this.currentStep = STEPS.RCV_DOCUMENT_ITEMS
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
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.RCV_DOCUMENT;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateRcvDocument(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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

  
  @ViewChild('formComp') formComp: RcvDocumentFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.insertRcvDocument(this.formComp.form.value)
    }
  }
}
