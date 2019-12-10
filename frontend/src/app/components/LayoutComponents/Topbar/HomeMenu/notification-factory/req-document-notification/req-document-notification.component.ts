import { Component, OnInit, Input } from '@angular/core';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { HomeMenuService } from '../../home-menu.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { HttpClient } from '@angular/common/http';
import { ReqDocViewComponent } from 'src/app/pages/inventory/master-setup/operations/req-document/req-doc-view/req-doc-view.component';

@Component({
  selector: 'app-req-document-notification',
  templateUrl: './req-document-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class ReqDocumentNotificationComponent implements OnInit {

 
  @Input() notificationData:any;
  @Input() isItemReturnRequest:any;
  @Input() isItemLostRequest:any;
  @Input() isEmployeeCustodyRequest:any;
  @Input() isRequestItems:any;

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
        if(this.isItemReturnRequest){
          this.http.post(`/issueproc/issueProcessingForItemReturnRequest`,{DOCUMENT_ID:this.notificationData.ITEM_RETURN_REQUEST_ID}).subscribe()

        }
        else if(this.isEmployeeCustodyRequest){
          this.http.post(`/issueproc/issueProcessingForEmployeeCustody`,{DOCUMENT_ID:this.notificationData.EMPLOYEE_CUSTODY_REQUEST_ID}).subscribe()

        }
        else if(this.isRequestItems){
          this.http.post(`/issueproc/issueProcessingForReqDocumentNew`,{DOCUMENT_ID:this.notificationData.REQUEST_ITEM_DOCUMENT_ID}).subscribe()
        }
        else if(this.isItemLostRequest){
          this.http.post(`/issueproc/issueProcessingForItemLostRequest`,{DOCUMENT_ID:this.notificationData.ITEM_LOST_REQUEST_ID}).subscribe()

        }else{
          this.http.post(`/issueproc/issueProcessingForReqDocumentAction`,{DOCUMENT_ID:this.notificationData.REQUEST_DOCUMENT_ID}).subscribe()
        }
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

  
  openRcvDocument(REQUEST_DOCUMENT_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<ReqDocViewComponent, 
    { DOCUMENT_ID: string | number,
      notificationData:any,
      isItemReturnRequest:any;
      isItemLostRequest:any;
      isRequestItems:any;
      isEmployeeCustodyRequest:any;
     }, string>({
      nzTitle: "Request",
      nzContent: ReqDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: REQUEST_DOCUMENT_ID,
        notificationData:this.notificationData,
        isItemReturnRequest:this.isItemReturnRequest,
        isItemLostRequest:this.isItemLostRequest,
        isRequestItems:this.isRequestItems,
        isEmployeeCustodyRequest:this.isEmployeeCustodyRequest
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }



}
