import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-edit-stores-items-group',
  templateUrl: './edit-stores-items-group.component.html',
  styleUrls: ['./edit-stores-items-group.component.scss']
})
export class EditStoresItemsGroupComponent implements OnInit {

  StoresItemgroupData: any;

  STORES_ITEMS_GROUP_ID: string | number;

  STORES_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getStoresItemsGroupDat();
    this.getStoresItemsGroupDataId();
    this.getStoresId();
  }

  ngOnInit() { }
  /** Get Edit data from resolver */
  getStoresItemsGroupDat(): void {
    this.StoresItemgroupData = this.route.snapshot.data['StoresItemgroupData'].rows[0];
    this.StoresItemgroupData.STATUS = this.StoresItemgroupData.STATUS ? this.StoresItemgroupData.STATUS.toString() : this.StoresItemgroupData.STATUS
  }


  /** Get Stores items Group id from route param */
  getStoresItemsGroupDataId(): void {
    this.STORES_ITEMS_GROUP_ID = this.route.snapshot.params['STORES_ITEMS_GROUP_ID']

  }

  /** Get STORES_ID from route param */
  getStoresId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Update Stores items Group  form */
  updateStoresItemsGroupData(formData: any) {

    this.storesService.updateStoresItemsGroupData(this.STORES_ITEMS_GROUP_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Stores Items Group Data');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_GROUP_ID_UQ) violated') {
        
          this.ui.createMessage('error', 'Items Group already taken ')
        } else {
         
          this.ui.createMessage('error', 'Error while updating Items Group')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
