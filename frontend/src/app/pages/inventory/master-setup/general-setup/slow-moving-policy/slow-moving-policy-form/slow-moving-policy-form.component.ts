
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { SLOW_MOVING_POLICY_FORM_GROUP_VALIDATION_MESSAGES } from './slow-moving-policy-form.validations.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-slow-moving-policy-form',
  templateUrl: './slow-moving-policy-form.component.html',
  styleUrls: ['./slow-moving-policy-form.component.scss']
})

export class SlowMovingPolicyFormComponent implements OnInit {
  slowmovingpolicygroupForm: FormGroup;
  validation_messages: any = SLOW_MOVING_POLICY_FORM_GROUP_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private generalSetupService: GeneralSetupService,
    private ui: UIService) {

    this.createForm()
    //this.getAllLookups()
  }
  createForm(): void {
    this.slowmovingpolicygroupForm = this._fb.group({

      SLOW_MOVING_POLICY_TYPE: [null, [Validators.required]],
      //  EN_NAME: [null, [Validators.required]],
      SLOW_MOVING_MINIMUM_VALUE: [null, [Validators.required]],
      SLOW_MOVING_POLICY_DAYS: [null, [Validators.required]],
      AR_DESCRIPTION: [null, [Validators.required]],
      EN_DESCRIPTION: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],

      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  groups: any[] = []
  itemclassList: any[] = []
  taxschema: any[] = []
  ShortagePolicy: any[] = []
  subsidiary: any[] = []
  costmethodlist: any[] = []
  slowMovingPolicyList: any[] = []

  cancel(): void {
    this.onCancel.emit()
  }

  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.slowmovingpolicygroupForm.patchValue(this.formData)
    }
  }

  get SLOW_MOVING_POLICY_TYPE() {
    return this.slowmovingpolicygroupForm.controls.SLOW_MOVING_POLICY_TYPE
  }
  // get EN_NAME() {
  //   return this.slowmovingpolicygroupForm.controls.EN_NAME
  // }

  get SLOW_MOVING_MINIMUM_VALUE() {
    return this.slowmovingpolicygroupForm.controls.SLOW_MOVING_MINIMUM_VALUE
  }
  get SLOW_MOVING_POLICY_DAYS() {
    return this.slowmovingpolicygroupForm.controls.SLOW_MOVING_POLICY_DAYS
  }
  get AR_DESCRIPTION() {
    return this.slowmovingpolicygroupForm.controls.AR_DESCRIPTION
  }

  get EN_DESCRIPTION() {
    return this.slowmovingpolicygroupForm.controls.EN_DESCRIPTION
  }
  get AR_NAME() {
    return this.slowmovingpolicygroupForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.slowmovingpolicygroupForm.controls.EN_NAME
  }



  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.slowmovingpolicygroupForm.valid) {
      this.onSubmit.emit(this.slowmovingpolicygroupForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }



}
