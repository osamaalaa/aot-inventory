import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-items-balance-units',
  templateUrl: './edit-items-balance-units.component.html',
  styleUrls: ['./edit-items-balance-units.component.scss']
})
export class EditItemsBalanceUnitsComponent implements OnInit {

  itemBalanceUnitFormData: any;

  ITEMS_BALANCE_ID: string | number;

  ITEMS_ID: string | number;


  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getItemId();
    this.getItemBalanceUnitData();
    this.getItemBalanceUnitId();
  }

  ngOnInit() { }

  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** Get Edit data from resolver */
  getItemBalanceUnitData(): void {
    this.itemBalanceUnitFormData = this.route.snapshot.data['itemBalanceUnitsData'].rows[0];
  }

  /** Get item item balance unit id from route param */
  getItemBalanceUnitId(): void {
    this.ITEMS_BALANCE_ID = this.route.snapshot.params['ITEMS_BALANCE_UNITS_ID'];
  }

  /** On Update */
  updateItemBalanceUnit(formData: any): void {
    this.itemService.updateItemBalanceUnit(this.ITEMS_BALANCE_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Item Balance Unit')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while updating Item Balance Unit'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
