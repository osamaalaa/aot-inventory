import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OperationsService } from 'src/app/services/operations.service';
import { STOCKTAKING_ITEMS_VALIDATION_MESSAGES } from '../../inv-stocktaking-items/inv-stocktaking-items-form/inv-stocktaking-items.validation.messages';
import { NzDrawerRef } from 'ng-zorro-antd';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-inv-stocktaking-committee-form',
  templateUrl: './inv-stocktaking-committee-form.component.html',
  styleUrls: ['./inv-stocktaking-committee-form.component.scss']
})
export class InvStocktakingCommitteeFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = STOCKTAKING_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() INV_STOCKTAKING_ID = null;

  constructor(
    private _fb: FormBuilder,
    private operationsService:OperationsService,
    private drawerRef: NzDrawerRef,
    private ui: UIService) {

  }

  ngOnInit() {
    this.createForm();
    this.patchInvStocktakingId();
    this.checkIfEditModeAndPatchForm();
    this.patchArrangementNo();
    this.fetchEmployeeList();

  }




  patchInvStocktakingId() {
    this.form.controls.INV_STOCKTAKING_ID.setValue(this.INV_STOCKTAKING_ID)
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
      INV_STOCKTAKING_ID: [null, [Validators.required]],
      ARRANGEMENT_NO: [0, [Validators.required]],
      EMPLOYEE_ID: [null, [Validators.required]],
      EMPLOYEE_POSITION: [null],
      NOTES: [null],
      CREATED_BY:[null]
    })
  }


  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemList = [{
        ITEMS_ID: this.formData.ITEMS_ID,
        EN_NAME: this.formData.ITEM_EN_NAME,
        AR_NAME: this.formData.ITEM_AR_NAME
      }]
      this.form.patchValue(this.formData);
    }
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemList: any[] = []
  get ARRANGEMENT_NO() {
    return this.form.controls.ARRANGEMENT_NO;
  }
  get EMPLOYEE_ID() {
    return this.form.controls.EMPLOYEE_ID;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }


  employeeList = []
  fetchEmployeeList(){
    this.isfetchingLookup = true;
    this.operationsService.getEmployeeList().subscribe(data=>{
      this.isfetchingLookup = false;
      this.employeeList = data['rows'];
    })
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      let body = { ...this.form.getRawValue() };
      this.closeModal(body);
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  onSelectItems(e) {
    if (e && e.length) {
      this.itemList = e;
      this.form.get('ITEMS_ID').patchValue(e[0].ITEMS_ID);

    }
  }



  /** 
   * * FUnction to close modal and notify the one who triggered the modal
   */
  closeModal(data: any = null) {
    // if (data) {
    //   let item = this.itemList.filter(o => o.ITEMS_ID == data.ITEMS_ID)[0]
    //   data.ITEM_EN_NAME = item.EN_NAME;
    //   data.ITEM_AR_NAME = item.AR_NAME;
    // }
    this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.closeModal(null)
  }

}
