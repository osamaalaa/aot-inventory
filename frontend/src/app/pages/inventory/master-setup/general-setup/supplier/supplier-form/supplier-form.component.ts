import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SUPPLIER_VALIDATION_MESSAGES } from './supplier-form.validations.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  lang: string;

  SupplierForm: FormGroup;
  validation_messages: any = SUPPLIER_VALIDATION_MESSAGES;
  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private generalSetupService: GeneralSetupService, private ui: UIService, public translate: TranslateService) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage()

  }

  /** Create Form */
  createForm(): void {
    this.SupplierForm = this._fb.group({
      SUPPLIER_CODE: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]],
      INTERCOMPANY: [false],
      LOCAL_SUPPLIER: [false],
      // INTERCOMPANY: [null, [Validators.required]], 
      INTERCOMPANY_ID: [null],
      VAT_REGISTRATION_NO: [1, [Validators.required]],
      TAX_SCHEME_ID: [null, [Validators.required]],
      // LOCAL_SUPPLIER:[null, [Validators.required]], 
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.SupplierForm.patchValue(this.formData)
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

  get SUPPLIER_CODE() {
    return this.SupplierForm.controls.SUPPLIER_CODE;
  }
  get AR_NAME() {
    return this.SupplierForm.controls.AR_NAME;
  }
  get EN_NAME() {
    return this.SupplierForm.controls.EN_NAME;
  }

  get INTERCOMPANY() {
    return this.SupplierForm.controls.INTERCOMPANY;
  }
  get INTERCOMPANY_ID() {
    return this.SupplierForm.controls.INTERCOMPANY_ID;
  }
  get VAT_REGISTRATION_NO() {
    return this.SupplierForm.controls.VAT_REGISTRATION_NO;
  }
  get TAX_SCHEME_ID() {
    return this.SupplierForm.controls.TAX_SCHEME_ID;
  }


  get STATUS() {
    return this.SupplierForm.controls.STATUS;
  }


  isfetchingLookup: boolean = false
  //itemsList: any[] = [];
  TaxScheme: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      // this.generalSetupService.getsubsDiary(),
      this.generalSetupService.getTaxScheme(),
    ).subscribe(
      results => {

        //  this.itemsList = results[0].rows;
        this.TaxScheme = results[0].rows;
        this.isfetchingLookup = false
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.SupplierForm.valid) {
      let body = { ...this.SupplierForm.value }
      body.INTERCOMPANY = body.INTERCOMPANY == true ? 1 : body.INTERCOMPANY == 1 ? 1 : 0;
      body.LOCAL_SUPPLIER = body.LOCAL_SUPPLIER == true ? 1 : body.LOCAL_SUPPLIER == 1 ? 1 : 0;
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
