import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ITEM_Supplier_VALIDATION_MESSAGES } from './items-supplier-form.validation.messages';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-item-supplier-form',
  templateUrl: './item-supplier-form.component.html',
  styleUrls: ['./item-supplier-form.component.scss']
})
export class ItemSupplierFormComponent implements OnInit {

  lang: string;

  itemSupplierForm: FormGroup;

  validation_messages: any = ITEM_Supplier_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  constructor(private _fb: FormBuilder, private itemsService: ItemsService, private ui: UIService, public translate: TranslateService) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemSupplierForm.patchValue(this.formData)
    }
  }

  /**
   * *create the form
   */
  createForm() {
    this.itemSupplierForm = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      //ITEMS_SUPPLIERS_ID:[null, [Validators.required]], 
      ITEM_COST: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      SUPPLIER_ID: [null, [Validators.required]],
      SUPPLIER_ITEM_CODE: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],//TODO: Remove this field
    })
  }

  // get ITEMS_SUPPLIERS_ID() {
  //   return this.itemSupplierForm.controls.ITEMS_SUPPLIERS_ID
  // }
  get SUPPLIER_ID() {
    return this.itemSupplierForm.controls.SUPPLIER_ID
  }
  get SUPPLIER_ITEM_CODE() {
    return this.itemSupplierForm.controls.SUPPLIER_ITEM_CODE
  }
  get ITEM_COST() {
    return this.itemSupplierForm.controls.ITEM_COST
  }
  get UNITS_ID() {
    return this.itemSupplierForm.controls.UNITS_ID
  }
  // --------- lookups --------------

  isfetchingLookup: boolean = false
  Supplierlist: any[] = [];
  unitList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getsuppliers(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.unitList)
    ).subscribe(
      results => {
        this.Supplierlist = results[0].rows,
          this.unitList = results[1].rows,
          this.isfetchingLookup = false
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error)
      },
    )
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {

      this.lang = lang.lang
      console.log(this.lang)
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.itemSupplierForm.valid) {
      let body = this.itemSupplierForm.value;
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
