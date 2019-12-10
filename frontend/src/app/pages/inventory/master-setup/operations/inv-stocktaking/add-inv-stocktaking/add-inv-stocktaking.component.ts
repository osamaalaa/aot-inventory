import { Component, OnInit, ViewChild } from '@angular/core';
import { InvStocktakingFormComponent } from '../inv-stocktaking-form/inv-stocktaking-form.component';
import { UIService } from 'src/app/services/ui.service';
import { OperationsService } from 'src/app/services/operations.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { switchMap } from 'rxjs/operators';
import { InvStocktakingService } from '../inv-stocktaking.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-inv-stocktaking',
  templateUrl: './add-inv-stocktaking.component.html',
  styles: [`
  .but-class {
    margin-right: 8px;
    margin-bottom: 12px;
  }`],
  providers:[InvStocktakingService]
})
export class AddInvStocktakingComponent implements OnInit {

  INV_STOCKTAKING_ID:string;

  savingForm:boolean

  physicalEntry:boolean

  constructor(
    private ui:UIService,
    private operationsService:OperationsService,
    private workFlowService:WorkFlowService,
    public invStocktakingService:InvStocktakingService,
    private http:HttpClient,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
  }

  @ViewChild('formComp') formComp: InvStocktakingFormComponent;
  submitForm() {
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    } else {
      if(this.INV_STOCKTAKING_ID){
       
      }
      this.addInvStockTaking(this.formComp.form.value)
    }
  }

  onPhysicalEntryChange(e){
    this.invStocktakingService.isPhysicalEntryEnabled = e;
    this.invStocktakingService.onPhysicalEntrySwitchChange.next(e)
  }


  onSaveAndExit(){
    if(!this.invStocktakingService.isPhysicalEntryEnabled && this.invStocktakingService.isItemsEmpty){
      this.ui.createMessage("error","Atleast 1 item is required")
      return;
    }
    if (!this.formComp.form.valid) {
      this.ui.createMessage("warning", "Validate all fields")
    }else{
      this.operationsService.updateInvStocking(this.INV_STOCKTAKING_ID,this.formComp.form.value).subscribe(_=>{
        this.callProcedure().subscribe(_=>{
          this.router.navigate(['..'],{relativeTo:this.route})
        })
      });

    }
  }





  callProcedure(){
    return this.http.post('/issueproc/issueProcessingForSaveInvStocking',{INV_STOCKTAKING_ID:this.INV_STOCKTAKING_ID })
  }

  addInvStockTaking(formData){
    this.savingForm = true;
    this.operationsService.addInvStocking(formData).subscribe(data=>{
      this.savingForm = false
      this.INV_STOCKTAKING_ID = data['rows'].R_INV_STOCKTAKING_ID
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
