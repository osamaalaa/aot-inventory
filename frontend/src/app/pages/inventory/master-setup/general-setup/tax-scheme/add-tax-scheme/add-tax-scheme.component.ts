import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-add-tax-scheme',
  templateUrl: './add-tax-scheme.component.html',
  styleUrls: ['./add-tax-scheme.component.scss']
})
export class AddTaxSchemeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taxSchemeService: GeneralSetupService,
    private ui: UIService,
  ) {}

  ngOnInit() {}

  /** On Add Template */
  addTaxScheme(formData): void {
    this.taxSchemeService.insertTaxScheme(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Tax Scheme')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while adding Tax scheme'),
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
