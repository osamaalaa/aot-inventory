import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
// import { ItemComponentsModelService } from '../item-components.model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item-components',
  templateUrl: './add-item-components.component.html',
  styleUrls: ['./add-item-components.component.scss'],
  providers: [],
})
export class AddItemComponentsComponent implements OnInit {

  ITEMS_ID:string | number;
 /** Table loader */
 isDataLoading: boolean = false
  constructor(
    private route: ActivatedRoute,
  
    private itemsService: ItemsService,
    // public itemComponentModelService: ItemComponentsModelService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getItemId();
  }

  ngOnInit() {}

  /** Get item item id from route param */
  getItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }


  /** On Add ItemComponents */
  addItemComBalance(formData:any):void{
    
     //console.log(JSON.stringify(formData));
    //  formData.ARRANGEMENT_NO=this.itemComponentModelService.datalength;
    //  formData.ARRANGEMENT_NO += 1;
    // alert(" this.itemComponentModelService.templateData..."+this.itemComponentModelService.datalength);
    this.itemsService.insertItemComponents(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added item components');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_COMPONENTS_UQ) violated'){
         // this.ui.createMessage('error', 'Components Item Id already taken')
         this.ui.createMessage('error', 'Components Item Id already taken')
        }else{
         // this.ui.createMessage('error', 'Error while adding Components Items Id')
         this.ui.createMessage('error', 'Error while adding component ')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }
}
