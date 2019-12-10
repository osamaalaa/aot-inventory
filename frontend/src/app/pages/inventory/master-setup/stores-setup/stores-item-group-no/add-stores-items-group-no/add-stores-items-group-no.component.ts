import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { StoresItemsGroupNoModelService } from '../stores-items-group-no-model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-stores-items-group-no',
  templateUrl: './add-stores-items-group-no.component.html',
  styleUrls: ['./add-stores-items-group-no.component.scss'],
  providers: [StoresItemsGroupNoModelService],
})
export class AddStoresItemsGroupNoComponent implements OnInit {

  STORES_ID: string | number;
  /** Table loader */
  isDataLoading: boolean = false
  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public storesItemsGroupNoModelService: StoresItemsGroupNoModelService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getStoresId();

  }

  ngOnInit() { }

 
  getStoresId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }



  /** On Add Stores Item Group No Components */
  addStoresItemGroupNoData(formData: any): void {
   
    this.storesService.insertstoresitemgroupnodata(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Stores Item Group No Data');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_GROUP_ID_UQ) violated') {
          
          this.ui.createMessage('error', 'Items Group  already taken')
        } else {
         
          this.ui.createMessage('error', 'Error while adding Items Group')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
