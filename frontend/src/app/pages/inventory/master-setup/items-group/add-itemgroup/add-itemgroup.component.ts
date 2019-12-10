import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-itemgroup',
  templateUrl: './add-itemgroup.component.html',
  styleUrls: ['./add-itemgroup.component.scss']
})
export class AddItemgroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private itemsService:ItemsService,
    private ui:UIService,
    private router:Router,
  ) { }

  ngOnInit() {}

  addItemgroup(formData:any):void{
    this.itemsService.postEventDefs(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added item group');
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
    this.router.navigate(['/inv/setup/item-groups'],{relativeTo:this.route})
  }

 

}
