import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-stores-locations',
  templateUrl: './edit-stores-locations.component.html',
  styleUrls: ['./edit-stores-locations.component.scss']
})
export class EditStoresLocationsComponent implements OnInit {

  STORES_ID:string | number;

  STORES_LOCATIONS_ID:string | number;

  storeLocationData:any;


  constructor(
    private route: ActivatedRoute,
    private storesService:StoresService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getStoreId();
    this.getStoreLocationId();
    this.fetchStoreLocationData();
  }

  ngOnInit() {}

  /** Get store id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Get store location id from route param */
  getStoreLocationId():void{
    this.STORES_LOCATIONS_ID = this.route.snapshot.params['STORES_LOCATIONS_ID'];
  }

  /** Get store item data from resolver */
  fetchStoreLocationData():void{
    this.storeLocationData = this.route.snapshot.data['storeLocationData'].rows[0]
  }

  /** On update Store location*/
  updateStoreLocation(formData:any):void{
    this.storesService.updateStoreLocation(this.STORES_LOCATIONS_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated Store location');
        this.navigateToList();
      },
      error =>  {
        if(error.error
           && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_LOCATIONS_CODE_UQ) violated'){
          this.ui.createMessage('error', 'Locatin Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while updating Store Location')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
