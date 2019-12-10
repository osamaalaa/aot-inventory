import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { ITEM_ALIAS_VALIDATION_MESSAGES } from './item-alias-form.validation.messages';
import { CONSTANTS } from 'src/app/services/constants.service';
// import { NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-alias-form',
  templateUrl: './item-alias-form.component.html',
  styleUrls: ['./item-alias-form.component.scss'],
})
export class ItemAliasFormComponent implements OnInit {

  lang: string;

  itemAliasForm: FormGroup;

  validation_messages: any = ITEM_ALIAS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private itemsService: ItemsService,
    // private drawerRef: NzDrawerRef,
    public translate: TranslateService,
    private ui: UIService) {

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
    this.itemAliasForm = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO: Remove this field
      ITEM_CODE: [null, [Validators.required]],
      DEFAULT_ALIASES: [false],
      ALIASES_TYPE_ID: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.formData.DEFAULT_ALIASES = this.formData.DEFAULT_ALIASES == 1 ? true : false
      this.itemAliasForm.patchValue(this.formData)
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


  get ITEM_CODE() {
    return this.itemAliasForm.controls.ITEM_CODE
  }
  get DEFAULT_ALIASES() {
    return this.itemAliasForm.controls.DEFAULT_ALIASES
  }
  get ALIASES_TYPE_ID() {
    return this.itemAliasForm.controls.ALIASES_TYPE_ID
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  // itemsList: any[] = []
  aliasTypeList: any[] = []
  getAllLookups() {
    //alert(1);
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.aliasType),
      // this.itemsService.getallitems(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.aliasTypeList = results[0].rows;
        //  alert("this.aliasTypeList...."+JSON.stringify(this.aliasTypeList));
        // this.itemsList = results[1].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.itemAliasForm.valid) {
      let body = { ...this.itemAliasForm.value }
      body.DEFAULT_ALIASES = body.DEFAULT_ALIASES == true ? 1 : 0
      this.onSubmit.emit(body)
      // this.drawerRef.close(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit();
    // this.drawerRef.close()

  }

}
