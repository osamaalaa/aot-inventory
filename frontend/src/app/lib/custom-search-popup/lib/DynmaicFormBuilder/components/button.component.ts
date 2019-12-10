import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../interface/FieldConfig';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: "app-button.row",
    template: `
<div class="col-lg-6" [formGroup]="group" style="padding-bottom:10px">
<button nz-button nzType="primary" (click)="fakeLoading()" [nzLoading]="isLoading"><i nz-icon nzType="search"></i>
<span *ngIf="currentLang == 'ar'">{{field.label.ar_name}}</span>
<span *ngIf="currentLang == 'en'">{{field.label.en_name}}</span>
</button>
</div>
`,
    styles: []
})
export class ButtonComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    isLoading: boolean = false
    currentLang = 'en'
    constructor(private translate: TranslateService) {
        this.currentLang = translate.currentLang;
    }
    ngOnInit() { }
    fakeLoading() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 500)
    }
}