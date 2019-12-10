import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { JOReqDocFormComponent } from '../jo-req-doc-form/jo-req-doc-form.component';
import { JOReqDocItemsService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-items.strategy';
import { JOReqDocDetailService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-details.strategy';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-jo-req-doc',
  templateUrl: './edit-jo-req-doc.component.html',
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
export class EditJOReqDocComponent implements OnInit {

  reqDocData: any;

  DOCUMENT_ID: string;

  STORES_ID: string;

  readOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService:OperationMasterService
  ) {
    this.getreqDocData();
    this.getDocumentId();
    this.getStoresId();
    this.fetchData()
    this.checkIfReadOnly();
  }


  checkIfReadOnly() {
    if (this.reqDocData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }

  ngOnInit() { }


  jobOrderId:string;
  /** Get Edit data from resolver */
  getreqDocData(): void {
    this.reqDocData = this.route.snapshot.data['reqDocData'].rows[0];
    this.jobOrderId = this.reqDocData.BASE_DOCUMENT_ID
  }


  /** Get  DOCUMENT_ID from route param */
  getDocumentId(): void {
    this.DOCUMENT_ID = this.route.snapshot.params['DOCUMENT_ID']

  }

  /** Get STORES_ID from route param */
  getStoresId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID']
  }

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
    this.workFlowLoading = true;
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.JO_REQ_DOCUMENT;

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


  @ViewChild('formComp')formComp:JOReqDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.updateReqDocument(this.formComp.form.value)
    }
  }

}
