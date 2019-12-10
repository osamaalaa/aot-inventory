import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

import { MasterSetupComponent } from './master-setup/master-setup.component'
import { ItemsTemplatesComponent } from './master-setup/items-templates/items-templates.component'
import { AddItemTemplateComponent } from './master-setup/items-templates/add-item-template/add-item-template.component'
import { EditItemTemplateComponent } from './master-setup/items-templates/edit-item-template/edit-item-template.component'
import { DetailsItemTemplateComponent } from './master-setup/items-templates/details-item-template/details-item-template.component'
import { ItemsGroupComponent } from './master-setup/items-group/items-group.component';
import { AddItemgroupComponent } from './master-setup/items-group/add-itemgroup/add-itemgroup.component';
import { EditItemgroupComponent } from './master-setup/items-group/edit-itemgroup/edit-itemgroup.component';
import { EditItemTemplateResolver, DetailsItemTemplateResolver, EditItemgroupResolver, EditSupplierResolver, EditShortagePolicyResolver, EditChartOfAccountsResolver, EditSubsidiaryResolver, EditSlowMovingPolicyResolver, EditTaxSchemeResolver, EditTaxSchemeDetailsResolver, EditInventoryPeriodsResolver } from 'src/app/services/resolver.service';
import { SlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/slow-moving-policy.component';
import { AddSlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/add-slow-moving-policy/add-slow-moving-policy.component';
import { EditSlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/edit-slow-moving-policy/edit-slow-moving-policy.component';
import { SupplierComponent } from './master-setup/general-setup/supplier/supplier.component';
import { AddSupplierComponent } from './master-setup/general-setup/supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './master-setup/general-setup/supplier/edit-supplier/edit-supplier.component';
import { ShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/shortage-policy.component';
import { AddShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/add-shortage-policy/add-shortage-policy.component';
import { EditShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/edit-shortage-policy/edit-shortage-policy.component';
import { ChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/chart-of-accounts.component';
import { AddChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/add-chart-of-accounts/add-chart-of-accounts.component';
import { EditChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/edit-chart-of-accounts/edit-chart-of-accounts.component';

import { InventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/inventory-periods.component';

import { AddInventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/add-inventory-periods/add-inventory-periods.component';
import { EditInventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/edit-inventory-periods/edit-inventory-periods.component';

import { SubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/subsidiary-inv-setup.component';
import { AddSubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/add-subsidiary-inv-setup/add-subsidiary-inv-setup.component';
import { EditSubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/edit-subsidiary-inv-setup/edit-subsidiary-inv-setup.component';
import { AddTaxSchemeComponent } from './master-setup/general-setup/tax-scheme/add-tax-scheme/add-tax-scheme.component';
import { EditTaxSchemeComponent } from './master-setup/general-setup/tax-scheme/edit-tax-scheme/edit-tax-scheme.component';
import { AddTaxSchemeDetailsComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/add-tax-scheme-details/add-tax-scheme-details.component';
import { EditTaxSchemeDetailsComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/edit-tax-scheme-details/edit-tax-scheme-details.component';
import { TaxSchemesComponent } from './master-setup/general-setup/tax-scheme/tax-schemes.component';
import { OrganisationsComponent } from './master-setup/organisations/organisations.component'
import { DemandComponent } from './master-setup/demand/demand.component'

const routes: Routes = [
  {
    path: 'setup',
    component: MasterSetupComponent,
    data: { key: 'items', title: 'Setup' },
    canActivate: [AuthGuard],
  },

  {
    path: 'setup/tax-schemes',
    component: TaxSchemesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'setup/tax-schemes/add',
    component: AddTaxSchemeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/tax-schemes/:TAX_SCHEME_ID',
    component: EditTaxSchemeComponent,
    canActivate: [AuthGuard],
    resolve: {
      taxSchemeData: EditTaxSchemeResolver,
    },
  },
  {
    path: 'setup/tax-schemes/:TAX_SCHEME_ID/details',
    component: EditTaxSchemeDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      taxSchemeDataDetails: EditTaxSchemeDetailsResolver,
    }
  },
  {
    path: 'setup/tax-schemes/details/:TAX_SCHEME_ID/add',
    component: AddTaxSchemeDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'setup/item-templates',
    component: ItemsTemplatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/item-templates/add',
    component: AddItemTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/item-templates/:ITEMS_TEMPLATE_ID',
    component: EditItemTemplateComponent,
    canActivate: [AuthGuard],
    resolve: {
      itemTemplateData: EditItemTemplateResolver,
    },
  },
  {
    path: 'setup/item-templates/:ITEMS_TEMPLATE_ID/details',
    component: DetailsItemTemplateComponent,
    canActivate: [AuthGuard],
    resolve: {
      itemTemplateDetailData: DetailsItemTemplateResolver
    },
  },
  {
    path: 'setup/inventory-periods',
    component: InventoryPeriodsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/inventory-periods/add',
    component: AddInventoryPeriodsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/inventory-periods/:INVENTORY_PERIODS_ID',
    component: EditInventoryPeriodsComponent,
    canActivate: [AuthGuard],
    resolve: {
      itemGroupFormDatas: EditInventoryPeriodsResolver,
    }
  },



  {
    path: 'setup/items-setup',
    loadChildren: "src/app/pages/inventory/master-setup/items-setup/items.module#ItemsModule"
  },
  {
    path: 'setup/stores',
    loadChildren: "src/app/pages/inventory/master-setup/stores-setup/stores.module#StoresModule"
  },
  {
    path: 'operations',
    loadChildren: "src/app/pages/inventory/master-setup/operations/operations.module#OperationsModule"
  },



  {
    path: 'setup/organization',
    component: OrganisationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'demand',
    component: DemandComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'setup/item-groups',
    component: ItemsGroupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/item-groups/add',
    component: AddItemgroupComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'setup/item-groups/:ITEMS_GROUP_ID',
    component: EditItemgroupComponent,
    canActivate: [AuthGuard],
    resolve: {
      itemgroupdate: EditItemgroupResolver,
    },
  },


  {
    path: 'setup/slow-moving-policy',
    component: SlowMovingPolicyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/slow-moving-policy/add',
    component: AddSlowMovingPolicyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/slow-moving-policy/:SLOW_POLICY_ID',
    component: EditSlowMovingPolicyComponent,
    canActivate: [AuthGuard],
    resolve: {
      itemGroupFormDatas: EditSlowMovingPolicyResolver
    }
  },

  {
    path: 'setup/supplier',
    component: SupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/supplier/add',
    component: AddSupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/supplier/:SUPPLIER_ID',
    component: EditSupplierComponent,
    canActivate: [AuthGuard],
    resolve: {
      EdititemsupplierData: EditSupplierResolver,
    },
  },

  {
    path: 'setup/shortage-policy',
    component: ShortagePolicyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/shortage-policy/add',
    component: AddShortagePolicyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/shortage-policy/:SHORTAGE_POLICY_ID',
    component: EditShortagePolicyComponent,
    canActivate: [AuthGuard],
    resolve: {
      EditshortagepolicyData: EditShortagePolicyResolver,
    },
  },
  {
    path: 'setup/chart-of-accounts',
    component: ChartOfAccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/chart-of-accounts/add',
    component: AddChartOfAccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/chart-of-accounts/:CHART_OF_ACCOUNTS_ID',
    component: EditChartOfAccountsComponent,
    canActivate: [AuthGuard],
    resolve: {
      chartOfAccountData: EditChartOfAccountsResolver,
    },
  },
  {
    path: 'setup/subsidiary-inv-setup',
    component: SubsidiaryInvSetupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/subsidiary-inv-setup/add',
    component: AddSubsidiaryInvSetupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/subsidiary-inv-setup/:SUBSIDIARY_ID',
    component: EditSubsidiaryInvSetupComponent,
    canActivate: [AuthGuard],
    resolve: {
      subsidiaryData: EditSubsidiaryResolver,
    },
  },


]


@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class InventoryRouterModule { }
