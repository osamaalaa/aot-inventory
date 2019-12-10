import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-items-substitutions',
  templateUrl: './add-items-substitutions.component.html',
  styleUrls: ['./add-items-substitutions.component.scss']
})
export class AddItemsSubstitutionsComponent implements OnInit {

  ITEMS_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router
  ) {
    this.getItemId();
  }

  ngOnInit() { }

  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** On Add Item Substitution Unit*/
  addItemSubstitution(formData): void {
    this.itemService.insertItemSubstitution(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item Substitution')
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_SUBSTITUTIONS_UQ) violated') {
          this.ui.createMessage('error', 'Substitution Item already taken')
        } else {
          this.ui.createMessage('error', 'Error while adding item substitution')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
