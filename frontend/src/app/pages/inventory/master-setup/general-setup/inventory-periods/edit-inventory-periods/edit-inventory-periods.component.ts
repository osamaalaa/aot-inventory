
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-edit-inventory-periods',
  templateUrl: './edit-inventory-periods.component.html',
  styleUrls: ['./edit-inventory-periods.component.scss']
})

export class EditInventoryPeriodsComponent implements OnInit {

  itemGroupFormDatas: any;
  INVENTORY_PERIODS_ID: string | number;
  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {

    this.getInventoryPeriods();
    this.getInventoryperiodsId();
  }

  ngOnInit() {
  }

  getInventoryPeriods() {

    this.itemGroupFormDatas = this.route.snapshot.data['itemGroupFormDatas'].rows[0];
    this.itemGroupFormDatas.STATUS = this.itemGroupFormDatas.STATUS.toString()

  }
  getInventoryperiodsId(): void {
    this.INVENTORY_PERIODS_ID = this.route.snapshot.params['INVENTORY_PERIODS_ID']
  }
  updateItemGroup(formData: any) {

    this.generalSetupService.updateInventoryPeriod(this.INVENTORY_PERIODS_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated inventory periods');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Group Code already taken')
        } else {
          this.ui.createMessage('error', 'Error while updating inventory periods')
        }
      }
    )
  }

  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
