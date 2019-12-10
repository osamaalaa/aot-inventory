import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, iif, of } from 'rxjs';
import { OperationsService } from 'src/app/services/operations.service';
import { OperationMasterService } from '../../lib/OperationMasterService';
import { RcvDocItemsService } from '../../lib/Strategy/rcv-document/rcvDocItemStrategy';
import { RcvDocDetailService } from '../../lib/Strategy/rcv-document/rcvDocDetailsStrategy';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { HomeMenuService } from 'src/app/components/LayoutComponents/Topbar/HomeMenu/home-menu.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rcv-doc-view',
  templateUrl: './rcv-doc-view.component.html',
  styleUrls: ['./rcv-doc-view.component.scss'],
  providers: [
    OperationMasterService,
    RcvDocItemsService,
    RcvDocDetailService
  ],
})
export class RcvDocViewComponent implements OnInit {

  @Input() DOCUMENT_ID: any;

  rcvDocumentData: any = {};

  rcvDocumentItems: any[] = [];

  @Input() notificationData: any;


  constructor(
    private operationsService: OperationsService,
    public operationMasterService: OperationMasterService,
    private rcvDocItemsService: RcvDocItemsService,
    private rcvDocDetailService: RcvDocDetailService,
    private workFlowService: WorkFlowService,
    private dashboardService: DashboardService,
    private http: HttpClient,
    private drawerRef: NzDrawerRef,
    private homeMenuService: HomeMenuService
  ) {
    this.operationMasterService.setItemStrategy(this.rcvDocItemsService);
    this.operationMasterService.setDetailStrategy(this.rcvDocDetailService);
    this.operationMasterService.setMasterKey("DOCUMENT_ID")
    this.operationMasterService.setItemsKey("RCV_DOCUMENT_ITEMS_ID")
    this.operationMasterService.setDetailsKey("RCV_DOCUMENT_ITEMS_D_ID")
  }

  ngOnInit() {
    this.fetchData();
  }
  loading: boolean = false;
  fetchData() {
    this.loading = true;
    forkJoin([
      this.operationsService.getOneRcvDocument(this.DOCUMENT_ID),
      this.operationsService.getAllRcvDocumentITems(this.DOCUMENT_ID)
    ]).subscribe((results) => {
      this.loading = false;
      this.rcvDocumentData = results[0].rows[0] || {};
      this.rcvDocumentItems = results[1].rows;
    }, error => {
      this.loading = false;
    })
  }

  isAcceptLoading: boolean = false;

  isRejectLoading: boolean = false;
  whenApproveClicked() {
    this.isAcceptLoading = true;
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    this.workFlowService.approveRequestPro(this.notificationData.REQUEST_ID)
      .pipe(
        switchMap(data => {
          let isLastStep: boolean = this.notificationData.LAST_STEP_NEED_ACTION_FLAG == 'Y';
          return iif(() => isLastStep,
          this.http.post(`/issueproc/issueProcessingForRCVDoc`,{DOCUMENT_ID:this.notificationData.DOCUMENT_ID}) 
            , of(data)
          )
        })
      ).subscribe(
        success => {
          this.isAcceptLoading = false;
          this.drawerRef.close()
          this.homeMenuService.refreshNotification$.next(true)
        },
        error => {
          this.isAcceptLoading = false;
          this.drawerRef.close()
        }
      )
  }

  whenRejectClicked() {
    this.isRejectLoading = true;
    this.workFlowService.rejectRequestPro(this.notificationData.REQUEST_ID).subscribe((data) => {
      this.isRejectLoading = false;
      this.drawerRef.close()
      this.homeMenuService.refreshNotification$.next(true)
    }, error => {
      this.isRejectLoading = false;
      this.drawerRef.close()
    })
  }


}
