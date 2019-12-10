import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { OperationsService } from 'src/app/services/operations.service';
import { OpenBalanceItemsService } from '../../../lib/Strategy/openBalanceStrategy/openBalItemsStrategy';
import { OpenBalDetailService } from '../../../lib/Strategy/openBalanceStrategy/openBalDetailsStrategy';
import { OpenBalFormComponent } from '../open-bal-form/open-bal-form.component';
import { OperationMasterService } from '../../../lib/OperationMasterService';
import { concat, switchMap, finalize, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-edit-open-bal',
  templateUrl: './edit-open-bal.component.html',
  providers: [
    OperationMasterService,
    OpenBalanceItemsService,
    OpenBalDetailService
  ],
  styles: [`
  [nz-button] {
    margin-right: 8px;
    margin-bottom: 12px;
  }`]
})
export class EditOpenBalComponent implements OnInit {

  invOpenBalanceData: any;

  INV_OPEN_BALANCE_ID: string;

  // STORES_ID: string | number;

  readOnly: boolean = false;

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
    this.operationMasterService.setItemStrategy(this.openBalanceItemsService);
    this.operationMasterService.setDetailStrategy(this.openBalDetailService);
    this.operationMasterService.setMasterKey("INV_OPEN_BALANCE_ID")
    this.operationMasterService.setItemsKey("INV_OPEN_BALANCE_ITEMS_ID")
    this.operationMasterService.setDetailsKey("INV_OPEN_BALANCE_ITEMS_D_ID")
    this.getInvOpenBalanceData();
    this.getInvOpenBalanceId();
    // this.getStoresId();
    this.fetchData()
    this.checkIfReadOnly();
  }


  checkIfReadOnly() {
    if (this.invOpenBalanceData.WF_REQUEST_ID) {
      this.readOnly = true;
    }
  }

  ngOnInit() { }

  /** Get Edit data from resolver */
  getInvOpenBalanceData(): void {
    this.invOpenBalanceData = this.route.snapshot.data['invOpenBalanceData'].rows[0];
  }


  /** Get  INV_OPEN_BALANCE_ID from route param */
  getInvOpenBalanceId(): void {
    this.INV_OPEN_BALANCE_ID = this.route.snapshot.params['INV_OPEN_BALANCE_ID']

  }

  /** Update Stores items Group  form */
  updateInvOpenBalance(formData: any) {

    this.operationsService.updateInvOpenBalance(this.INV_OPEN_BALANCE_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Inv Open Balance');
        this.navigateToList();
      },
      error => {
        this.ui.createMessage('error', 'Error while updating Inv Open Balance')
      }
    )
  }


  openBalanceItems = []
  isDataLoading = false
  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.operationsService.getInvBalanceAgainstInvOpenBalanceId(this.INV_OPEN_BALANCE_ID).subscribe(
      data => {
        this.openBalanceItems = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting openBalanceItems list : ' + error.error.message)
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
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_OPEN_BALANCE;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateInvOpenBalance(this.INV_OPEN_BALANCE_ID, 
        { 
          WF_REQUEST_ID: data.rows.R_REQUEST_ID ,
          DOCUMENT_STATUS:CONSTANTS.DOCUMENT_STATUS.PENDING
        }).map(_ => data.rows.R_REQUEST_ID)),
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

  @ViewChild('formComp') formComp: OpenBalFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.updateInvOpenBalance(this.formComp.form.value)
    }
  }

}
