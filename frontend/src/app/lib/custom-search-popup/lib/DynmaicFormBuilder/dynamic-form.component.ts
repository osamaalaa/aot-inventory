import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from './interface/FieldConfig';

@Component({
    selector: 'dynamic-form',
    template: `
    <form class="dynamic-form" [formGroup]="form" (submit)="submit($event)">
    <div class="row">
       <ng-container *ngFor="let field of fields;" [formAlignment]="formAlignment"   dynamicField [field]="field" [group]="form">
       </ng-container>
    </div>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {

    /** Fields */
    @Input() fields: FieldConfig[] = [];

    /** "horizontal" or "vertical" . Used to decide the form alignment */
    @Input() formAlignment: FieldConfig[] = [];

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    get value() {
        return this.form.value;
    }

    ngOnInit() {
        this.form = this.createControl();
    }

    createControl() {
        const group = this.fb.group({});
        this.fields.forEach(field => {
            if (field.type === "button") return;
            const control = this.fb.control(
                field.value,
                this.bindValidations(field.validations || [])
            );
            group.addControl(field.name, control);
        });
        return group;
    }

    /** 
     * * Add validations to a control
     */
    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

    submit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.form.valid) {
            this.onSubmit.emit(this.form.value);
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }
}
