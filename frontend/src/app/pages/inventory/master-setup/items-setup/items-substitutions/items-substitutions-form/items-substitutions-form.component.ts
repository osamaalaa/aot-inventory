import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITEM_SUBSTITUTION_VALIDATION_MESSAGES } from './items-substitutions.validations.messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-items-substitutions-form',
  templateUrl: './items-substitutions-form.component.html',
  styleUrls: ['./items-substitutions-form.component.scss']
})
export class ItemsSubstitutionsFormComponent implements OnInit {

  lang: string;

  itemSubstitution: FormGroup;

  validation_messages: any = ITEM_SUBSTITUTION_VALIDATION_MESSAGES;

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

  /** Create Form */
  createForm(): void {
    this.itemSubstitution = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      SUBSTITUTIONS_ITEMS_ID: [null, [Validators.required]], //TODO: Remove this field
      UNITS_ID: [null, [Validators.required]],
      QUANTITY: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemSubstitution.patchValue(this.formData)
    }
  }

  get SUBSTITUTIONS_ITEMS_ID() {
    return this.itemSubstitution.controls.SUBSTITUTIONS_ITEMS_ID
  }
  get UNITS_ID() {
    return this.itemSubstitution.controls.UNITS_ID
  }
  get QUANTITY() {
    return this.itemSubstitution.controls.QUANTITY
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemsList: any[] = []
  unitsList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.units),
      this.itemsService.getallitems()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.unitsList = results[0].rows;
        this.itemsList = results[1].rows;

        console.log(this.itemsList)
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
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
    if (this.itemSubstitution.valid) {
      this.onSubmit.emit(this.itemSubstitution.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }


}
