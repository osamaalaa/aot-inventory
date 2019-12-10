import { Component, OnInit, Input } from '@angular/core';
import { InvStocktakingCommitteeFormComponent } from '../inv-stocktaking-committee-form/inv-stocktaking-committee-form.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { OperationsService } from 'src/app/services/operations.service';
import { Observable, forkJoin } from 'rxjs';
import { InvStocktakingService } from '../../inv-stocktaking.service';

@Component({
  selector: 'app-inv-stocktaking-committee-table',
  templateUrl: './inv-stocktaking-committee-table.component.html',
  styleUrls: ['./inv-stocktaking-committee-table.component.scss']
})
export class InvStocktakingCommitteeTableComponent implements OnInit {


  dataList = []
  @Input() INV_STOCKTAKING_ID;
  @Input() readOnly:boolean;
  constructor(
    private drawerService: NzDrawerService,
    private operationsService:OperationsService,
    private invStocktakingService:InvStocktakingService
  ) { }


  subscription
  ngOnInit() {
    this.fetchData();
  }



  addCommiteeMember() {
      this.openComp("Add Commitee Member").subscribe(
        data=>{
          if(data){
            this.operationsService.addInvStockingCommiteeMember(data).subscribe(
              result=>{
                this.fetchData()
              }
            )
          }
        }
      )
  }

  updateData(formData){
    this.openComp("Update Commitee",formData).subscribe(
      data=>{
        if(data){
          this.operationsService.updateInvStockingCommitee(formData.INV_STOCKTAKING_COMMITTEE_ID,data).subscribe(
            result=>{
              this.fetchData()
            }
          )
         
        }
      }
    )
  }


  deleteData(data){
    this.operationsService.updateInvStockingCommitee(data.INV_STOCKTAKING_COMMITTEE_ID,{ deleted: 1}).subscribe(_=>{
      this.fetchData()
    })
  }


  fetchData(){
    this.operationsService.getInvStocktakingCommitee(this.INV_STOCKTAKING_ID).subscribe(data=>{
      this.dataList = data['rows'];
    })
  }

  public openComp(title: string, formData?: any): Observable<any> {
    const drawerRef = this.drawerService.create<InvStocktakingCommitteeFormComponent, {
      INV_STOCKTAKING_ID: any,
      formData: any
    }, string>({
      nzTitle: title,
      nzContent: InvStocktakingCommitteeFormComponent,
      nzContentParams: {
        INV_STOCKTAKING_ID: this.INV_STOCKTAKING_ID,
        formData
      },
      nzWidth: 720
    });
    return drawerRef.afterClose
  }

}
