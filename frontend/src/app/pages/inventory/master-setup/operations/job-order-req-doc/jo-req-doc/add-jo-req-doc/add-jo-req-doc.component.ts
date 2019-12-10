import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { JOReqDocFormComponent } from '../jo-req-doc-form/jo-req-doc-form.component';
import { JOReqDocItemsService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-items.strategy';
import { JOReqDocDetailService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-details.strategy';

enum STEPS {
  REQ_DOC,
  REQ_DOC_ITEMS
}

@Component({
  selector: 'app-add-jo-req-doc',
  templateUrl: './add-jo-req-doc.component.html',
  providers:[
    OperationMasterService,
    JOReqDocItemsService,
    JOReqDocDetailService
  ],
  styles:[`
  [nz-button] {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class JOAddReqDocComponent implements OnInit {

  STORES_ID: string | number;

  currentStep = STEPS.REQ_DOC;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService:OperationMasterService
  ) {
    this.getStoreId();
  }

  ngOnInit() {}

  // Get store id from route param 
  getStoreId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }


  savingForm = false;
  loadingStep = false;
  DOCUMENT_ID = null;
  // On Add Inv Open Balance
  addReqDocument(formData: any): void {
  
  }

  @ViewChild('formComp')formComp:JOReqDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.addReqDocument(this.formComp.form.value)
    }
  }

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    // this.workFlowLoading = true;
    // let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.DISPENCE;

    // this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
    //   switchMap(data => this.operationsService.updateDispenceDocument(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
    //   switchMap(REQUEST_ID => this.workFlowService.newActionPro(REQUEST_ID)),
    // ).subscribe(
    //   done => {
    //     this.workFlowInitiateDone = true;
    //     this.workFlowLoading = false;
    //   },
    //   error => {
    //     this.workFlowLoading = false
    //     this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
    //   }
    // )
  }



  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
