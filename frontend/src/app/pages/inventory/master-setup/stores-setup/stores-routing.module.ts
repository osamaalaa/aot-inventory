import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { AppPreloader } from 'src/app/app-routing-loader';
import { StoresComponent } from './stores/stores.component';
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard';
import { AddStoresComponent } from './stores/add-stores/add-stores.component';
import { EditStoresComponent } from './stores/edit-stores/edit-stores.component';
import { StoresMainComponent } from './stores/stores-main/stores-main.component';
import { StoresItemsGroupComponent } from './stores-items-group/stores-items-group.component';
import { AddStoresItemGroupComponent } from './stores-items-group/add-stores-item-group/add-stores-item-group.component';
import { EditStoresItemsGroupComponent } from './stores-items-group/edit-stores-items-group/edit-stores-items-group.component';
import { StoresItemGroupNoComponent } from './stores-item-group-no/stores-item-group-no.component';
import { AddStoresItemsGroupNoComponent } from './stores-item-group-no/add-stores-items-group-no/add-stores-items-group-no.component';
import { EditStoresItemsGroupNoComponent } from './stores-item-group-no/edit-stores-items-group-no/edit-stores-items-group-no.component';
import { StoresItemsComponent } from './stores-items/stores-items.component';
import { AddStoresItemsComponent } from './stores-items/add-stores-items/add-stores-items.component';
import { EditStoresItemsComponent } from './stores-items/edit-stores-items/edit-stores-items.component';
import { StoresItemsNoComponent } from './stores-items-no/stores-items-no.component';
import { AddStoresItemsNoComponent } from './stores-items-no/add-stores-items-no/add-stores-items-no.component';
import { EditStoresItemsNoComponent } from './stores-items-no/edit-stores-items-no/edit-stores-items-no.component';
import { StoresDocumentTypesComponent } from './stores-document-types/stores-document-types.component';
import { AddStoresDocumentTypesComponent } from './stores-document-types/add-stores-document-types/add-stores-document-types.component';
import { EditStoresDocumentTypesComponent } from './stores-document-types/edit-stores-document-types/edit-stores-document-types.component';
import { StoresLocationsComponent } from './stores-locations/stores-locations.component';
import { AddStoresLocationsComponent } from './stores-locations/add-stores-locations/add-stores-locations.component';
import { EditStoresLocationsComponent } from './stores-locations/edit-stores-locations/edit-stores-locations.component';
import { EditStoreResolver, EditStoresItemsGroupResolver, EditStoresItemsGroupNOResolver, EditStoreItemResolver, EditStoreItemNoResolver, EditStoreDocTypeResolver, EditStoresLocationResolver } from './stores.resolve';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddStoresComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/edit',
    component: EditStoresComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      storeData: EditStoreResolver
    }
  },
  {
    path: ':STORES_ID',
    component: StoresMainComponent,
    data: { key: 'stores Main', title: 'stores Main' },
    canActivate: [AuthGuard],
  },
  {
    path: ':STORES_ID/stores-item-group',
    component: StoresItemsGroupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':STORES_ID/stores-item-group/add',
    component: AddStoresItemGroupComponent,
    canActivate: [AuthGuard],
  },

  {
    path: ':STORES_ID/stores-item-group/:STORES_ITEMS_GROUP_ID',
    component: EditStoresItemsGroupComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      StoresItemgroupData: EditStoresItemsGroupResolver
    },
  },

  {
    path: ':STORES_ID/stores-item-group-no',
    component: StoresItemGroupNoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':STORES_ID/stores-item-group-no/add',
    component: AddStoresItemsGroupNoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: ':STORES_ID/stores-item-group-no/:STORES_ITEMS_GROUP_NO_ID',
    component: EditStoresItemsGroupNoComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      StoresItemgroupNoData: EditStoresItemsGroupNOResolver
    },
  },

  {
    path: ':STORES_ID/stores-items',
    component: StoresItemsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-items/add',
    component: AddStoresItemsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-items/:STORES_ITEMS_ID',
    component: EditStoresItemsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      storeItemData: EditStoreItemResolver
    }
  },
  {
    path: ':STORES_ID/stores-items-no',
    component: StoresItemsNoComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-items-no/add',
    component: AddStoresItemsNoComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-items-no/:STORES_ITEMS_NO_ID',
    component: EditStoresItemsNoComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      storeItemNoData: EditStoreItemNoResolver
    }
  },
  {
    path: ':STORES_ID/stores-document-types',
    component: StoresDocumentTypesComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-document-types/add',
    component: AddStoresDocumentTypesComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-document-types/:STORES_DOCUMENT_TYPES_ID',
    component: EditStoresDocumentTypesComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      storeDocumentTypeData: EditStoreDocTypeResolver
    }
  },
  {
    path: ':STORES_ID/stores-locations',
    component: StoresLocationsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-locations/add',
    component: AddStoresLocationsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard]
  },
  {
    path: ':STORES_ID/stores-locations/:STORES_LOCATIONS_ID',
    component: EditStoresLocationsComponent,
    data: { key: 'stores', title: 'stores' },
    canActivate: [AuthGuard],
    resolve: {
      storeLocationData: EditStoresLocationResolver
    }
  }

]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LayoutsModule
  ],
  providers: [AppPreloader],
  declarations: [],
  exports: [],
})
export class StoresRoutingModule { }