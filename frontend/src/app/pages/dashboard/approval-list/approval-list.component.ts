import { Component, OnInit,  } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { OpenBalViewComponent } from '../../inventory/master-setup/operations/open-balance/open-bal-view/open-bal-view.component';
import { UIService } from 'src/app/services/ui.service';
import { JoDispDocViewComponent } from '../../inventory/master-setup/operations/job-order-dispence/jo-disp-doc-view/jo-disp-doc-view.component';
import { JoReqDocViewComponent } from '../../inventory/master-setup/operations/job-order-req-doc/jo-req-doc-view/jo-req-doc-view.component';
import { RcvDocViewComponent } from '../../inventory/master-setup/operations/rcv-document/rcv-doc-view/rcv-doc-view.component';
// import { OpenBalViewComponent } from '../../inventory/master-setup/stores-setup/open-balance/open-bal-view/open-bal-view.component';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.scss'],
})
export class ApprovalListComponent implements OnInit {

  searchText = ''

  searchValue = '';

  ITEMS_ID: string | number;


  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    private workFlowService: WorkFlowService,
    private dashboardService: DashboardService,
    private drawerService:NzDrawerService,
    private http:HttpClient,
    private ui:UIService
  ) { }

  ngOnInit() {
    this.fetchApprovalListing()
  }


  notificationList = []
  isFetchingData:boolean = false;
  fetchApprovalListing(){
    this.isFetchingData = true;
    let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
    this.http.get(`/approvals/getAllApprovals/${DESTINATION_ID}`).subscribe(
      data=>{
        this.notificationList = data['rows']
        .filter(
          o=>(o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_OPEN_BALANCE && o.INV_OPEN_BALANCE_ID) || 
          o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.INV_TRANSFER || 
          o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.RCV_DOCUMENT||
          o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.DISPENCE||
          o.REQ_TYPE_ID == CONSTANTS.WORKFLOW.REQUEST_TYPE.REQ_DOCUMENT);
        this.isFetchingData = false;
      },
      error=>{
        this.isFetchingData = false;
      }
    )
  }


  openBalanceComponent(INV_OPEN_BALANCE_ID): void {
    const drawerRef = this.drawerService.create<OpenBalViewComponent, { INV_OPEN_BALANCE_ID: string | number }, string>({
      nzTitle: "Open Balance",
      nzContent: OpenBalViewComponent,
      nzContentParams: {
        INV_OPEN_BALANCE_ID: INV_OPEN_BALANCE_ID
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }

  whenApproveClicked(item) {
    let destination = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
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
          EMPLOYEE_ID :EMPLOYEE_ID,
          ID :item.INV_OPEN_BALANCE_ID,
          DOC_TYPE_ID:CONSTANTS.WORKFLOW.DOC_TYPE.OPEN_BALANCE
        }
        this.dashboardService.approveOpenBalance(body).subscribe(data=>{

        },error=>{
          this.ui.createMessage("error",error.error.message)
        })
        // this.fetchApprovalListing();
      }else{
        // this.fetchApprovalListing();
      }

      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
    }, error => {
      item.acceptLoading = false;
    }, () => {
      item.acceptLoading = false;
    })
  }

  whenRejectClicked(item) {
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
      // this.fetchApprovalListing();
      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
    }, error => {
      item.rejectLoading = false;
    })
  }



  rcvApprove(item) {
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
        // this.fetchApprovalListing();
        // this.homeMenuService.refreshNotification$.next(true)
        this.fetchApprovalListing()
      }else{
        // this.fetchApprovalListing();
      }
      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
    }, error => {
      item.acceptLoading = false;
    }, () => {
      item.acceptLoading = false;
    })
  }

  rcvReject(item) {
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
      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
      // this.fetchApprovalListing();
    }, error => {
      item.rejectLoading = false;
    })
  }
  reqApprove(item) {
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
        this.http.post(`/issueproc/issueProcessingForReqDoc`,{REQ_DOCUMENT_ID:item.REQ_DOCUMENT_ID}).subscribe()

        this.fetchApprovalListing()
      }
      this.fetchApprovalListing()
    }, error => {
      item.acceptLoading = false;
    }, () => {
      item.acceptLoading = false;
    })
  }

  reqReject(item) {
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
      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
      // this.fetchApprovalListing();
    }, error => {
      item.rejectLoading = false;
    })
  }
  dspApprove(item) {
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
        this.http.post(`/issueproc/issueProcessingForDSPdoc`,{DSP_DOCUMENT_ID:item.DSP_DOCUMENT_ID}).subscribe()
        this.http.post(`/dspdocitemsd/addItemBalancedsp/${item.DSP_DOCUMENT_ID}`,{}).subscribe()
        this.fetchApprovalListing()
      }
      this.fetchApprovalListing()
    }, error => {
      item.acceptLoading = false;
    }, () => {
      item.acceptLoading = false;
    })
  }

  dspReject(item) {
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
      // this.homeMenuService.refreshNotification$.next(true)
      this.fetchApprovalListing()
      // this.fetchApprovalListing();
    }, error => {
      item.rejectLoading = false;
    })
  }

  
  openRcvDocument(DOCUMENT_ID): void {
    const drawerRef = this.drawerService.create<RcvDocViewComponent, { DOCUMENT_ID: string | number }, string>({
      nzTitle: "RCV DOCUMENT",
      nzContent: RcvDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }

  openDspDocument(DOCUMENT_ID): void {
    const drawerRef = this.drawerService.create<JoDispDocViewComponent, { DOCUMENT_ID: string | number }, string>({
      nzTitle: "Job Order Issue",
      nzContent: JoDispDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }

  openReqDocument(DOCUMENT_ID): void {
    const drawerRef = this.drawerService.create<JoReqDocViewComponent, { DOCUMENT_ID: string | number }, string>({
      nzTitle: "Job Order",
      nzContent: JoReqDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }


}
