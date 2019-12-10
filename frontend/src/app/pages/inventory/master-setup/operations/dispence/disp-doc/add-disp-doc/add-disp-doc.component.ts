import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { DipsDocFormComponent } from '../disp-doc-form/disp-doc-form.component';
import { DispeneItemsService } from '../../../lib/Strategy/dispence/dispenceItemStrategy';
import { DispenceDetailService } from '../../../lib/Strategy/dispence/dispenceDetailsStrategy';

enum STEPS {
  DSP_DOC,
  DSP_DOC_ITEMS
}

@Component({
  selector: 'app-add-disp-doc',
  templateUrl: './add-disp-doc.component.html',
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
export class AddDipsDocComponent implements OnInit {

  // STORES_ID: string | number;

  currentStep = STEPS.DSP_DOC;

  DOCUMENT_ID:string;
  
  constructor(
    private route: ActivatedRoute,
    private operationsService:OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService:OperationMasterService
  ) {
    // this.getStoreId();
  }

  ngOnInit() {}

  // Get store id from route param 
  // getStoreId(): void {
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }


  savingForm = false;
  loadingStep = false;
  INV_OPEN_BALANCE_ID = null;
  // On Add Inv Open Balance
  addDispence(formData: any): void {
    this.loadingStep = true;
    this.savingForm = true;
    this.operationsService.addDispence(formData).subscribe(
      data => {
        this.loadingStep = false
        this.savingForm = false
        this.DOCUMENT_ID = data.rows.R_DOCUMENT_ID
        this.currentStep = STEPS.DSP_DOC_ITEMS
      },
      error => {
        this.loadingStep = false;
        this.savingForm = false;
      }
    )
  }

  @ViewChild('formComp')formComp:DipsDocFormComponent;
  submitForm(){
    if(!this.formComp.form.valid){
      this.ui.createMessage("warning","Validate all fields")
    }else{
      this.addDispence(this.formComp.form.value)
    }
  }

  workFlowLoading:boolean = false;
  workFlowInitiateDone: boolean = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID
    let body = {
      REQUEST_TYPE: CONSTANTS.WORKFLOW.REQUEST_TYPE.DISPENCE,
      DESCRIPTION: "",
      DELETED: 0,
      SUBSIDIARY_ID: 1,
      CLASSIFICATION_ID: 1,
      EMPLOYEE_ID: EMPLOYEE_ID
    }
    this.workFlowService.newRequest(body).subscribe(data => {
      let REQUEST_ID = data.rows.R_REQUEST_ID
      this.operationsService.updateDispenceDocument(this.INV_OPEN_BALANCE_ID, { WF_REQUEST_ID: REQUEST_ID }).subscribe(data => {
        this.workFlowInitiateDone = true;
        this.ui.createMessage("success", "WorkFlow initiated.")

      })
      let body = {
        "REQUEST_ID": REQUEST_ID,
        "ACTION_ID": CONSTANTS.WORKFLOW.ACTIONS.NEW,
        "FROM_DESTINATION_ID": DESTINATION_ID,
        "COMMENT": "welcome !"
      }
      this.workFlowService.newAction(body).subscribe((data)=>{
        this.workFlowLoading = false;
      },error=>{
        this.workFlowLoading = false;
      });


    },error=>{
      this.workFlowLoading = false;
    })
  }



  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
