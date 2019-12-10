import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  SUPPLIER_ID: string | number;
  EdititemsupplierData: any;
  constructor(
    private route: ActivatedRoute,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private router: Router,
  ) {

    this.getSupplierId();
    this.fetchStoreItemData();
  }

  ngOnInit() { }

  /** Get Supplier Id from route param */
  getSupplierId(): void {
    this.SUPPLIER_ID = this.route.snapshot.params['SUPPLIER_ID'];

  }

  /** Get Supplier data from resolver */
  fetchStoreItemData(): void {
    let formData = this.route.snapshot.data['EdititemsupplierData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS;
    formData.INTERCOMPANY = formData.INTERCOMPANY == 1 ? true : false;
    formData.LOCAL_SUPPLIER = formData.LOCAL_SUPPLIER == 1 ? true : false

    this.EdititemsupplierData = formData
  }

  /** On update Supplier Item */
  updateSupplier(formData: any): void {
    this.generalSetupService.updateSupplier(this.SUPPLIER_ID, formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated Supplier');
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
