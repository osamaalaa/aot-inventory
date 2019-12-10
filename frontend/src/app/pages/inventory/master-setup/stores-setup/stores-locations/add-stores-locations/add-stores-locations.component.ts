import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-stores-locations',
  templateUrl: './add-stores-locations.component.html',
  styleUrls: ['./add-stores-locations.component.scss']
})
export class AddStoresLocationsComponent implements OnInit {

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

  /** Get store id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** On Add Store Location*/
  addStoreLocation(formData:any):void{
    this.storesService.addStoreLocation(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added Store Location');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_LOCATIONS_CODE_UQ) violated'){
          this.ui.createMessage('error', 'Locatin Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while adding Store Location')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
