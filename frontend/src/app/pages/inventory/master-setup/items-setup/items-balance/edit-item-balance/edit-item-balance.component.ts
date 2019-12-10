import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item-balance',
  templateUrl: './edit-item-balance.component.html',
  styleUrls: ['./edit-item-balance.component.scss'],
})
export class EditItemBalanceComponent implements OnInit {

  itemBalanceFormData: any;

  ITEMS_BALANCE_ID: string | number;

  ITEMS_ID: string | number;


  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getItemId();
    this.getItemAliasData();
    this.getItemAliasId();
  }

  ngOnInit() { }

  /** Get item item id from route param */
   getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** Get Edit data from resolver */
  getItemAliasData(): void {
    this.itemBalanceFormData = this.route.snapshot.data['itemBalanceData'].rows[0];
  }

  /** Get item alias id from route param */
  getItemAliasId(): void {
    this.ITEMS_BALANCE_ID = this.route.snapshot.params['ITEMS_BALANCE_ID'];
  }

   /** On Update */
   updateItemBalance(formData:any): void {
    this.itemService.updateItemBalance(this.ITEMS_BALANCE_ID,formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Item Balance')
        this.navigateToList()
      },
      error => {
        
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_BALANCE_UQ) violated'){
          this.ui.createMessage('error', 'Store already taken by this item')
        }else{
          this.ui.createMessage('error', 'Error while updating Item Balance ')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
