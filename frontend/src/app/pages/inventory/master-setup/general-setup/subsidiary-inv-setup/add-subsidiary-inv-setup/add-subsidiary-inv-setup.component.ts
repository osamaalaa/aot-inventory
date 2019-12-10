import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-subsidiary-inv-setup',
  templateUrl: './add-subsidiary-inv-setup.component.html',
  styleUrls: ['./add-subsidiary-inv-setup.component.scss']
})
export class AddSubsidiaryInvSetupComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router
  ) {
  }

  ngOnInit() { }


  /** On Add Subsidiary Inv*/
  addSubInv(formData): void {
    this.generalSetupService.addSubsidiaryInv(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Subsidiary Inv')
        this.navigateToList();
      },
      error => {
        // if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_CODE_UQ) violated') {
        //   this.ui.createMessage('error', 'Store code already taken')
        // } else {
        //   this.ui.createMessage('error', 'Error while adding store')
        // }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
