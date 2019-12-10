import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { ITEM_COMPONENTS_VALIDATION_MESSAGES } from './item-components-form.validation.messages';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-components-form',
  templateUrl: './item-components-form.component.html',
  styleUrls: ['./item-components-form.component.scss']
})
export class ItemComponentsFormComponent implements OnInit {

  lang: string;

  itemComponentsForm: FormGroup;

  validation_messages: any = ITEM_COMPONENTS_VALIDATION_MESSAGES;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private itemsService: ItemsService,
    private ui: UIService,
    public translate: TranslateService
  ) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }


  /** Create Form */
  createForm(): void {
    this.itemComponentsForm = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      // ITEMS_COMPONENTS_ID:[this.ITEMS_ID],

      ARRANGEMENT_NO: [1, [Validators.required]],
      COMPONENTS_ITEMS_ID: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      QUANTITY: [null, [Validators.required]],
      ITEM_PRICE: [null, [Validators.required]],
      COST_PERCENTAGE: [0, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemComponentsForm.patchValue(this.formData)
    }
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



  get UNITS_ID() {
    return this.itemComponentsForm.controls.UNITS_ID
  }
  get QUANTITY() {
    return this.itemComponentsForm.controls.QUANTITY
  }
  get ITEM_PRICE() {
    return this.itemComponentsForm.controls.ITEM_PRICE
  }
  get COST_PERCENTAGE() {
    return this.itemComponentsForm.controls.COST_PERCENTAGE
  }
  get COMPONENTS_ITEMS_ID() {
    return this.itemComponentsForm.controls.COMPONENTS_ITEMS_ID
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemsList: any[] = []
  itemComponentsTypeList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.units),
      this.itemsService.getallitems(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.itemComponentsTypeList = results[0].rows;
        this.itemsList = results[1].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.itemComponentsForm.valid) {
      this.onSubmit.emit(this.itemComponentsForm.value);
      // this.drawerRef.close(this.itemComponentsForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}

