import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ItemsRoutingModule } from './items-routing.module';
import { DataService } from 'src/app/services/data.service';
import { UIService } from 'src/app/services/ui.service';

import { ItemsComponent } from './items/items.component';
import { ItemsMainComponent } from './items/items-main/items-main.component';
import { ItemsBalanceComponent } from './items-balance/items-balance.component';
import { AddItemBalanceComponent } from './items-balance/add-item-balance/add-item-balance.component';
import { EditItemBalanceComponent } from './items-balance/edit-item-balance/edit-item-balance.component';
import { ItemsAliasesComponent } from './items-aliases/items-aliases.component';
import { ItemAliasFormComponent } from './items-aliases/item-alias-form/item-alias-form.component';
import { AddItemAliasComponent } from './items-aliases/add-item-alias/add-item-alias.component';
import { EditItemAliasComponent } from './items-aliases/edit-item-alias/edit-item-alias.component';
import { ItemBalanceFormComponent } from './items-balance/item-balance-form/item-balance-form.component';
import { ItemsBalanceUnitsComponent } from './items-balance-units/items-balance-units.component';
import { AddItemsBalanceUnitsComponent } from './items-balance-units/add-items-balance-units/add-items-balance-units.component';
import { ItemsBalanceUnitsFormComponent } from './items-balance-units/items-balance-units-form/items-balance-units-form.component';
import { EditItemsBalanceUnitsComponent } from './items-balance-units/edit-items-balance-units/edit-items-balance-units.component';
import { ItemComponentsComponent } from './item-components/item-components.component';
import { AddItemComponentsComponent } from './item-components/add-item-components/add-item-components.component';
import { EditItemComponentsComponent } from './item-components/edit-item-components/edit-item-components.component';
import { ItemComponentsFormComponent } from './item-components/item-components-form/item-components-form.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { ItemsSubstitutionsComponent } from './items-substitutions/items-substitutions.component';
import { AddItemsSubstitutionsComponent } from './items-substitutions/add-items-substitutions/add-items-substitutions.component';
import { EditItemsSubstitutionsComponent } from './items-substitutions/edit-items-substitutions/edit-items-substitutions.component';
import { ItemsSubstitutionsFormComponent } from './items-substitutions/items-substitutions-form/items-substitutions-form.component';
import { DetailsItemsBalanceComponent } from './items-balance/details-items-balance/details-items-balance.component';
import { ItemSupplierFormComponent } from './item-supplier/item-supplier-form/item-supplier-form.component';
import { EditItemSupplierComponent } from './item-supplier/edit-item-supplier/edit-item-supplier.component';
import { ItemSupplierComponent } from './item-supplier/item-supplier.component';
import { AddItemSupplierComponent } from './item-supplier/add-item-supplier/add-item-supplier.component';
import { ItemsDetailsComponent } from './items/items-details/items-details.component';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { SharedModule } from 'src/app/shared.module';
import { ChartistModule } from 'ng-chartist';
import { CommonModule } from '@angular/common';
import { ItemMainResolver, ItemImageResolver, EditItemAliasResolver, EditItemComponentsResolver, EditItemBalanceResolver, EditItemBalanceUnitsResolver, EditItemResolver, EditItemSubstitutionResolver, DetailsItemResolver, EdititemsupplierResolver, DetailsItemBalanceResolver, EditItemUnitsUnitsResolver } from './items.resolve';
import { DynmaicTableModule } from 'src/app/lib/DynamicTable';
import { ItemViewComponent } from './items/items-view.component';
import { ItemMainTableComponent } from './items/items-main/items-main-table/items-main-table.component';
import { ItemsUnitsComponent } from './items-units/items-units.component';
import { ItemsUnitsFormComponent } from './items-units/items-units-form/items-units-form.component';
import { ItemMainFormComponent } from './items/items-main/item-main-form/item-main-form.component';
import { ItemMainStatiticsComponent } from './items/items-main/item-main-statitics/item-main-statitics.component';
import { ChartsModule } from 'ng2-charts';
import { ItemsMainDetailsComponent } from './items/items-main/items-main-details/items-main-details.component';
import { ItemAccountingFormComponent } from './items/items-main/items-main-details/item-accounting-form/item-accounting-form.component';
import { ItemTransactionFormComponent } from './items/items-main/items-main-details/item-transaction-form/item-transaction-form.component';
import { ItemMoreinfoFormComponent } from './items/items-main/items-main-details/item-moreinfo-form/item-moreinfo-form.component';
import { ItemImageUploadComponent } from './items/items-main/item-image-upload/item-image-upload.component';
import { ItemsMainOldComponent } from './items/items-main/item-main-old.component';
import { AddItemsUnitsComponent } from './items-units/add-items-units/add-items-units.component';
import { EditItemsUnitsComponent } from './items-units/edit-items-units/edit-items-units.component';
import { ItemsViewComponent } from './items-view/items-view.component';


const COMPONENTS = [
    ItemsComponent,
    ItemsMainComponent,
    ItemsBalanceComponent,
    AddItemBalanceComponent,
    EditItemBalanceComponent,
    ItemsAliasesComponent,
    ItemAliasFormComponent,
    AddItemAliasComponent,
    EditItemAliasComponent,
    ItemBalanceFormComponent,
    ItemsBalanceUnitsComponent,
    AddItemsBalanceUnitsComponent,
    ItemsBalanceUnitsFormComponent,
    EditItemsBalanceUnitsComponent,
    ItemComponentsComponent,
    AddItemComponentsComponent,
    EditItemComponentsComponent,
    ItemComponentsFormComponent,
    ItemComponentsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemFormComponent,
    ItemsSubstitutionsComponent,
    AddItemsSubstitutionsComponent,
    EditItemsSubstitutionsComponent,
    ItemsSubstitutionsFormComponent,
    DetailsItemsBalanceComponent,
    ItemSupplierFormComponent,
    EditItemSupplierComponent,
    ItemSupplierComponent,
    AddItemSupplierComponent,
    ItemSupplierComponent,
    ItemsDetailsComponent,
    ItemsComponent,
    ItemViewComponent,
    ItemMainTableComponent,
    ItemAccountingFormComponent,
    ItemsUnitsComponent, 
    ItemsUnitsFormComponent, 
    ItemTransactionFormComponent, 
    ItemMoreinfoFormComponent,
    ItemsMainOldComponent
]
var PROVIDERS = [
    ItemMainResolver,
    ItemImageResolver,
    EditItemAliasResolver,
    EditItemComponentsResolver,
    EditItemBalanceResolver,
    EditItemBalanceUnitsResolver,
    EditItemResolver,
    EditItemSubstitutionResolver,
    EditItemUnitsUnitsResolver,
    DetailsItemResolver,
    EdititemsupplierResolver,
    DetailsItemBalanceResolver,

]


@NgModule({
    declarations: [...COMPONENTS, ItemMainFormComponent, ItemMainStatiticsComponent, ItemsMainDetailsComponent, ItemImageUploadComponent, AddItemsUnitsComponent, EditItemsUnitsComponent, ItemsViewComponent],
    imports: [
        CommonModule,
        CleanUIModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ChartistModule,
        ItemsRoutingModule,
        DynmaicTableModule,
        ChartsModule
    ],
    providers: [...PROVIDERS],
    entryComponents:[
        ItemViewComponent,
        ItemFormComponent,
        ItemAliasFormComponent,
        ItemComponentsFormComponent,
        ItemsUnitsFormComponent,
        ItemBalanceFormComponent
    ]
})
export class ItemsModule { }
