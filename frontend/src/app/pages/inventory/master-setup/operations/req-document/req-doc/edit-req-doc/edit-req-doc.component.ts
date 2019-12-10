import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { ReqDocFormComponent } from '../req-doc-form/req-doc-form.component';
import { ReqDocItemsService } from '../../../lib/Strategy/req-doc/reqDocItemsStrategy';
import { ReqDocDetailService } from '../../../lib/Strategy/req-doc/reqDocDetailsStrategy';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-req-doc',
  templateUrl: './edit-req-doc.component.html',
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
export class EditReqDocComponent implements OnInit {

  reqDocData: any;

  DOCUMENT_ID: string;

  // STORES_ID: string;

  readOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private http:HttpClient,
    private workFlowService: WorkFlowService,
    public operationMasterService:OperationMasterService
  ) {
    this.getreqDocData();
    this.getDocumentId();
    // this.getStoresId();
    this.fetchData()
    this.checkIfReadOnly();
  }


  checkIfReadOnly() {
    if (this.reqDocData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
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

  /** Get Edit data from resolver */
  getreqDocData(): void {
    this.reqDocData = this.route.snapshot.data['reqDocData'].rows[0];
    this.operationMasterService.STORES_ID = this.reqDocData.STORES_ID

  }


  /** Get  DOCUMENT_ID from route param */
  getDocumentId(): void {
    this.DOCUMENT_ID = this.route.snapshot.params['DOCUMENT_ID']

  }

  /** Get STORES_ID from route param */
  // getStoresId(): void {
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID']
  // }

  /** Update Stores items Group  form */
  updateReqDocument(formData: any) {

    this.operationsService.updateReqDocument(this.DOCUMENT_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated ');
        this.navigateToList();
      },
      error => {
        this.ui.createMessage('error', 'Error while updating ')
      }
    )
  }


  reqDocItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true;
    this.operationsService.geReqItemsAgainstDocumentId(this.DOCUMENT_ID).subscribe(
      data => {
        this.reqDocItems = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting reqDocItems list : ' + error.error.message)
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
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
      REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.REQ_DOCUMENT;
      // this.http.post(`/issueproc/issueProcessingForReqDocumentNew`,{DOCUMENT_ID:this.DOCUMENT_ID}).subscribe()

    }
    this.workFlowLoading = true;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateReqDocument(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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

  @ViewChild('formComp')formComp:ReqDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.updateReqDocument(this.formComp.form.getRawValue())
    }
  }

}
