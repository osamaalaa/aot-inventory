import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-itemgroup',
  templateUrl: './edit-itemgroup.component.html',
  styleUrls: ['./edit-itemgroup.component.scss']
})
export class EditItemgroupComponent implements OnInit {

  itemGroupFormData:any;
  ITEMS_GROUP_ID:string | number;
  constructor(
    private route: ActivatedRoute,
    private itemsService:ItemsService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getItemgroupData();
    this.getItemgroupId();
  }

  getItemgroupData():void{
    this.itemGroupFormData = this.route.snapshot.data['itemgroupdate'].rows[0];
    this.itemGroupFormData.STATUS = this.itemGroupFormData.STATUS.toString()
   // console.log(this.itemGroupFormData)
  }
  getItemgroupId():void{
    this.ITEMS_GROUP_ID = this.route.snapshot.params['ITEMS_GROUP_ID']
  }
  updateItemGroup(formData:any){
    this.itemsService.updateItemGroup(this.ITEMS_GROUP_ID,formData).subscribe(
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
