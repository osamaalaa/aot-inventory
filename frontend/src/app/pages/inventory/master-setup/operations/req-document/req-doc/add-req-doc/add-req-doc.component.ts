import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { ReqDocFormComponent } from '../req-doc-form/req-doc-form.component';
import { ReqDocItemsService } from '../../../lib/Strategy/req-doc/reqDocItemsStrategy';
import { ReqDocDetailService } from '../../../lib/Strategy/req-doc/reqDocDetailsStrategy';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

enum STEPS {
  REQ_DOC,
  REQ_DOC_ITEMS
}

@Component({
  selector: 'app-add-req-doc',
  templateUrl: './add-req-doc.component.html',
  providers:[
    OperationMasterService,
    ReqDocItemsService,
    ReqDocDetailService
  ],
  styles:[`
  [nz-button] {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class AddReqDocComponent implements OnInit {

  // STORES_ID: string | number;

  currentStep = STEPS.REQ_DOC;


  STORES_ID:string;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    private http:HttpClient,
    public operationMasterService:OperationMasterService
  ) {
    // this.getStoreId();
  }
  isItemReturnRequest:any;
  isItemLostRequest:any;
  isEmployeeCustodyRequest:any;
  isReturnRequest:any;
  isRequestItems:any;
  ngOnInit() {
    this.route
    .data
    .subscribe(v => {
      this.isItemReturnRequest = v.isItemReturnRequest;
      this.isItemLostRequest = v.isItemLostRequest;
      this.isEmployeeCustodyRequest = v.isEmployeeCustodyRequest;
      this.isReturnRequest = v.isReturnRequest;
      this.isRequestItems = v.isRequestItems;

    });
  }

  // Get store id from route param 
  // getStoreId(): void {
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }


  savingForm = false;
  loadingStep = false;
  DOCUMENT_ID = null;
  // On Add Inv Open Balance
  addReqDocument(formData: any): void {
    this.loadingStep = true;
    this.savingForm = true;
    this.operationsService.addReqDoc(formData).subscribe(
      data => {
        this.operationMasterService.STORES_ID = formData.STORES_ID
        this.loadingStep = false
        this.savingForm = false
        this.DOCUMENT_ID = data.rows.R_DOCUMENT_ID
        this.currentStep = STEPS.REQ_DOC_ITEMS;
      },
      error => {
        this.loadingStep = false;
        this.savingForm = false;
      }
    )
  }

  @ViewChild('formComp')formComp:ReqDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.addReqDocument(this.formComp.form.getRawValue())
    }
  }


  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    let REQUEST_TYPE
    if(this.isItemReturnRequest){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.ITEM_RETURN_REQUEST;
    }else if ( this.isEmployeeCustodyRequest){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.EMPLOYEE_CUSTODY_REQUEST;

    }else if(this.isItemLostRequest){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.ITEM_LOSE_REQUEST;

    }
    else if(this.isRequestItems){
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.ITEM_REQUEST;

    }
    else {
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.ITEM_REQUEST;
      // this.http.post(`/issueproc/issueProcessingForReqDocumentNew`,{DOCUMENT_ID:this.DOCUMENT_ID}).subscribe()
      //fix it
    }
    this.workFlowLoading = true;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateReqDocument(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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
