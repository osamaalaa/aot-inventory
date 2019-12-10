import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-edit-shortage-policy',
  templateUrl: './edit-shortage-policy.component.html',
  styleUrls: ['./edit-shortage-policy.component.scss']
})
export class EditShortagePolicyComponent implements OnInit {

  SHORTAGE_POLICY_ID: string | number;

  EditshortagepolicyData: any;

  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {

    this.getShortageId();
    this.fetchShortageData();
  }

  ngOnInit() { }


  /** Get Shortage Policy Id from route param */
  getShortageId(): void {
    this.SHORTAGE_POLICY_ID = this.route.snapshot.params['SHORTAGE_POLICY_ID'];

  }

  /** Get Shortage Policy data from resolver */
  fetchShortageData(): void {
    let formData = this.route.snapshot.data['EditshortagepolicyData'].rows[0]

    formData.SHORTAGE_POLICY_TYPE = formData.SHORTAGE_POLICY_TYPE == 1 ? true : false;
    formData.SHORTAGE_POLICY_VALUE_TYPE = formData.SHORTAGE_POLICY_VALUE_TYPE == 1 ? true : false

    this.EditshortagepolicyData = formData
  }

  /** On update Shortage Policy */
  updateShortagePolicy(formData: any): void {
    this.generalSetupService.updateShortagePolicy(this.SHORTAGE_POLICY_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Shortage Policy');
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

