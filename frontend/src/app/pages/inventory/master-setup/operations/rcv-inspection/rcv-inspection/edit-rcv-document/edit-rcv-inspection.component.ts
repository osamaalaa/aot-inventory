import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { switchMap } from 'rxjs/operators';
import { RcvInspectionFormComponent } from '../rcv-inspection-form/rcv-inspection-form.component';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { RcvInspDetailService } from '../../../lib/Strategy/rcv-inspection/rcvInspDetailsStrategy';
import { RcvInspItemsService } from '../../../lib/Strategy/rcv-inspection/rcvInspItemsStrategy';

@Component({
  selector: 'app-edit-rcv-inspection',
  templateUrl: './edit-rcv-inspection.component.html',
  providers: [
    OperationMasterService,
    RcvInspDetailService,
    RcvInspItemsService
  ],
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class EditRcvInspectionComponent implements OnInit {

  // STORES_ID: string | number;


  DOCUMENT_ID: string | number;

  rcvDocumentData: any;

  readOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ui: UIService,
    private router: Router,
    private operationsService:OperationsService,
    private workFlowService:WorkFlowService,
    public operationMasterService: OperationMasterService,
    private rcvInspItemsService: RcvInspItemsService,
    private rcvInspDetailService: RcvInspDetailService
  ) {
    this.getRcvDocumentData();
    this.getDocumentId();
    this.fetchData();

    this.operationMasterService.setItemStrategy(this.rcvInspItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvInspDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_INSPECTION_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_INSPECTION_ITEMS_D_ID")
  }

  ngOnInit() {
    this.checkIfReadOnly();
  }

  checkIfReadOnly() {
    if (this.rcvDocumentData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }



  /** Get Edit data from resolver */
  getRcvDocumentData(): void {
    this.rcvDocumentData = this.route.snapshot.data['rcvDocumentData'].rows[0];
  }


  getDocumentId(): void {
    this.DOCUMENT_ID = this.route.snapshot.params['DOCUMENT_ID'];
  }


  /** On update Rcv Document*/
  updateRcvInspection(formData: any): void {
    this.operationsService.updateRcvInspection(this.DOCUMENT_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated');
        this.navigateToList();
      },
      error => {
        if (error.error
          && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_LOCATIONS_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Rcv Inspection already taken')
        } else {
          this.ui.createMessage('error', 'Error while updating Rcv Inspection')
        }
      }
    )
  }

  rcvInspectionItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.operationsService.getAllRcvInspectionITems(this.DOCUMENT_ID).subscribe(
      data => {
        this.rcvInspectionItems = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Inspection list : ' + error.error.message)
      },
    )
  }

 /**Navigate to list on cancel */
 navigateToList(): void {
  this.router.navigate(['..'], { relativeTo: this.route })
}

@ViewChild('formComp') formComp: RcvInspectionFormComponent;
submitForm() {
  if (!this.formComp.form.valid) {
    this.ui.createMessage("warning", "Validate all fields")
  } else {
    this.updateRcvInspection(this.formComp.form.value)
  }
}

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.RCV_INSPECTION;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateRcvInspection(this.DOCUMENT_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
      switchMap(REQUEST_ID => this.workFlowService.newActionPro(REQUEST_ID)),
    ).subscribe(
      done => {
        this.readOnly = true;
        this.workFlowInitiateDone = true;
        this.workFlowLoading = false;
      },
      error => {
        this.workFlowLoading = false
        this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }

}
