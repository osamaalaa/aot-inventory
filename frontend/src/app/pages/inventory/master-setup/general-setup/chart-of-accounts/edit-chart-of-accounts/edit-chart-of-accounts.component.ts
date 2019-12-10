import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-chart-of-accounts',
  templateUrl: './edit-chart-of-accounts.component.html',
  styleUrls: ['./edit-chart-of-accounts.component.scss']
})
export class EditChartOfAccountsComponent implements OnInit {

  itemSupplierFormData: any;

  CHART_OF_ACCOUNTS_ID: string | number;

  chartOfAccountData: any

  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {

    this.getChartOfAccountData();
    this.getChartOfAccountsId();
  }

  ngOnInit() {}


  getChartOfAccountsId(): void {
    this.CHART_OF_ACCOUNTS_ID = this.route.snapshot.params['CHART_OF_ACCOUNTS_ID'];
  }


  getChartOfAccountData(): void {
    this.chartOfAccountData = this.route.snapshot.data['chartOfAccountData'].rows[0];
    this.chartOfAccountData.STATUS = this.chartOfAccountData.STATUS ? this.chartOfAccountData.STATUS.toString() : this.chartOfAccountData.STATUS
  }


  updateChartOfAccounts(formData: any): void {
    this.generalSetupService.updateChartOfAccount(this.CHART_OF_ACCOUNTS_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Chart Of Accounts')
        this.navigateToList()
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.CHART_OF_ACCOUNTS_UQ) violated') {
          this.ui.createMessage('error', 'Tree Parent Code and Account Code Already taken')
        } else {
          this.ui.createMessage('error', 'Error while updating item supplier')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }





}
