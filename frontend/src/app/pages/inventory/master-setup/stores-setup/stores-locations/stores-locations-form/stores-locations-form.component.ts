import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';
import { STORE_LOCATIONS_VALIDATION_MESSAGES } from './stores-locations-form.validations.messages';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-stores-locations-form',
  templateUrl: './stores-locations-form.component.html',
  styleUrls: ['./stores-locations-form.component.scss']
})
export class StoresLocationsFormComponent implements OnInit {

  storeLocationForm: FormGroup;

  validation_messages: any = STORE_LOCATIONS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() STORES_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private storesService: StoresService, private ui: UIService) {
   
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm():void {
    this.storeLocationForm = this._fb.group({
      STORES_ID:[this.STORES_ID],
      STORES_LOCATIONS_CODE: [null, [Validators.required]], 
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      LOCATION_LAN: [null, [Validators.required]],
      LOCATION_ROW: [null, [Validators.required]],
      LOCATION_COLUMN: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storeLocationForm.patchValue(this.formData)
    }
  }

  get STORES_LOCATIONS_CODE() {
    return this.storeLocationForm.controls.STORES_LOCATIONS_CODE;
  }
  get AR_NAME() {
    return this.storeLocationForm.controls.AR_NAME;
  }
  get EN_NAME() {
    return this.storeLocationForm.controls.EN_NAME;
  }
  get LOCATION_LAN() {
    return this.storeLocationForm.controls.LOCATION_LAN;
  }
  get LOCATION_ROW() {
    return this.storeLocationForm.controls.LOCATION_ROW;
  }
  get LOCATION_COLUMN() {
    return this.storeLocationForm.controls.LOCATION_COLUMN;
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemsList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.storesService.getallitems(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.itemsList = results[0].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.storeLocationForm.valid) {
      this.onSubmit.emit(this.storeLocationForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }


}
