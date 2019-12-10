import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationsService } from 'src/app/services/operations.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { forkJoin } from 'rxjs';
import { ITEMS_UNITS_VALIDATION_MESSAGES } from './items-units-form.validation.messages';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-items-units-form',
  templateUrl: './items-units-form.component.html',
  styleUrls: ['./items-units-form.component.scss']
})
export class ItemsUnitsFormComponent implements OnInit {

  lang:string;

  form: FormGroup;

  validation_messages: any = ITEMS_UNITS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()



  constructor(
    private _fb: FormBuilder,
    private operationsService:OperationsService,
    // private drawerRef: NzDrawerRef,
    private ui: UIService,
    public translate: TranslateService) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.patchItemsId();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
	
  }

  patchItemsId() {
    this.form.controls.ITEMS_ID.setValue(this.ITEMS_ID)
  }

  /**
   * !TODO: REMOVE this key
   */
  patchArrangementNo() {
    this.form.controls.ARRANGEMENT_NO.setValue(1)
  }

  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({
      ITEMS_ID: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      UNIT_FACTOR: [null, [Validators.required]],
      DEFAULT_UNIT: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],
    })
  }


  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData)
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

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  unitList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.units),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.unitList = results[0].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  get UNITS_ID() {
    return this.form.controls.UNITS_ID;
  }
  get UNIT_FACTOR() {
    return this.form.controls.UNIT_FACTOR;
  }

  get DEFAULT_UNIT() {
    return this.form.controls.DEFAULT_UNIT;
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      // this.closeModal(this.form.value);
      this.onSubmit.emit(this.form.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


  closeModal(data: any = null) {
    // this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
    this.closeModal(null)
  }

}
