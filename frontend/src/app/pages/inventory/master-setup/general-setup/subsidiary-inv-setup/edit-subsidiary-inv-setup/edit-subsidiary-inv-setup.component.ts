import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-subsidiary-inv-setup',
  templateUrl: './edit-subsidiary-inv-setup.component.html',
  styleUrls: ['./edit-subsidiary-inv-setup.component.scss']
})
export class EditSubsidiaryInvSetupComponent implements OnInit {

  subsidiaryData: any;

  SUBSIDIARY_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getSubsidiaryId();
    this.getStoreData();
  }

  ngOnInit() { }

  /** Get SubsidiaryId from route param */
  getSubsidiaryId(): void {
    this.SUBSIDIARY_ID = this.route.snapshot.params['SUBSIDIARY_ID'];
  }


  /** Get Edit data from resolver */
  getStoreData(): void {
    this.subsidiaryData = this.route.snapshot.data['subsidiaryData'].rows[0];
  }


  /** On Update */
  updateSubsidiaryInv(formData: any): void {
    this.generalSetupService.updateSubsidiaryInv(this.SUBSIDIARY_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Subsidiary Inv')
        this.navigateToList()
      },
      error => {
        // if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_CODE_UQ) violated') {
        //   this.ui.createMessage('error', 'Store code already taken')
        // } else {
        //   this.ui.createMessage('error', 'Error while updating store')
        // }

      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }


}
