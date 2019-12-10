import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-add-shortage-policy',
  templateUrl: './add-shortage-policy.component.html',
  styleUrls: ['./add-shortage-policy.component.scss']
})
export class AddShortagePolicyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {
    // this.getStoreId();
  }

  ngOnInit() { }


  /** On Add Shortage Policy */
  addShortagePolicy(formData: any): void {

    this.generalSetupService.addShortagePolicy(formData).subscribe(

      data => {
        this.ui.createMessage('success', 'Added Shortage Policy');
        this.navigateToList();
      },
      error => {

        this.ui.createMessage('er ror', 'Error while adding Shortage Policy')

      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}