import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-add-stores-items',
  templateUrl: './add-stores-items.component.html',
  styleUrls: ['./add-stores-items.component.scss']
})
export class AddStoresItemsComponent implements OnInit {

  STORES_ID:string | number;

  constructor(
    private route: ActivatedRoute,
    private storesService:StoresService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getStoreId();
  }

  ngOnInit() {}

  /** Get Stores id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** On Add Store Item */
  addStoreItem(formData:any):void{
    this.storesService.addStoreItem(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added Store item');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_ID_UQ) violated'){
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
