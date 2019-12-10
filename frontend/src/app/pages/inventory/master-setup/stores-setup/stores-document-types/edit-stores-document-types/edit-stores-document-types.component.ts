import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-stores-document-types',
  templateUrl: './edit-stores-document-types.component.html',
  styleUrls: ['./edit-stores-document-types.component.scss']
})
export class EditStoresDocumentTypesComponent implements OnInit {

  STORES_ID:string | number;

  STORES_DOCUMENT_TYPES_ID:string | number;

  storeDocumentTypeData:any;


  constructor(
    private route: ActivatedRoute,
    private storesService:StoresService,
    private ui:UIService,
    private router:Router,
  ) { 
    this.getStoreId();
    this.getStoreDocumentTypeId();
    this.fetchStoreItemNoData();
  }

  ngOnInit() {}

  /** Get store id from route param */
  getStoreId():void{
    this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  }

  /** Get store document type id from route param */
  getStoreDocumentTypeId():void{
    this.STORES_DOCUMENT_TYPES_ID = this.route.snapshot.params['STORES_DOCUMENT_TYPES_ID'];
  }

  /** Get store item data from resolver */
  fetchStoreItemNoData():void{
    let formData = this.route.snapshot.data['storeDocumentTypeData'].rows[0]
    formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS
    this.storeDocumentTypeData = formData
  }

  /** On update Store Document type*/
  updateStoreDocumentType(formData:any):void{
    this.storesService.updateStoreDocumentType(this.STORES_DOCUMENT_TYPES_ID,formData).subscribe(
      data=>  {
        this.ui.createMessage('success', 'Updated Store Document type ');
        this.navigateToList();
      },
      error =>  {
        if(error.error && error.error.message == 'ORA-00001: unique constraint (INVENTORY.STORES_DOCUMENT_TYPES_ID_UQ) violated'){
          this.ui.createMessage('error', 'Document already taken')
        }else{
          this.ui.createMessage('er ror', 'Error while updating Store Document type')
        }
      }
    )
  }

  /**Navigate to list on cancel */
  navigateToList():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }


}
