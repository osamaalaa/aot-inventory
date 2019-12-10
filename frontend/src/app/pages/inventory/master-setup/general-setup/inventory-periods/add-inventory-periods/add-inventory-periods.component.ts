

import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';


@Component({
  selector: 'app-add-inventory-periods',
  templateUrl: './add-inventory-periods.component.html',
  styleUrls: ['./add-inventory-periods.component.scss']
})
export class AddInventoryPeriodsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) { }

  ngOnInit() { }

  addInventoryperiods(formData: any): void {

    this.generalSetupService.insertInventoryPeriod(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added inventory periods');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Group Code already taken')
        } else {
          this.ui.createMessage('error', 'Error while adding inventory periods')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['/inv/setup/inventory-periods'], { relativeTo: this.route })
  }

}
