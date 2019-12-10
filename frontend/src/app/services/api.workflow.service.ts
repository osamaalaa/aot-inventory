import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSTANTS } from './constants.service';

@Injectable()
export class WorkFlowService{
    workFlowCheckHeader:HttpHeaders;
    constructor(private http:HttpClient){
        this.workFlowCheckHeader = new HttpHeaders().set('RESOURCE_NAME','WORKFLOW')
    }


    pushRequest(formData):Observable<any>{
        return this.http.post(`/requests/requestSubmit`,formData,{
            headers:this.workFlowCheckHeader
        })
    }

    newRequest(formData:any):Observable<any>{
        return this.http.post(`/requests/newrequest`,formData,{
            headers:this.workFlowCheckHeader
        })
    }

    newRequestPro(REQUEST_TYPE:string | number,DESCRIPTION:string = ""):Observable<any>{
        let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;

        let body = {
            REQUEST_TYPE,
            DESCRIPTION,
            DELETED: 0,
            SUBSIDIARY_ID: CONSTANTS.SUBSIDIARY_ID,
            CLASSIFICATION_ID: 1,
            EMPLOYEE_ID
        }
        return this.http.post(`/requests/newrequest`,body,{
            headers:this.workFlowCheckHeader
        })
    }

    newAction(formData:any):Observable<any>{
        return this.http.post(`/newactions/takenewaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }

    newActionPro(REQUEST_ID,COMMENT:string = ""):Observable<any>{
        let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
        let body = {
          REQUEST_ID,
          ACTION_ID: CONSTANTS.WORKFLOW.ACTIONS.NEW,
          FROM_DESTINATION_ID: DESTINATION_ID,
          COMMENT
        }

        return this.http.post(`/newactions/takenewaction`,body,{
            headers:this.workFlowCheckHeader
        })
    }


    approveRequest(formData):Observable<any>{
        return this.http.post(`/approveactions/takeapproveaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }
    approveRequestPro(REQUEST_ID:string | number,COMMENT:string = ""):Observable<any>{
        let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
        let body = {
            REQUEST_ID,
            ACTION_ID: CONSTANTS.WORKFLOW.ACTIONS.APPROVE,
            FROM_DESTINATION_ID: DESTINATION_ID,
            COMMENT: "Approving"
          }
        return this.http.post(`/approveactions/takeapproveaction`,body,{
            headers:this.workFlowCheckHeader
        })
    }
    rejectRequest(formData):Observable<any>{
        return this.http.post(`/rejectactions/takerejectaction`,formData,{
            headers:this.workFlowCheckHeader
        })
    }
    rejectRequestPro(REQUEST_ID:string | number,COMMENT:string = "Rejected"):Observable<any>{
        let DESTINATION_ID = JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID;
        let body = {
            REQUEST_ID,
            ACTION_ID: CONSTANTS.WORKFLOW.ACTIONS.REJECT,
            FROM_DESTINATION_ID: DESTINATION_ID,
            COMMENT
          }
        return this.http.post(`/rejectactions/takerejectaction`,body,{
            headers:this.workFlowCheckHeader
        })
    }


}