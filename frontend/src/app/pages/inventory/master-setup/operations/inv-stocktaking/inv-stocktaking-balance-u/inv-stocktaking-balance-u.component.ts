import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { switchMap } from 'rxjs/operators';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-inv-stocktaking-balance-u',
  templateUrl: './inv-stocktaking-balance-u.component.html',
  styleUrls: ['./inv-stocktaking-balance-u.component.scss']
})
export class InvStocktakingBalanceUComponent implements OnInit {
  
  formData

  INV_STOCKTAKING_ID

  constructor(
    private route:ActivatedRoute,
    private workFlowService:WorkFlowService,
    private operationsService:OperationsService
  ) { }

  ngOnInit() {
    this.getInvStocktakingId()
    this.getInvOpenBalanceData();

  }

  /** Get Edit data from resolver */
  getInvOpenBalanceData(): void {
    this.formData = this.route.snapshot.data['invStockTakingData'].rows[0];
    if(this.formData.WF_REQUEST_ID){
      this.workFlowInitiateDone = true;
    }
  }


  /** Get  INV_OPEN_BALANCE_ID from route param */
  getInvStocktakingId(): void {
    this.INV_STOCKTAKING_ID = this.route.snapshot.params['INV_STOCKTAKING_ID']

  }

  workFlowInitiateDone = false;
  workFlowLoading = false;
  onSaveAndSubmit() {
    this.workFlowLoading = true;
    let REQUEST_TYPE = CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_STOCKTAKING;

    this.workFlowService.newRequestPro(REQUEST_TYPE).pipe(
      switchMap(data => this.operationsService.updateInvStocking(this.INV_STOCKTAKING_ID, { WF_REQUEST_ID: data.rows.R_REQUEST_ID }).map(_ => data.rows.R_REQUEST_ID)),
      switchMap(REQUEST_ID => this.workFlowService.newActionPro(REQUEST_ID)),
    ).subscribe(
      done => {
        this.workFlowInitiateDone = true;
        this.workFlowLoading = false;
      },
      error => {
        this.workFlowLoading = false
        // this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }

}
