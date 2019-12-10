import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { OperationsService } from 'src/app/services/operations.service';
import { ReqCommiteeFormComponent } from './req-commitee-form/req-commitee-form.component';

@Component({
  selector: 'app-req-committee',
  templateUrl: './req-committee.component.html',
  styleUrls: ['./req-committee.component.scss']
})
export class ReqCommitteeComponent implements OnInit {


  dataList = []
  @Input() DOCUMENT_ID;
  @Input() readOnly: boolean;
  constructor(
    private drawerService: NzDrawerService,
    private operationsService: OperationsService,
  ) { }


  subscription
  ngOnInit() {
    this.fetchData();
  }



  addCommiteeMember() {
    this.openComp("Add Commitee Member").subscribe(
      data => {
        if (data && data.length > 0) {
          let currentIds = this.dataList.map(o => o.EMPLOYEE_ID);

          let newIds = data.filter(o => {
            return currentIds.indexOf(o.EMPLOYEE_ID) == -1
          })

          let resources = []
          if (newIds.length > 0) {
            resources = newIds.map(o => {
              let body = {
                DOCUMENT_ID: this.DOCUMENT_ID,
                ARRANGEMENT_NO: 0,
                EMPLOYEE_ID: o.EMPLOYEE_ID,
                EMPLOYEE_POSITION: null,
                NOTES: null,
                CREATED_BY: null
              }

              return this.operationsService.addInvRequestCommiteeMember(body)
            })


            forkJoin(resources).subscribe(result=>{
              this.fetchData()
            })
          }
          // this.operationsService.addInvRequestCommiteeMember(data).subscribe(
          //   result => {
          //     this.fetchData()
          //   }
          // )


        }
      }
    )
  }

  updateData(formData) {
    this.openComp("Update Commitee", formData).subscribe(
      data => {
        if (data) {
          this.operationsService.updateInvRequestCommitee(formData.INV_REQUEST_COMMITTEE_ID, data).subscribe(
            result => {
              this.fetchData()
            }
          )

        }
      }
    )
  }


  deleteData(data) {
    this.operationsService.updateInvRequestCommitee(data.INV_REQUEST_COMMITTEE_ID, { deleted: 1 }).subscribe(_ => {
      this.fetchData()
    })
  }


  fetchData() {
    this.operationsService.getInvRequestCommitee(this.DOCUMENT_ID).subscribe(data => {
      this.dataList = data['rows'];
    })
  }

  public openComp(title: string, formData?: any): Observable<any> {
    const drawerRef = this.drawerService.create<ReqCommiteeFormComponent, {

    }, string>({
      nzTitle: title,
      nzContent: ReqCommiteeFormComponent,
      nzContentParams: {

      },
      nzWidth: 720
    });
    return drawerRef.afterClose
  }


}
