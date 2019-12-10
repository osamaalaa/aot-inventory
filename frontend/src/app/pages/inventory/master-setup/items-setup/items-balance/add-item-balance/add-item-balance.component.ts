import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-add-item-balance',
  templateUrl: './add-item-balance.component.html',
  styleUrls: ['./add-item-balance.component.scss'],
})
export class AddItemBalanceComponent implements OnInit {

  ITEMS_ID:string | number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
  ) {
    this.getItemId();
  }

  ngOnInit() {}

  /** Get item item id from route param */
  getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** On Add Item balance */
  addItemBalance(formData): void {
    this.itemService.insertItemBalance(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item balance')
        this.navigateToList()
      },
      error => {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_BALANCE_UQ) violated'){
          this.ui.createMessage('error', 'Store already taken by this item')
        }else{
          this.ui.createMessage('error', 'Error while adding item balance')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
