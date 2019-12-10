import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';


@Component({
  selector: 'app-add-slow-moving-policy',
  templateUrl: './add-slow-moving-policy.component.html',
  styleUrls: ['./add-slow-moving-policy.component.scss']
})
export class AddSlowMovingPolicyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private generalSetupService:GeneralSetupService,
    private ui:UIService,
    private router:Router,
  ) { }

  ngOnInit() {}

  addItemgroup(formData:any):void{

    this.generalSetupService.InsetSmovingPolicyDetails(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added Slow Moving Policy');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_CODE_UQ) violated'){
          this.ui.createMessage('error', 'Group Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while adding item group')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['/inv/setup/slow-moving-policy'],{relativeTo:this.route})
  }



}
