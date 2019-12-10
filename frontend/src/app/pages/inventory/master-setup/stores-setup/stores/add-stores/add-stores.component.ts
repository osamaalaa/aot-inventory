import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-stores',
  templateUrl: './add-stores.component.html',
  styleUrls: ['./add-stores.component.scss']
})
export class AddStoresComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    private ui: UIService,
    private router: Router
  ) {
  }

  ngOnInit() { }


  /** On Add Store*/
  addStore(formData): void {
    this.storesService.addStore(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Store')
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_CODE_UQ) violated') {
          this.ui.createMessage('error', 'Store code already taken')
        } else {
          this.ui.createMessage('error', 'Error while adding store')
        }
      },
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }


}
