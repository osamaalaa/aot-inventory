import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item-components',
  templateUrl: './edit-item-components.component.html',
  styleUrls: ['./edit-item-components.component.scss']
})
export class EditItemComponentsComponent implements OnInit {

  itemComponentsFormData:any;

  ITEMS_COMPONENTS_ID: string | number;

  ITEMS_ID: string | number;

  constructor(
    private route: ActivatedRoute,
    private itemService:ItemsService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getItemComponentsData();
    this.getItemComponentsId();
  }

  ngOnInit() {}

  /** Get Edit data from resolver */
  getItemComponentsData():void{
    this.itemComponentsFormData = this.route.snapshot.data['itemComponentData'].rows[0];
  }

  /** Get item ItemComponents id from route param */
  getItemComponentsId():void{
    this.ITEMS_COMPONENTS_ID = this.route.snapshot.params['ITEMS_COMPONENTS_ID']
  }

  /** Get item item id from route param */
  getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  /** Update Item ItemComponents form */
  updateItemTComponents(formData:any){
    this.itemService.updateItemComponents(this.ITEMS_COMPONENTS_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated Item Components');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_COMPONENTS_UQ) violated'){
          // this.ui.createMessage('error', 'Components Item Id already taken')
          this.ui.createMessage('error', 'Components Item Id already taken')
         }else{
          // this.ui.createMessage('error', 'Error while adding Components Items Id')
          this.ui.createMessage('error', 'Error while updating component ')
         }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
