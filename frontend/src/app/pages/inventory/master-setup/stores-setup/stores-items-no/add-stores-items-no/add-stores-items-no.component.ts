import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-stores-items-no',
  templateUrl: './add-stores-items-no.component.html',
  styleUrls: ['./add-stores-items-no.component.scss']
})
export class AddStoresItemsNoComponent implements OnInit {

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

  /** On Add Store Item No */
  addStoreItemNo(formData:any):void{
    this.storesService.addStoreItemNo(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added Store item No');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_NO_ID_UQ) violated'){
          this.ui.createMessage('error', 'Item already taken')
        }else{
          this.ui.createMessage('error', 'Error while adding Store item No')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }
}
