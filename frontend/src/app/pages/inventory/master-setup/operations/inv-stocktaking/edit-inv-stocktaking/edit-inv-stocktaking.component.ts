import { Component, OnInit, ViewChild } from '@angular/core';
import { InvStocktakingFormComponent } from '../inv-stocktaking-form/inv-stocktaking-form.component';
import { UIService } from 'src/app/services/ui.service';
import { OperationsService } from 'src/app/services/operations.service';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from 'src/app/services/constants.service';
import { switchMap } from 'rxjs/operators';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { InvStocktakingService } from '../inv-stocktaking.service';

@Component({
  selector: 'app-edit-inv-stocktaking',
  templateUrl: './edit-inv-stocktaking.component.html',
  styleUrls: ['./edit-inv-stocktaking.component.scss'],
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`],
  providers:[InvStocktakingService]
})
export class EditInvStocktakingComponent implements OnInit {

  INV_STOCKTAKING_ID: string;


  formData: any;

  constructor(
    private ui: UIService,
    private operationsService: OperationsService,
    private route: ActivatedRoute,
    private workFlowService:WorkFlowService
  ) { }

  ngOnInit() {
    this.getInvOpenBalanceData();
    this.getInvStocktakingId()
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

  @ViewChild('formComp') formComp: InvStocktakingFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      this.updateInvStocktaking(this.formComp.form.value)
    }
  }

  savingForm:boolean
  updateInvStocktaking(formData:any) {
    this.savingForm = true;
    this.operationsService.updateInvStocking(this.INV_STOCKTAKING_ID,formData).subscribe(data => {  
      this.savingForm = false;
    })
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
        this.ui.createMessage("error", error && error.error ? error.error.message : "Something went Wrong!")
      }
    )
  }
}
