import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SHORTAGE_POLICY_VALIDATION_MESSAGES } from './shortage-policy-form.validation.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-shortage-policy-form',
  templateUrl: './shortage-policy-form.component.html',
  styleUrls: ['./shortage-policy-form.component.scss']
})
export class ShortagePolicyFormComponent implements OnInit {

  ShortagePolicyForm: FormGroup;

  validation_messages: any = SHORTAGE_POLICY_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private generalSetupService: GeneralSetupService, private ui: UIService) {

  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm(): void {
    this.ShortagePolicyForm = this._fb.group({
      SHORTAGE_POLICY_TYPE: [false],
      SHORTAGE_POLICY_VALUE_TYPE: [false],
      SHORTAGE_POLICY_VALUE: [0, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      MIN_QUANTITY: [null, [Validators.required]],
      MAX_QUANTITY: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false
    if (isEditMode) {
      this.ShortagePolicyForm.patchValue(this.formData)
    }
  }

  get SHORTAGE_POLICY_VALUE() {
    return this.ShortagePolicyForm.controls.SHORTAGE_POLICY_VALUE;
  }
  get AR_NAME() {
    return this.ShortagePolicyForm.controls.AR_NAME;
  }
  get EN_NAME() {
    return this.ShortagePolicyForm.controls.EN_NAME;
  }
  get MAX_QUANTITY() {
    return this.ShortagePolicyForm.controls.MAX_QUANTITY;
  }
  get MIN_QUANTITY() {
    return this.ShortagePolicyForm.controls.MIN_QUANTITY;
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.ShortagePolicyForm.valid) {
      let body = { ...this.ShortagePolicyForm.value }
      body.SHORTAGE_POLICY_TYPE = body.SHORTAGE_POLICY_TYPE == true ? 1 : body.SHORTAGE_POLICY_TYPE == 1 ? 1 : 0;
      body.SHORTAGE_POLICY_VALUE_TYPE = body.SHORTAGE_POLICY_VALUE_TYPE == true ? 1 : body.SHORTAGE_POLICY_VALUE_TYPE == 1 ? 1 : 0;
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
