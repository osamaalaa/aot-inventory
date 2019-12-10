import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  /** On Add Item  */
  addItem(formData:any): void {
    this.itemService.insertnewitem(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item')
        this.navigateToItemMain(data.rows.R_ITEMS_ID)
      },
      error => {
        this.ui.createMessage('error', 'Error while adding item')
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  /** Navigate to item main page against item_id */
  navigateToItemMain(ITEMS_ID:string | number):void{
    this.router.navigate(['..',ITEMS_ID], { relativeTo: this.route })
  }

}
