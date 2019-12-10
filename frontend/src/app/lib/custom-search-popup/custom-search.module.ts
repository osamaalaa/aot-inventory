import { CustomSearchPopup } from './custom-search-popup.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { DynamicFormBuilderModule } from './lib/DynmaicFormBuilder/dynamic-form-builder.module';
import { RequestService } from './request.service';
import { ModalTableComponent } from './lib/Modal-Table/modal-table.component';

@NgModule({
    declarations: [CustomSearchPopup, 
        SearchModalComponent, 
        ModalTableComponent
    ],
    exports:[CustomSearchPopup],
    imports: [
        CommonModule,
        CleanUIModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormBuilderModule
    ],
    providers: [RequestService],
    entryComponents:[SearchModalComponent]
})
export class CustomSearchModule { }