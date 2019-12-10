import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-stores-document-types',
  templateUrl: './add-stores-document-types.component.html',
  styleUrls: ['./add-stores-document-types.component.scss']
})
export class AddStoresDocumentTypesComponent implements OnInit {

  STORES_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getStoreId();
  }

  ngOnInit() { }

  /** Get store id from route param */
  getStoreId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** On Add Store Document Type */
  addStoreDocumentType(formData: any): void {
    this.storesService.addStoreDocumentType(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Store Document type');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_DOCUMENT_TYPES_ID_UQ) violated') {
          this.ui.createMessage('error', 'Document already taken')
        } else {
          this.ui.createMessage('er ror', 'Error while adding Store Document type')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
