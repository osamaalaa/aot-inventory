import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OpenBalDetailService } from '../../../lib/Strategy/openBalanceStrategy/openBalDetailsStrategy';
import { UserService } from 'src/app/services/user.service';
import { flatMap, catchError, finalize, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { OpenBalFormComponent } from '../open-bal-form/open-bal-form.component';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { OpenBalanceItemsService } from '../../../lib/Strategy/openBalanceStrategy/openBalItemsStrategy';

enum STEPS {
  OPEN_BALANCE,
  OPEN_BALANCE_ITEMS
}

@Component({
  selector: 'app-add-open-bal',
  templateUrl: './add-open-bal.component.html',
  providers: [
    OperationMasterService,
    OpenBalanceItemsService,
    OpenBalDetailService
  ],
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class AddOpenBalComponent implements OnInit {

  // STORES_ID: string | number;

  currentStep = STEPS.OPEN_BALANCE;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService,
    private ui: UIService,
    private router: Router,
    private workFlowService: WorkFlowService,
    public operationMasterService: OperationMasterService,
    private openBalanceItemsService: OpenBalanceItemsService,
    private openBalDetailService: OpenBalDetailService
  ) {
    // this.getStoreId();
    this.operationMasterService.setItemStrategy(this.openBalanceItemsService);
    this.operationMasterService.setDetailStrategy(this.openBalDetailService);
    this.operationMasterService.setMasterKey("INV_OPEN_BALANCE_ID")
    this.operationMasterService.setItemsKey("INV_OPEN_BALANCE_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_OPEN_BALANCE_ITEMS_D_ID")
  }

  ngOnInit() { }

  // Get store id from route param 
  // getStoreId(): void {
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }


  savingForm = false;
  loadingStep = false;
  INV_OPEN_BALANCE_ID = null;
  // On Add Inv Open Balance
  addInvOpenBalance(formData: any): void {
    this.loadingStep = true;
    this.savingForm = true;
    this.operationsService.addInvOpenBalance(formData).subscribe(
      data => {
        this.loadingStep = false
        this.savingForm = false
        this.INV_OPEN_BALANCE_ID = data.rows.R_INV_OPEN_BALANCE_ID
        this.currentStep = STEPS.OPEN_BALANCE_ITEMS
      },
      error => {
        this.loadingStep = false;
        this.savingForm = false;
      }
    )
  }

  @ViewChild('formComp') formComp: OpenBalFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.addInvOpenBalance(this.formComp.form.value)
    }
  }


  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_OPEN_BALANCE;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateInvOpenBalance(this.INV_OPEN_BALANCE_ID, 
        { 
          WF_REQUEST_ID: data.rows.R_REQUEST_ID,
          DOCUMENT_STATUS:CONSTANTS.DOCUMENT_STATUS.PENDING
        }).map(_ => data.rows.R_REQUEST_ID)),
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
