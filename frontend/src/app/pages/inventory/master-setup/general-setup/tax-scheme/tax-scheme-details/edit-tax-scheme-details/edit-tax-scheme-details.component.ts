import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-edit-tax-scheme-details',
  templateUrl: './edit-tax-scheme-details.component.html',
  styleUrls: ['./edit-tax-scheme-details.component.scss']
})
export class EditTaxSchemeDetailsComponent implements OnInit {
  taxSchemeData: any

  TAX_SCHEME_ID: string | number

  constructor(
    private route: ActivatedRoute,
    private taxSchemeService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {
   // this.getItemTemplateData()
   // this.getItemTemplateId()
  }

  ngOnInit() {
    this.getItemTemplateId()
  }

  /** Get item alias id from route param */
  getItemTemplateId(): void {
    this.TAX_SCHEME_ID = this.route.snapshot.params['TAX_SCHEME_ID']
  }

  /** Get Edit data from resolver */
  getItemTemplateData() {
    let formData = this.route.snapshot.data['taxSchemeDataDetails'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS;
    this.taxSchemeData = formData
  }

  /** Update Item template form */
  updateTaxTemplate(formData: any) {
    this.taxSchemeService.updateTaxSchemeDetails( formData, this.TAX_SCHEME_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated tax schema details')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while updating tax schema!'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
