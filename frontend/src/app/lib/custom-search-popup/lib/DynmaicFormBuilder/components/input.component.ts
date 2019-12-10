import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ViewEncapsulation } from '@angular/core';
import { FieldConfig } from '../interface/FieldConfig';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: "app-input.col-md-6",
    template: `
    <nz-form-item [formGroup]="group">
        <!--<nz-form-label nzFor="title">{{field.label.en_name}} </nz-form-label>-->
        <nz-form-control>
            <input nz-input [name]="field.name" [type]="field.inputType" [id]="field.name" [placeholder]="currentLang == 'en' ? field.label.en_name : field.label.ar_name"
                [formControlName]="field.name">
            <div *ngFor="let validation of field.validations;">
                <nz-form-explain class="red-color" *ngIf="group.get(field.name).hasError(validation.name)">
                    {{validation.message | translatecui}}
                </nz-form-explain>
            </div>
        </nz-form-control>
    </nz-form-item>
`,
    styles: [],
    encapsulation:ViewEncapsulation.None
})
export class InputComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    currentLang = 'en'
    constructor(private translate:TranslateService) {
        this.currentLang = translate.currentLang;
     }
    ngOnInit() { }
}