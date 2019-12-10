import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';

@NgModule({
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        ButtonComponent,
        InputComponent
    ],
    exports:[DynamicFormComponent],
    imports: [
        CommonModule,
        CleanUIModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    entryComponents:[InputComponent,ButtonComponent]
})
export class DynamicFormBuilderModule { }