import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REQUEST_ITEMS_VALIDATION_MESSAGES } from './req-committee.validation.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-req-commitee-form',
  templateUrl: './req-commitee-form.component.html',
  styleUrls: ['./req-commitee-form.component.scss']
})
export class ReqCommiteeFormComponent implements OnInit {

  // form: FormGroup;

  // validation_messages: any = REQUEST_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  // @Input() formData = null;
  // @Input() DOCUMENT_ID = null;
  
  selectedEmployeeList:any[] = [];


  constructor(
    private _fb: FormBuilder,
    private operationsService: OperationsService,
    private drawerRef: NzDrawerRef,
    private ui: UIService) {

  }

  ngOnInit() {
    // this.createForm();
    // this.patchInvStocktakingId();
    // this.checkIfEditModeAndPatchForm();
    // this.patchArrangementNo();
    this.fetchEmployeeList();

  }




  /** Create Form */
  // createForm(): void {
  //   this.form = this._fb.group({
  //     DOCUMENT_ID: [null, [Validators.required]],
  //     ARRANGEMENT_NO: [0, [Validators.required]],
  //     EMPLOYEE_ID: [null, [Validators.required]],
  //     EMPLOYEE_POSITION: [null],
  //     NOTES: [null],
  //     CREATED_BY: [null]
  //   })
  // }


  /***Check if edit mode and patch the form*/
  // checkIfEditModeAndPatchForm(): void {
  //   let isEditMode: boolean = this.formData ? true : false

  //   if (isEditMode) {

  //     this.form.patchValue(this.formData);
  //   }
  // }

  // *--------- lookups --------------* //

  // get ARRANGEMENT_NO() {
    //   return this.form.controls.ARRANGEMENT_NO;
    // }
    // get EMPLOYEE_ID() {
      //   return this.form.controls.EMPLOYEE_ID;
      // }
      // get NOTES() {
  //   return this.form.controls.NOTES;
  // }
  
  
  isfetchingLookup: boolean = false
  employeeList = []
  fetchEmployeeList() {
    this.isfetchingLookup = true;
    this.operationsService.getEmployeeList().subscribe(data => {
      this.isfetchingLookup = false;
      this.employeeList = data['rows'];
    })
  }


  /** On Form Submit */
  submitForm(): void {
    this.closeModal(this.selectedEmployeeList);
    // if (this.form.valid) {
    //   let body = { ...this.form.getRawValue() };
    //   this.closeModal(body);
    // } else {
    //   this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    // }
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
