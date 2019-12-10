import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-edit-stores-items-group-no',
  templateUrl: './edit-stores-items-group-no.component.html',
  styleUrls: ['./edit-stores-items-group-no.component.scss']
})
export class EditStoresItemsGroupNoComponent implements OnInit {

  StoresItemgroupNoData: any;

  STORES_ITEMS_GROUP_NO_ID: string | number;

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
    this.StoresItemgroupNoData = this.route.snapshot.data['StoresItemgroupNoData'].rows[0];
    this.StoresItemgroupNoData.STATUS = this.StoresItemgroupNoData.STATUS ? this.StoresItemgroupNoData.STATUS.toString() : this.StoresItemgroupNoData.STATUS
  }


  /** Get Stores items Group No id from route param */
  getStoresItemsGroupDataId(): void {
    this.STORES_ITEMS_GROUP_NO_ID = this.route.snapshot.params['STORES_ITEMS_GROUP_NO_ID']

  }

  /** Get STORES_ID from route param */
  getStoresId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Update Stores items Group No  form */
  updateStoresItemsGroupNoData(formData: any) {

    this.storesService.updateStoresItemsGroupNoData(this.STORES_ITEMS_GROUP_NO_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Stores Items Group No Data');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_ID_UQ) violated') {
          
          this.ui.createMessage('error', 'Items Group  already taken')
        } else {
         
          this.ui.createMessage('error', 'Error while updating  Items Group No')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}

