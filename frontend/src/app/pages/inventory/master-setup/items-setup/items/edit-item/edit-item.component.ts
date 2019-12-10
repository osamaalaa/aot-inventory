import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  ITEMS_ID: string | number;

  itemFormData: any;

  constructor(
    private itemService: ItemsService,
    private ui: UIService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getItemId();
    this.getItemData();
  }

  ngOnInit() {
  }


  /** Get Edit data from resolver */
  getItemData(): void {
    let formData = this.route.snapshot.data['itemData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS
    this.itemFormData = formData
  }


  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** On Update */
  updateItem(formData: any): void {
    this.itemService.updateItem(this.ITEMS_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Item')
        this.navigateToList()
      },
      error => {

        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_BALANCE_UQ) violated') {
          this.ui.createMessage('error', 'Store already taken by this item')
        } else {
          this.ui.createMessage('error', 'Error while updating Item ')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }

}
