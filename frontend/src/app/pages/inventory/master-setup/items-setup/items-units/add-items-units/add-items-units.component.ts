import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-items-units',
  templateUrl: './add-items-units.component.html',
  styleUrls: ['./add-items-units.component.scss']
})
export class AddItemsUnitsComponent implements OnInit {

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

  /** On Add Item Unit */
  addItemUnit(formData): void {
    this.itemService.insertItemUnits(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item balance')
        this.navigateToList()
      },
      error => {
        this.ui.createMessage('error', error.error.message)
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
