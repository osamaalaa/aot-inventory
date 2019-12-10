import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { TAX_SCHEME_DETAILS_VALIDATION_MESSAGES } from './tax-scheme-details-form.validation.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { forkJoin } from 'rxjs';
import { StoresService } from 'src/app/services/stores.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-tax-scheme-details-form',
  templateUrl: './tax-scheme-details-form.component.html',
  styleUrls: ['./tax-scheme-details-form.component.scss']
})
export class TaxSchemeDetailsFormComponent implements OnInit {


  TaxSchemeDetailsForm: FormGroup;

  validation_messages: any = TAX_SCHEME_DETAILS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() TAX_SCHEME_ID: any ;

 // TAX_SCHEME_ID: number
  @Input() TAX_SCHEME_DETAIL_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private storesService: StoresService,private _fb: FormBuilder, private taxSchemeService: GeneralSetupService, private ui: UIService) {
    this.createForm();
      this.getAllLookups()
  }

  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm():void {
    this.TaxSchemeDetailsForm = this._fb.group({
      TAX_SCHEME_ID: [this.TAX_SCHEME_ID],
      TAX_SCHEME_DETAIL_ID: [this.TAX_SCHEME_DETAIL_ID],
      TAX_TAXABLE: [0, [Validators.required]], 
      AUTO_CALC: [0, Validators.required],
      EN_DESCRIPTION: ['', [Validators.required]],
      AR_DESCRIPTION: ['', [Validators.required]],
      MANDATORY_TAX: [0, Validators.required],
      USER_CHANGEABLE: [0, Validators.required],
      TAX_VALUE_TYPE: [0, Validators.required],
      TAX_VALUE_TYPE_VALUE: [0, Validators.required],
      CHART_OF_ACCOUNTS_ID: [null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  get EN_DESCRIPTION() {
    return this.TaxSchemeDetailsForm.controls.EN_DESCRIPTION
  }
  get AR_DESCRIPTION() {
    return this.TaxSchemeDetailsForm.controls.AR_DESCRIPTION
  }
  get TAX_TAXABLE() {
    return this.TaxSchemeDetailsForm.controls.TAX_TAXABLE
  }
  get AUTO_CALC() {
    return this.TaxSchemeDetailsForm.controls.AUTO_CALC
  }
  get MANDATORY_TAX() {
    return this.TaxSchemeDetailsForm.controls.MANDATORY_TAX
  }  
  get USER_CHANGEABLE() {
    return this.TaxSchemeDetailsForm.controls.USER_CHANGEABLE
  }  
  get TAX_VALUE_TYPE() {
    return this.TaxSchemeDetailsForm.controls.TAX_VALUE_TYPE
  }  
  get TAX_VALUE_TYPE_VALUE() {
    return this.TaxSchemeDetailsForm.controls.TAX_VALUE_TYPE_VALUE
  }    
  get CHART_OF_ACCOUNTS_ID() {
    return this.TaxSchemeDetailsForm.controls.CHART_OF_ACCOUNTS_ID
  }     
  
  
  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  chartsOfAccountList = [];
  storeList = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.storesService.getChartsOfAccounts(),

   
      //this.storesService.getAllStores()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;

        this.chartsOfAccountList = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null)
       // this.storeList = HelperUtil.treeify(results[1].rows, 'STORES_ID', 'PARENT_STORES_ID', null)

       console.log(this.chartsOfAccountList)
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }
  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false
    if (isEditMode) {
      this.TaxSchemeDetailsForm.patchValue(this.formData)
    } else
    {
      this.TaxSchemeDetailsForm.removeControl('TAX_SCHEME_DETAIL_ID')

    }
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.TaxSchemeDetailsForm.valid) {
      let body = {...this.TaxSchemeDetailsForm.value}

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
