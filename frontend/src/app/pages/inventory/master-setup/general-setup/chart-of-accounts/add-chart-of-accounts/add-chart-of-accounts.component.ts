import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-chart-of-accounts',
  templateUrl: './add-chart-of-accounts.component.html',
  styleUrls: ['./add-chart-of-accounts.component.scss']
})
export class AddChartOfAccountsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
  ) {

  }

  ngOnInit() {}



  /** On Add Chart of Accounts */
  addChartOfAccounts(formData:any): void {
    this.generalSetupService.addChartOfAccounts(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added chart of account')
        this.navigateToList()
      },
      error => {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.CHART_OF_ACCOUNTS_UQ) violated'){
          this.ui.createMessage('error', 'Tree Parent Code and Account Code Already taken')
        }else{
          this.ui.createMessage('error', 'Error while chart of account')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
