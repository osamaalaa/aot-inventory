import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item-supplier',
  templateUrl: './edit-item-supplier.component.html',
  styleUrls: ['./edit-item-supplier.component.scss']
})
export class EditItemSupplierComponent implements OnInit {
  itemSupplierFormData: any;

  ITEMS_SUPPLIERS_ID: string | number;

  ITEMS_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
   // debugger;
    this.getItemId();
    this.getItemSupplierData();
    this.getItemsupplierid();
  }
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }
  getItemsupplierid(): void {
    this.ITEMS_SUPPLIERS_ID = this.route.snapshot.params['ITEMS_SUPPLIERS_ID'];
  }
   getItemSupplierData(): void {
     this.itemSupplierFormData = this.route.snapshot.data['EdititemsupplierData'].rows[0];
   }
  updateItemSupplier(formData: any): void {
     this.itemsService.updateItemSupplier(this.ITEMS_SUPPLIERS_ID, formData).subscribe(
       data => {
        this.ui.createMessage('success', 'Updated Item Supplier')
         this.navigateToList()
       },
       error => {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_SUPPLIERS_UQ) violated'){
          this.ui.createMessage('error', 'Supplier already taken')
        }else{
          this.ui.createMessage('error', 'Error while updating item supplier')
        }
       }
     )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
  ngOnInit() {
  }

}
