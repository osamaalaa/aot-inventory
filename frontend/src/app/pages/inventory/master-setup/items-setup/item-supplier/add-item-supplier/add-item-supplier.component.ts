import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-item-supplier',
  templateUrl: './add-item-supplier.component.html',
  styleUrls: ['./add-item-supplier.component.scss']
})
export class AddItemSupplierComponent implements OnInit {
  ITEMS_ID:string | number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private itemsService:ItemsService) 
  {
    this.getItemId();
  }
  getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }
  addItemSupplierData(formData): void {
    this.itemsService.insertnewitemsup(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item supplier')
        this.navigateToList()
      },
      error => {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_SUPPLIERS_UQ) violated'){
          this.ui.createMessage('error', 'Items  Supplier already taken')
        }else{
          this.ui.createMessage('error', 'Error while adding item supplier')
        }
      }
    )
  }
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
  ngOnInit() {
  }

}
