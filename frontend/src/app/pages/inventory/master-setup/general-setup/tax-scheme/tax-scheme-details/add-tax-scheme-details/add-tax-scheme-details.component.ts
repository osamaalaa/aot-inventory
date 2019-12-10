import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-add-tax-scheme-details',
  templateUrl: './add-tax-scheme-details.component.html',
  styleUrls: ['./add-tax-scheme-details.component.scss']
})
export class AddTaxSchemeDetailsComponent implements OnInit {
  TAX_SCHEME_ID: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taxSchemeService: GeneralSetupService,
    private ui: UIService,
  ) {

  }

  ngOnInit() {    this.TAX_SCHEME_ID = this.route.snapshot.params['TAX_SCHEME_ID']
}

  /** On Add Template */
  addTaxScheme(formData): void {
    
    this.taxSchemeService.insertTaxSchemeDetails(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Tax Scheme details')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while adding Tax scheme details'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
