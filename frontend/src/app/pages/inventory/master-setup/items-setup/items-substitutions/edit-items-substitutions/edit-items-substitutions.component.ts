import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-items-substitutions',
  templateUrl: './edit-items-substitutions.component.html',
  styleUrls: ['./edit-items-substitutions.component.scss']
})
export class EditItemsSubstitutionsComponent implements OnInit {
  itemSubstitutionData: any;

  ITEMS_SUBSTITUTIONS_ID: string | number;

  ITEMS_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getItemId();
    this.getItemSubstitutionData();
    this.getItemSubstitutionId();
  }

  ngOnInit() {
  }

  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }


  /** Get Edit data from resolver */
  getItemSubstitutionData(): void {
    this.itemSubstitutionData = this.route.snapshot.data['itemSubstitutionData'].rows[0];
  }

  /** Get item item substitution unit id from route param */
  getItemSubstitutionId(): void {
    this.ITEMS_SUBSTITUTIONS_ID = this.route.snapshot.params['ITEMS_SUBSTITUTIONS_ID'];
  }

  /** On Update */
  updateItemSubstitution(formData: any): void {
    this.itemService.updateItemSubstitution(this.ITEMS_SUBSTITUTIONS_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Item Substitution')
        this.navigateToList()
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_SUBSTITUTIONS_UQ) violated') {
          this.ui.createMessage('error', 'Substitution Item already taken')
        } else {
          this.ui.createMessage('error', 'Error while updating Item Substitution')
        }

      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
