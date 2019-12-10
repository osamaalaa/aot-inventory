import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { RcvInspDetailService } from '../../../lib/Strategy/rcv-inspection/rcvInspDetailsStrategy';
import { RcvInspItemsService } from '../../../lib/Strategy/rcv-inspection/rcvInspItemsStrategy';
import { RcvInspectionFormComponent } from '../rcv-inspection-form/rcv-inspection-form.component';
import { switchMap } from 'rxjs/operators';


enum STEPS{
  RCV_INSPECTION,
  RCV_INSPECTION_ITEMS
}


@Component({
  selector: 'app-add-rcv-inspection',
  templateUrl: './add-rcv-inspection.component.html',
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
export class AddRcvInspectionComponent implements OnInit {

  // STORES_ID: string | number;

  DOCUMENT_ID: string | number;

  current = STEPS.RCV_INSPECTION;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operationsService:OperationsService,
    private ui: UIService,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private rcvInspItemsService: RcvInspItemsService,
    private rcvInspDetailService: RcvInspDetailService
  ) {
    this.operationMasterService.setItemStrategy(this.rcvInspItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvInspDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_INSPECTION_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_INSPECTION_ITEMS_D_ID")
  }

  ngOnInit() {}


 
  /** On Add Rcv Inspection*/
  insertRcvInspection(formData: any) {
    this.operationsService.insertRcvInspection(formData).subscribe(data => {
      this.loading = false;
      let x = data.rows.R_DOCUMENT_ID;
      this.DOCUMENT_ID = parseInt(x)
      this.current = STEPS.RCV_INSPECTION_ITEMS
    },
      error => {
        this.ui.createMessage('error', 'Error while adding Inspection')
      }
    )
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

  @ViewChild('formComp') formComp: RcvInspectionFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.insertRcvInspection(this.formComp.form.value)
    }
  }

}
