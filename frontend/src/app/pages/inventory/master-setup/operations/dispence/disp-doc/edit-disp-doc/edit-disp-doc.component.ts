import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { DipsDocFormComponent } from '../disp-doc-form/disp-doc-form.component';
import { DispenceDetailService } from '../../../lib/Strategy/dispence/dispenceDetailsStrategy';
import { DispeneItemsService } from '../../../lib/Strategy/dispence/dispenceItemStrategy';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-disp-doc',
  templateUrl: './edit-disp-doc.component.html',
  providers:[
    OperationMasterService,
    DispeneItemsService,
    DispenceDetailService
  ],
  styles:[`
  [nz-button] {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class EditDipsDocComponent implements OnInit {

  dispDocData: any;

  DOCUMENT_ID: string;

  // STORES_ID: string;

  readOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService:OperationMasterService
  ) {
    this.getdispDocData();
    this.getDocumentId();
    // this.getStoresId();
    this.fetchData()
    this.checkIfReadOnly();
  }


  checkIfReadOnly() {
    if (this.dispDocData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }

  ngOnInit() { }

  /** Get Edit data from resolver */
  getdispDocData(): void {
    this.dispDocData = this.route.snapshot.data['dispenceData'].rows[0];
    this.operationMasterService.STORES_ID = this.dispDocData.STORES_ID

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
  updateDispenceDoc(formData: any) {

    this.operationsService.updateDispenceDoc(this.DOCUMENT_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated');
        this.navigateToList();
      },
      error => {
        this.ui.createMessage('error', 'Error while updating')
      }
    )
  }


  dispenceItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true;
    this.operationsService.getDispenceItemsAgainstDocumentId(this.DOCUMENT_ID).subscribe(
      data => {
        this.dispenceItems = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting dispenceItems list : ' + error.error.message)
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
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.ITEM_RECEIVE_REQUEST;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateDispenceDocument(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
      switchMap(REQUEST_ID => this.workFlowService.newActionPro(REQUEST_ID)),
    ).subscribe(
      done => {
        this.readOnly = true
        this.workFlowInitiateDone = true;
        this.workFlowLoading = false;
      },
      error => {
        this.workFlowLoading = false
        this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }



  @ViewChild('formComp')formComp:DipsDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.updateDispenceDoc(this.formComp.form.value)
    }
  }

}
