import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from '../../home-menu.service';
import { InvTransferRViewComponent } from 'src/app/pages/inventory/master-setup/operations/transfers/transferR/inv-transferR-view/inv-transferR-view.component';
import { switchMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inv-transfer-r-notification',
  templateUrl: './inv-transfer-r-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class InvTransferRNotificationComponent implements OnInit {


  @Input() notificationData:any;
  @Input() isCustodyTransfer:any;

  constructor(
    private drawerService:NzDrawerService,
    private workFlowService:WorkFlowService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  openInvTransferComponent(INV_TRANSFER_R_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<InvTransferRViewComponent,
     { INV_TRANSFER_R_ID: string | number ,
      notificationData:any
    }, string>({
      nzTitle: !this.isCustodyTransfer ?  "Transfer Receiving" : "Custody transfer Receiving",
      nzContent: InvTransferRViewComponent,
      nzContentParams: {
        INV_TRANSFER_R_ID: INV_TRANSFER_R_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1000,
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
        this.http.post(`/issueproc/issueProcessingForInvTransferR`,
        {
          INV_TRANSFER_R_ID:this.isCustodyTransfer ? this.notificationData.CUSTODY_INV_TRANSFER_R_ID :  this.notificationData.INV_TRANSFER_R_ID
        })

        ,of())
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
