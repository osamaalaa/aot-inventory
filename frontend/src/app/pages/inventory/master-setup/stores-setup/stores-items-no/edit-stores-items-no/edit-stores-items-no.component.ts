import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-stores-items-no',
  templateUrl: './edit-stores-items-no.component.html',
  styleUrls: ['./edit-stores-items-no.component.scss']
})
export class EditStoresItemsNoComponent implements OnInit {

  STORES_ID:string | number;

  STORES_ITEMS_NO_ID:string | number;

  storeItemNoData:any;


  constructor(
    private route: ActivatedRoute,
    private storesService:StoresService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getStoreId();
    this.getStoreItemNoId();
    this.fetchStoreItemNoData();
  }

  ngOnInit() {}

  /** Get store id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Get store item no id from route param */
  getStoreItemNoId():void{
    this.STORES_ITEMS_NO_ID = this.route.snapshot.params['STORES_ITEMS_NO_ID'];
  }

  /** Get store item data from resolver */
  fetchStoreItemNoData():void{
    let formData = this.route.snapshot.data['storeItemNoData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS
    this.storeItemNoData = formData
  }

  /** On update Store Item No*/
  updateStoreItemNo(formData:any):void{
    this.storesService.updateStoreItemNo(this.STORES_ITEMS_NO_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated Store Item No');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_NO_ID_UQ) violated'){
          this.ui.createMessage('error', 'Item already taken')
        }else{
          this.ui.createMessage('er ror', 'Error while adding Store item')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
