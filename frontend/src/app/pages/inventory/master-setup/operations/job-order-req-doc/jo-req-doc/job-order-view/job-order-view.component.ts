import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-order-view',
  templateUrl: './job-order-view.component.html',
  styleUrls: ['./job-order-view.component.scss']
})
export class JobOrderViewComponent implements OnInit {

  @Input() data:any;

  @Input() jobOrderId:any;

  jobOrderData:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.fetchJobOrderInformation()
  }


  fetchJobOrderInformation(){
    this.http.get(`/joborder/getOneJobOrdersByID/${this.jobOrderId}`).subscribe(data=>{
      this.jobOrderData = data['rows'][0]
      console.log(this.jobOrderData)
      console.log(this.data)
    })


   
  }

}
