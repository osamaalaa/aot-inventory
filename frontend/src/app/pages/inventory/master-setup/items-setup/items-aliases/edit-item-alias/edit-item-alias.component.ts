import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item-alias',
  templateUrl: './edit-item-alias.component.html',
  styleUrls: ['./edit-item-alias.component.scss']
})
export class EditItemAliasComponent implements OnInit {

  itemAliasFormData:any;

  ITEMS_ALIASES_ID: string | number;

  ITEMS_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private itemService:ItemsService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getItemAliasData();
    this.getItemAliasId();
  }

  ngOnInit() {}

  /** Get Edit data from resolver */
  getItemAliasData():void{
    this.itemAliasFormData = this.route.snapshot.data['itemAliasData'].rows[0];
    console.log(this.itemAliasFormData)
  }

  /** Get item alias id from route param */
  getItemAliasId():void{
    this.ITEMS_ALIASES_ID = this.route.snapshot.params['ITEM_ALIAS_ID']
  }

   /** Get item item id from route param */
   getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** Update Item Alias form */
  updateItemTAlias(formData:any){
    this.itemService.updateItemAlias(this.ITEMS_ALIASES_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated item Alias');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_ALIASES_UQ) violated'){
          this.ui.createMessage('error', 'Alias Type and Item Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while updating item alias')
        }
        
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
