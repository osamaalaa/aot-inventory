import { Component, OnInit, Input } from '@angular/core';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { HomeMenuService } from '../../home-menu.service';
import { RcvDocViewComponent } from 'src/app/pages/inventory/master-setup/operations/rcv-document/rcv-doc-view/rcv-doc-view.component';
import { RcvInspViewComponent } from 'src/app/pages/inventory/master-setup/operations/rcv-inspection/rcv-inspection-view/rcv-doc-view.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rcv-insp-notification',
  templateUrl: './rcv-insp-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class RcvInspNotificationComponent implements OnInit {

  @Input() notificationData:any;

  constructor(
    private workFlowService:WorkFlowService,
    private drawerService:NzDrawerService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  whenApproveClicked(item,e) {
    e.stopPropagation()
    let destination = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID
    let requestBody = {
      REQUEST_ID: item.REQUEST_ID,
      ACTION_ID: CONSTANTS.WORKFLOW.ACTIONS.APPROVE,
      FROM_DESTINATION_ID: destination,
      COMMENT: "Approving"
    }
    item.acceptLoading = true;
    this.workFlowService.approveRequest(requestBody).subscribe((data) => {
      item.acceptLoading = false;
      let isLastStep: boolean = item.LAST_STEP_NEED_ACTION_FLAG == 'Y';
      if (isLastStep) {
        let body = {
          DESTINATION_ID:destination,
          REQUEST_ID:item.REQUEST_ID
        }
        this.http.post(`/issueproc/issueProcessingForRCVInspection`,{DOCUMENT_ID:this.notificationData.RCV_INSPECTION_ID}).subscribe()

        // this.fetchApprovalListing();
        this.homeMenuService.refreshNotification$.next(true)
      }else{
        // this.fetchApprovalListing();
      }
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      item.acceptLoading = false;
    }, () => {
      item.acceptLoading = false;
    })
  }

  whenRejectClicked(item,e) {
    e.stopPropagation()
    item.rejectLoading = true;
    let destination = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
    let requestBody = {
      REQUEST_ID: item.REQUEST_ID,
      ACTION_ID: CONSTANTS.WORKFLOW.ACTIONS.REJECT,
      FROM_DESTINATION_ID: destination,
      COMMENT: "Rejected"
    }
    item.rejectLoading = true;
    this.workFlowService.rejectRequest(requestBody).subscribe((data) => {
      item.rejectLoading = false;
      this.homeMenuService.refreshNotification$.next(true)
      // this.fetchApprovalListing();
    }, error => {
      item.rejectLoading = false;
    })
  }

  
  openRcvDocument(DOCUMENT_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<RcvInspViewComponent, { DOCUMENT_ID: string | number,notificationData:any }, string>({
      nzTitle: "Inspection Receiving",
      nzContent: RcvInspViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }


}
