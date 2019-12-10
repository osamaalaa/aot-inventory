import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { JODipsDocFormComponent } from '../jo-disp-doc-form/jo-disp-doc-form.component';
import { DispeneItemsService } from '../../../lib/Strategy/dispence/dispenceItemStrategy';
import { DispenceDetailService } from '../../../lib/Strategy/dispence/dispenceDetailsStrategy';
import { JODispeneItemsService } from '../../../lib/Strategy/job-order-dispence/joDispenceItemStrategy';
import { JODispenceDetailService } from '../../../lib/Strategy/job-order-dispence/joDispenceDetailsStrategy';
import { switchMap } from 'rxjs/operators';

enum STEPS {
  DSP_DOC,
  DSP_DOC_ITEMS
}

@Component({
  selector: 'app-add-jo-disp-doc',
  templateUrl: './add-jo-disp-doc.component.html',
  providers:[
    OperationMasterService,
    JODispeneItemsService,
    JODispenceDetailService
  ],
  styles:[`
  [nz-button] {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class AddJODipsDocComponent implements OnInit {

  // STORES_ID: string | number;

  currentStep = STEPS.DSP_DOC;

  DOCUMENT_ID:string;
  
  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,    
    public operationMasterService:OperationMasterService,
    private jODispeneItemsService:JODispeneItemsService,
    private jODispenceDetailService:JODispenceDetailService,
  ) {
  

    this.operationMasterService.setItemStrategy(this.jODispeneItemsService);
    this.operationMasterService.setDetailStrategy(this.jODispenceDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("DSP_DOCUMENT_ITEMS_ID")
    this.operationMasterService.setDetailsKey("DSP_DOCUMENT_ITEMS_D_ID")
  }

  ngOnInit() {}



  savingForm = false;
  loadingStep = false;
  // On Add Inv Open Balance
  addDispence(formData: any): void {
    // this.loadingStep = true;
    // this.savingForm = true;
    // this.operationsService.addDispence(formData).subscribe(
    //   data => {
    //     this.loadingStep = false
    //     this.savingForm = false
    //     this.DOCUMENT_ID = data.rows.R_DOCUMENT_ID
    //     this.currentStep = STEPS.DSP_DOC_ITEMS
    //   },
    //   error => {
    //     this.loadingStep = false;
    //     this.savingForm = false;
    //   }
    // )
  }

  @ViewChild('formComp')formComp:JODipsDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.addDispence(this.formComp.form.value)
    }
  }

  
  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    // this.workFlowLoading = true;
    // let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_OPEN_BALANCE;

    // this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
    //   switchMap(data => this.operationsService.updatetransfer(this.INV_TRANSFER_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
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
