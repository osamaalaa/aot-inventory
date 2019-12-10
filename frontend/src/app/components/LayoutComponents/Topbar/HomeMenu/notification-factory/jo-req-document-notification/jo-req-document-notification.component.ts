import { Component, OnInit, Input } from '@angular/core';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { HomeMenuService } from '../../home-menu.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { JoReqDocViewComponent } from 'src/app/pages/inventory/master-setup/operations/job-order-req-doc/jo-req-doc-view/jo-req-doc-view.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jo-req-document-notification',
  templateUrl: './jo-req-document-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class JOReqDocumentNotificationComponent implements OnInit {

 
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

        this.http.post(`/issueproc/issueProcessingForReqDoc`,{REQ_DOCUMENT_ID:this.notificationData.REQ_DOCUMENT_ID}).subscribe()
        // this.fetchApprovalListing();
        this.homeMenuService.refreshNotification$.next(true)
      }else{
        // this.fetchApprovalListing();
      }
      
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
    const drawerRef = this.drawerService.create<JoReqDocViewComponent, 
    { DOCUMENT_ID: string | number,
      notificationData:any
     }, string>({
      nzTitle: "Job Order",
      nzContent: JoReqDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }



}
