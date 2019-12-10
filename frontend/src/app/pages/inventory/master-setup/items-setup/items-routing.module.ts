import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { ItemsComponent } from './items/items.component';
import { ItemsDetailsComponent } from './items/items-details/items-details.component';
import { ItemsAliasesComponent } from './items-aliases/items-aliases.component';
import { AddItemAliasComponent } from './items-aliases/add-item-alias/add-item-alias.component';
import { EditItemAliasComponent } from './items-aliases/edit-item-alias/edit-item-alias.component';
import { ItemComponentsComponent } from './item-components/item-components.component';
import { AddItemComponentsComponent } from './item-components/add-item-components/add-item-components.component';
import { EditItemComponentsComponent } from './item-components/edit-item-components/edit-item-components.component';
import { ItemsBalanceComponent } from './items-balance/items-balance.component';
import { AddItemBalanceComponent } from './items-balance/add-item-balance/add-item-balance.component';
import { EditItemBalanceComponent } from './items-balance/edit-item-balance/edit-item-balance.component';
import { ItemSupplierComponent } from './item-supplier/item-supplier.component';
import { AddItemSupplierComponent } from './item-supplier/add-item-supplier/add-item-supplier.component';
import { EditItemSupplierComponent } from './item-supplier/edit-item-supplier/edit-item-supplier.component';
import { DetailsItemsBalanceComponent } from './items-balance/details-items-balance/details-items-balance.component';
import { ItemsBalanceUnitsComponent } from './items-balance-units/items-balance-units.component';
import { AddItemsBalanceUnitsComponent } from './items-balance-units/add-items-balance-units/add-items-balance-units.component';
import { EditItemsBalanceUnitsComponent } from './items-balance-units/edit-items-balance-units/edit-items-balance-units.component';
import { ItemsSubstitutionsComponent } from './items-substitutions/items-substitutions.component';
import { AddItemsSubstitutionsComponent } from './items-substitutions/add-items-substitutions/add-items-substitutions.component';
import { EditItemsSubstitutionsComponent } from './items-substitutions/edit-items-substitutions/edit-items-substitutions.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ItemsMainComponent } from './items/items-main/items-main.component';
import { ItemImageResolver, EditItemResolver, DetailsItemResolver, EditItemAliasResolver, EditItemComponentsResolver, EditItemBalanceResolver, EdititemsupplierResolver, DetailsItemBalanceResolver, EditItemBalanceUnitsResolver, EditItemSubstitutionResolver, ItemMainResolver, EditItemUnitsUnitsResolver } from './items.resolve';
import { ItemsMainOldComponent } from './items/items-main/item-main-old.component';
import { ItemsUnitsComponent } from './items-units/items-units.component';
import { AddItemsUnitsComponent } from './items-units/add-items-units/add-items-units.component';
import { EditItemsUnitsComponent } from './items-units/edit-items-units/edit-items-units.component';
import { ItemsViewComponent } from './items-view/items-view.component'



const routes: Routes = [
    {
        path: '',
        component: ItemsViewComponent,
        data: { key: 'items', title: 'items' },
        canActivate: [AuthGuard],
    },
    {
        path: 'items',
        component: ItemsComponent,
        data: { key: 'items', title: 'items' },
        canActivate: [AuthGuard],
    },
    {
        path: 'items/add',
        component: AddItemComponent,
        data: { key: 'items', title: 'items' },
        canActivate: [AuthGuard],
    },
    // {
    //     path: 'items/:ITEMS_ID',
    //     component: ItemsMainComponent,
    //     data: { key: 'Items Main', title: 'Items Main' },
    //     canActivate: [AuthGuard],
    //     resolve: {
    //         itemImages: ItemImageResolver
    //     }
    // },
    {
        path: 'items/:ITEMS_ID',
        component: ItemsMainOldComponent,
        data: { key: 'Items Main', title: 'Items Main' },
        canActivate: [AuthGuard],
        resolve: {
            itemData: ItemMainResolver,
            itemImages: ItemImageResolver
        }
    },
    {
        path: 'items/:ITEMS_ID/edit',
        component: EditItemComponent,
        data: { key: 'items', title: 'items' },
        canActivate: [AuthGuard],
        resolve: {
            itemData: EditItemResolver,
        }
    },
    {
        path: 'items/:ITEMS_ID/details',
        component: ItemsDetailsComponent,
        data: { key: 'Items Details', title: 'Items Details' },
        canActivate: [AuthGuard],
        resolve: {
            itemDetailData: DetailsItemResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/aliases',
        component: ItemsAliasesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/aliases/add',
        component: AddItemAliasComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/aliases/:ITEM_ALIAS_ID',
        component: EditItemAliasComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemAliasData: EditItemAliasResolver
        },
    },

    {
        path: 'items/:ITEMS_ID/item-components',
        component: ItemComponentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-components/add',
        component: AddItemComponentsComponent,
        canActivate: [AuthGuard],
    },


    {
        path: 'items/:ITEMS_ID/item-components/:ITEMS_COMPONENTS_ID',
        component: EditItemComponentsComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemComponentData: EditItemComponentsResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/item-components/:ITEMS_COMPONENTS_ID',
        component: EditItemComponentsComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemComponentData: EditItemComponentsResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/item-balances',
        component: ItemsBalanceComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-balances/add',
        component: AddItemBalanceComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-balances/:ITEMS_BALANCE_ID',
        component: EditItemBalanceComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemBalanceData: EditItemBalanceResolver
        },
    },

    {
        path: 'items/:ITEMS_ID/item-suppliers',
        component: ItemSupplierComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-suppliers/add',
        component: AddItemSupplierComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-suppliers/:ITEMS_SUPPLIERS_ID',
        component: EditItemSupplierComponent,
        canActivate: [AuthGuard],
        resolve: {
            EdititemsupplierData: EdititemsupplierResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/item-balances/:ITEMS_BALANCE_ID/details',
        component: DetailsItemsBalanceComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemBalanceDetailData: DetailsItemBalanceResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/item-balance-units',
        component: ItemsBalanceUnitsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-balance-units/add',
        component: AddItemsBalanceUnitsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-balance-units/:ITEMS_BALANCE_UNITS_ID',
        component: EditItemsBalanceUnitsComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemBalanceUnitsData: EditItemBalanceUnitsResolver
        },
    },
    {
        path: 'items/:ITEMS_ID/item-units',
        component: ItemsUnitsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-units/add',
        component: AddItemsUnitsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-units/:ITEMS_UNITS_ID',
        component: EditItemsUnitsComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemUnitsData: EditItemUnitsUnitsResolver
        },
    },

    {
        path: 'items/:ITEMS_ID/item-substitutions',
        component: ItemsSubstitutionsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-substitutions/add',
        component: AddItemsSubstitutionsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'items/:ITEMS_ID/item-substitutions/:ITEMS_SUBSTITUTIONS_ID',
        component: EditItemsSubstitutionsComponent,
        canActivate: [AuthGuard],
        resolve: {
            itemSubstitutionData: EditItemSubstitutionResolver
        },
    },
]

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        LayoutsModule,
    ],
    providers: [AppPreloader],
    declarations: [],
    exports: [RouterModule],
})
export class ItemsRoutingModule { }
