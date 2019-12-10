import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OperationsService } from 'src/app/services/operations.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-inv-stocktaking-bal-u-form',
  templateUrl: './inv-stocktaking-bal-u-form.component.html',
  styleUrls: ['./inv-stocktaking-bal-u-form.component.scss']
})
export class InvStocktakingBalUFormComponent implements OnInit {
  form: FormGroup;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;

  constructor(
    private _fb: FormBuilder,
    private operationsService:OperationsService,
    private drawerRef: NzDrawerRef,
    private itemService:ItemsService,
    private ui: UIService) {
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({
      STOCKTAKING_QTY_ON_HAND: [null],
      STOCKTAKING_CURRENT_BALANCE: [null]
    })
  }




  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData);
    }
  }



  get ARRANGEMENT_NO() {
    return this.form.controls.ARRANGEMENT_NO;
  }
  get ITEMS_ID() {
    return this.form.controls.ITEMS_ID;
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      let body = { ...this.form.getRawValue() };
      body.STOCKTAKING_CURRENT_BALANCE =  body.STOCKTAKING_CURRENT_BALANCE || 0;
      body.STOCKTAKING_CURRENT_BALANCE =  body.STOCKTAKING_CURRENT_BALANCE || 0;

      this.closeModal(body);
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** 
   * * FUnction to close modal and notify the one who triggered the modal
   */
  closeModal(data: any = null) {
    this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.closeModal(null)
  }

}
