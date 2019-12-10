import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from '../../home-menu.service';
import { switchMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InvStocktakingViewComponent } from 'src/app/pages/inventory/master-setup/operations/inv-stocktaking/inv-stocktaking-view/inv-stocktaking-view.component';

@Component({
  selector: 'app-inv-stocking-notification',
  templateUrl: './inv-stocking-notification.component.html',
  styleUrls: ['../requests.scss']

})
export class InvStockingNotificationComponent implements OnInit {

  @Input() notificationData:any;

  constructor(
    private drawerService:NzDrawerService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  openInvTransferComponent(INV_STOCKTAKING_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<InvStocktakingViewComponent,
     { INV_STOCKTAKING_ID: string | number ,
      notificationData:any
    }, string>({
      nzTitle: "Physical Inventory",
      nzContent: InvStocktakingViewComponent,
      nzContentParams: {
        INV_STOCKTAKING_ID: INV_STOCKTAKING_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1200,
      nzClosable:true
    });
  }

  whenApproveClicked(item,e) {
    e.stopPropagation();
    item.acceptLoading = true;
    this.workFlowService.approveRequestPro(item.REQUEST_ID)
    .pipe(
      switchMap(_=>{
        let isLastStep: boolean = item.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        return iif(()=>isLastStep,
        this.http.post(`/issueproc/issueProcessingForInvStocking`,{INV_STOCKTAKING_ID:this.notificationData.INV_STOCKTAKING_ID}) 

        ,of(_))
      })
    ).subscribe(
      success=>{
        item.acceptLoading = false;
        this.homeMenuService.refreshNotification$.next(true)
      },
      error=>{
        item.acceptLoading = false;
      }
    )
  }

  whenRejectClicked(item,e) {
    e.stopPropagation()
    item.rejectLoading = true;
    this.workFlowService.rejectRequestPro(item.REQUEST_ID).subscribe((data) => {
      item.rejectLoading = false;
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      item.rejectLoading = false;
    })
  }


}
