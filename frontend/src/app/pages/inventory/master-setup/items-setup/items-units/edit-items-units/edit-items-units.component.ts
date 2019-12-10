import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-items-units',
  templateUrl: './edit-items-units.component.html',
  styleUrls: ['./edit-items-units.component.scss']
})
export class EditItemsUnitsComponent implements OnInit {

  itemUnitFormData: any;

  ITEMS_UNITS_ID: string | number;

  ITEMS_ID: string | number;


  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getItemId();
    this.getItemUnitData();
    this.getItemUnitId();
  }

  ngOnInit() { }

  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** Get Edit data from resolver */
  getItemUnitData(): void {
    this.itemUnitFormData = this.route.snapshot.data['itemUnitsData'].rows[0];
  }

  /** Get item item balance unit id from route param */
  getItemUnitId(): void {
    this.ITEMS_UNITS_ID = this.route.snapshot.params['ITEMS_UNITS_ID'];
  }

  /** On Update */
  updateItemUnit(formData: any): void {
    this.itemService.updateItemUnits(this.ITEMS_UNITS_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Item Units')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while updating Item Units'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
