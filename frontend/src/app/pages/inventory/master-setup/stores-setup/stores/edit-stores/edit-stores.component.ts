import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-stores',
  templateUrl: './edit-stores.component.html',
  styleUrls: ['./edit-stores.component.scss']
})
export class EditStoresComponent implements OnInit {

  storeData: any;

  STORES_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getStoreId();
    this.getStoreData();
  }

  ngOnInit() { }

  /** Get storeid from route param */
  getStoreId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }


  /** Get Edit data from resolver */
  getStoreData(): void {
    this.storeData = this.route.snapshot.data['storeData'].rows[0];
  }


  /** On Update */
  updateStore(formData: any): void {
    this.storesService.updateStore(this.STORES_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Store')
        this.navigateToList()
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Store code already taken')
        } else {
          this.ui.createMessage('error', 'Error while updating store')
        }

      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }


}
