
import { StoresService } from 'src/app/services/stores.service';
import { StoresItemsGroupModelService } from '../stores-items-group.model.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { STORES_ITEM_GROUP_VALIDATION_MESSAGES } from './stores-item-group-form.validation.messages';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-stores-item-group-form',
  templateUrl: './stores-item-group-form.component.html',
  styleUrls: ['./stores-item-group-form.component.scss']
})
export class StoresItemGroupFormComponent implements OnInit {

  lang: string;

  storesitemgroupform: FormGroup;

  validation_messages: any = STORES_ITEM_GROUP_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() STORES_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private storesService: StoresService, private ui: UIService, public translate: TranslateService) {

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
    this.storesitemgroupform = this._fb.group({
      STORES_ID: [this.STORES_ID],
      ITEMS_GROUP_ID: [null, [Validators.required]],

      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
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

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storesitemgroupform.patchValue(this.formData)
    }
  }

  get ITEMS_GROUP_ID() {
    return this.storesitemgroupform.controls.ITEMS_GROUP_ID
  }
  get STATUS() {
    return this.storesitemgroupform.controls.STATUS
  }



  itemsList: any[] = []
  storesitemgroupalldata: any[] = []
  getAllLookups() {

    forkJoin(

      this.storesService.getallgroups(),
    ).subscribe(
      results => {

        this.storesitemgroupalldata = results[0].rows;

      },
      error => {

        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.storesitemgroupform.valid) {
      this.onSubmit.emit(this.storesitemgroupform.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}

