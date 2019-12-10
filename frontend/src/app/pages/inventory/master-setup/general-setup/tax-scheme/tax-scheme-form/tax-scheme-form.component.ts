import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { TAX_SCHEME_VALIDATION_MESSAGES } from './tax-scheme-form.validation.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-tax-scheme-form',
  templateUrl: './tax-scheme-form.component.html',
  styleUrls: ['./tax-scheme-form.component.scss']
})
export class TaxSchemeFormComponent implements OnInit {

  TaxSchemeForm: FormGroup;

  validation_messages: any = TAX_SCHEME_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() TAX_SCHEME_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private taxSchemeService: GeneralSetupService, private ui: UIService) {
    this.createForm();

  }

  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm(): void {
    this.TaxSchemeForm = this._fb.group({
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO: Remove this field
      EN_DESCRIPTION: [null, [Validators.required]],
      AR_DESCRIPTION: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false
    if (isEditMode) {
      this.TaxSchemeForm.patchValue(this.formData)
    } else {
      this.TaxSchemeForm.removeControl('TAX_SCHEME_ID')

    }
  }

  get EN_DESCRIPTION() {
    return this.TaxSchemeForm.controls.EN_DESCRIPTION
  }
  get AR_DESCRIPTION() {
    return this.TaxSchemeForm.controls.AR_DESCRIPTION
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.TaxSchemeForm.valid) {
      let body = { ...this.TaxSchemeForm.value }
      this.onSubmit.emit(body)
      console.log(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
