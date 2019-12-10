import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { HomeMenuService } from '../../home-menu.service';
import { JoDispDocViewComponent } from 'src/app/pages/inventory/master-setup/operations/job-order-dispence/jo-disp-doc-view/jo-disp-doc-view.component';
import { HttpClient } from '@angular/common/http';
import { concat, flatMap, switchMap } from 'rxjs/operators';
import { of, iif, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dsp-document-notification',
  templateUrl: './dsp-document-notification.component.html',
  styleUrls: ['../requests.scss']
})
export class DspDocumentNotificationComponent implements OnInit {

  @Input() notificationData:any;

  constructor(
    private workFlowService:WorkFlowService,
    private drawerService:NzDrawerService,
    private homeMenuService:HomeMenuService,
    private http:HttpClient
  ) { }

  ngOnInit() {}



  whenApproveClicked(item,e) {
    e.stopPropagation();
    item.acceptLoading = true;
    this.workFlowService.approveRequestPro(item.REQUEST_ID)
    .pipe(
      switchMap(data=>{
        let isLastStep: boolean = item.LAST_STEP_NEED_ACTION_FLAG == 'Y';
        return iif(()=>isLastStep,
        forkJoin([
            this.http.post(`/issueproc/issueProcessingForDSPdoc`,{DSP_DOCUMENT_ID:this.notificationData.DSP_DOCUMENT_ID}),
            this.http.post(`/dspdocitemsd/addItemBalancedsp/${this.notificationData.DSP_DOCUMENT_ID}`,{})
        ]),of(data)
        )
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

  
  openDspDocument(DOCUMENT_ID,e): void {
    e.stopPropagation()
    const drawerRef = this.drawerService.create<JoDispDocViewComponent,
     { DOCUMENT_ID: string | number,
      notificationData:any }, string>({
      nzTitle: "Job Order Issue",
      nzContent: JoDispDocViewComponent,
      nzContentParams: {
        DOCUMENT_ID: DOCUMENT_ID,
        notificationData:this.notificationData
      },
      nzWidth: 1000,
      nzClosable:true
    });
  }


}
