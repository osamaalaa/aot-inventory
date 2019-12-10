import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item-alias',
  templateUrl: './add-item-alias.component.html',
  styleUrls: ['./add-item-alias.component.scss']
})
export class AddItemAliasComponent implements OnInit {

  ITEMS_ID:string | number;

  constructor(
    private route: ActivatedRoute,
    private itemService:ItemsService,
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

  /** On Add Alias */
  addItemAlias(formData:any):void{
    this.itemService.insertItemAlias(formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Added item Alias');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.ITEMS_ALIASES_UQ) violated'){
          this.ui.createMessage('error', 'Alias Type and Item Code already taken')
        }else{
          this.ui.createMessage('error', 'Error while adding item Alias')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
