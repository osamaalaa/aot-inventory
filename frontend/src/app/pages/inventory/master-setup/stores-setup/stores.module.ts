import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';

import { SharedModule } from 'src/app/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartistModule } from 'ng-chartist';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresItemsGroupComponent } from './stores-items-group/stores-items-group.component';
import { AddStoresItemGroupComponent } from './stores-items-group/add-stores-item-group/add-stores-item-group.component';
import { EditStoresItemsGroupComponent } from './stores-items-group/edit-stores-items-group/edit-stores-items-group.component';
import { StoresItemGroupFormComponent } from './stores-items-group/stores-item-group-form/stores-item-group-form.component';
import { StoresItemGroupNoComponent } from './stores-item-group-no/stores-item-group-no.component';
import { AddStoresItemsGroupNoComponent } from './stores-item-group-no/add-stores-items-group-no/add-stores-items-group-no.component';
import { EditStoresItemsGroupNoComponent } from './stores-item-group-no/edit-stores-items-group-no/edit-stores-items-group-no.component';
import { StoresItemsGroupNoFormComponent } from './stores-item-group-no/stores-items-group-no-form/stores-items-group-no-form.component';
import { StoresComponent } from './stores/stores.component';
import { StoresMainComponent } from './stores/stores-main/stores-main.component';
import { AddStoresComponent } from './stores/add-stores/add-stores.component';
import { EditStoresComponent } from './stores/edit-stores/edit-stores.component';
import { StoresFormComponent } from './stores/stores-form/stores-form.component';
import { StoresItemsComponent } from './stores-items/stores-items.component';
import { AddStoresItemsComponent } from './stores-items/add-stores-items/add-stores-items.component';
import { EditStoresItemsComponent } from './stores-items/edit-stores-items/edit-stores-items.component';
import { StoresItemsFormComponent } from './stores-items/stores-items-form/stores-items-form.component';
import { StoresItemsNoComponent } from './stores-items-no/stores-items-no.component';
import { AddStoresItemsNoComponent } from './stores-items-no/add-stores-items-no/add-stores-items-no.component';
import { EditStoresItemsNoComponent } from './stores-items-no/edit-stores-items-no/edit-stores-items-no.component';
import { StoresItemsNoFormComponent } from './stores-items-no/stores-items-no-form/stores-items-no-form.component';
import { StoresDocumentTypesComponent } from './stores-document-types/stores-document-types.component';
import { AddStoresDocumentTypesComponent } from './stores-document-types/add-stores-document-types/add-stores-document-types.component';
import { EditStoresDocumentTypesComponent } from './stores-document-types/edit-stores-document-types/edit-stores-document-types.component';
import { StoresDocumentTypesFormComponent } from './stores-document-types/stores-document-types-form/stores-document-types-form.component';
import { StoresLocationsComponent } from './stores-locations/stores-locations.component';
import { AddStoresLocationsComponent } from './stores-locations/add-stores-locations/add-stores-locations.component';
import { EditStoresLocationsComponent } from './stores-locations/edit-stores-locations/edit-stores-locations.component';
import { StoresLocationsFormComponent } from './stores-locations/stores-locations-form/stores-locations-form.component';
import { EditStoreResolver, EditStoreItemResolver, EditStoreItemNoResolver, EditStoreDocTypeResolver, EditStoresItemsGroupResolver, EditStoresLocationResolver, EditStoresItemsGroupNOResolver } from './stores.resolve';

const COMPONENTS = [
    StoresItemsGroupComponent,
    AddStoresItemGroupComponent,
    EditStoresItemsGroupComponent,
    StoresItemGroupFormComponent,
    StoresItemGroupNoComponent,
    AddStoresItemsGroupNoComponent,
    EditStoresItemsGroupNoComponent,
    StoresItemsGroupNoFormComponent,
    StoresComponent,
    StoresMainComponent,
    AddStoresComponent,
    EditStoresComponent,
    StoresFormComponent,
    StoresItemsComponent,
    AddStoresItemsComponent,
    EditStoresItemsComponent,
    StoresItemsFormComponent,
    StoresItemsNoComponent,
    AddStoresItemsNoComponent,
    EditStoresItemsNoComponent,
    StoresItemsNoFormComponent,
    StoresDocumentTypesComponent,
    AddStoresDocumentTypesComponent,
    EditStoresDocumentTypesComponent,
    StoresDocumentTypesFormComponent,
    StoresLocationsComponent,
    AddStoresLocationsComponent,
    EditStoresLocationsComponent,
    StoresLocationsFormComponent
]

const PROVIDERS = [
    EditStoreResolver,
    EditStoreItemResolver,
    EditStoreItemNoResolver,
    EditStoreDocTypeResolver,
    EditStoresItemsGroupResolver,
    EditStoresLocationResolver,
    EditStoresItemsGroupNOResolver,
    EditStoreResolver,
    EditStoreItemResolver,
    EditStoreItemNoResolver,
    EditStoreDocTypeResolver,
    EditStoresItemsGroupResolver,
    EditStoresLocationResolver,
    EditStoresItemsGroupNOResolver,
]

@NgModule({
    declarations: [...COMPONENTS ],
    imports: [
        CommonModule,
        CleanUIModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ChartistModule,
        StoresRoutingModule
    ],
    providers: [...PROVIDERS],
    exports:[],
    entryComponents: []
})
export class StoresModule { }