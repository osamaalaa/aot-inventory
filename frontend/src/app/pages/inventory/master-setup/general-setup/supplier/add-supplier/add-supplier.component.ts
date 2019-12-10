import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {
    // this.getStoreId();
  }

  ngOnInit() { }
  /** On Add Supplier */
  addSupplier(formData: any): void {
    this.generalSetupService.addSupplier(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Supplier');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.SUPPLIER_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Supplier Code already taken')
        } else {
          this.ui.createMessage('er ror', 'Error while adding Supplier Code')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}