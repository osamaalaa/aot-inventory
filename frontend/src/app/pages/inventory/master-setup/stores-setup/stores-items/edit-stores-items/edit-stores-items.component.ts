import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-stores-items',
  templateUrl: './edit-stores-items.component.html',
  styleUrls: ['./edit-stores-items.component.scss']
})
export class EditStoresItemsComponent implements OnInit {

  STORES_ID:string | number;

  STORES_ITEMS_ID:string | number;

  storeItemData:any;


  constructor(
    private route: ActivatedRoute,
    private storesService:StoresService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getStoreId();
    this.getStoreItemId();
    this.fetchStoreItemData();
  }

  ngOnInit() {}

  /** Get store id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Get store item id from route param */
  getStoreItemId():void{
    this.STORES_ITEMS_ID = this.route.snapshot.params['STORES_ITEMS_ID'];
  }

  /** Get store item data from resolver */
  fetchStoreItemData():void{
    let formData = this.route.snapshot.data['storeItemData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS
    this.storeItemData = formData
  }

  /** On update Store Item */
  updateStoreItem(formData:any):void{
    this.storesService.updateStoreItem(this.STORES_ITEMS_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated Store item');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_ID_UQ) violated'){
          this.ui.createMessage('error', 'Item already taken')
        }else{
          this.ui.createMessage('er ror', 'Error while updating Store item')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }


}
