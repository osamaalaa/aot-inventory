




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';


@Component({
  selector: 'app-edit-slow-moving-policy',
  templateUrl: './edit-slow-moving-policy.component.html',
  styleUrls: ['./edit-slow-moving-policy.component.scss']
})

export class EditSlowMovingPolicyComponent implements OnInit {

  itemGroupFormDatas:any;
  SLOW_POLICY_ID:string | number;
  constructor(
    private route: ActivatedRoute,
    private generalSetupService:GeneralSetupService,
    private ui:UIService,
    private router:Router,
  )

  {


    this.getSlowmovingpolicy();
    this.getItemgroupId();
  }


getSlowmovingpolicy(){

  this.itemGroupFormDatas = this.route.snapshot.data['itemGroupFormDatas'].rows[0];
  // this.itemGroupFormDatas.STATUS = this.itemGroupFormDatas.STATUS.toString()

}

/*  getItemgroupData():void{
   this.itemGroupFormData = this.route.snapshot.data['itemgroupdate'].rows[0];
    this.itemGroupFormData.STATUS = this.itemGroupFormData.STATUS.toString()
   // console.log(this.itemGroupFormData)
  }

  */
  getItemgroupId():void{
    this.SLOW_POLICY_ID = this.route.snapshot.params['SLOW_POLICY_ID']
  }
  updateItemGroup(formData:any){
    //alert("hi"+this.SLOW_POLICY_ID)
    this.generalSetupService.updateSlowmovingpolicy(this.SLOW_POLICY_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated item group');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_CODE_UQ) violated'){
          this.ui.createMessage('error', 'Group Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while updating item group')
        }
      }
    )
  }
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }
  ngOnInit() {
  }

}
