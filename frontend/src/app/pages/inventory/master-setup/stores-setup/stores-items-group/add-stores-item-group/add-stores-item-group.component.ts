import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { StoresItemsGroupModelService } from '../stores-items-group.model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-stores-item-group',
  templateUrl: './add-stores-item-group.component.html',
  styleUrls: ['./add-stores-item-group.component.scss'],
  providers: [StoresItemsGroupModelService],
})
export class AddStoresItemGroupComponent implements OnInit {
  STORES_ID: string | number;
  /** Table loader */
  isDataLoading: boolean = false
  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public storesItemsGroupModelService: StoresItemsGroupModelService,
    private ui: UIService,
    private router: Router,
  ) {
    this.getStoresId();

  }

  ngOnInit() { }

 
  getStoresId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }



  /** On Add Stores Item Group Components */
  addStoresItemGroupData(formData: any): void {
    
    this.storesService.insertstoresitemgroupdata(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Stores Item Group Data');
        this.navigateToList();
      },
      error => {
        if (error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_ITEMS_GROUP_ID_UQ) violated') {
        
          this.ui.createMessage('error', 'Items Group already taken ')
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
