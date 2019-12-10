import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {} from './master-setup/item-supplier/add-item-supplier/add-item-supplier.component';
import { MasterSetupComponent } from './master-setup/master-setup.component'
import { InventoryRouterModule } from './inventory-routing.module'
import { CleanUIModule } from '../../components/CleanUIComponents/cleanui.module'
import { SharedModule } from '../../shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ItemsTemplatesComponent } from './master-setup/items-templates/items-templates.component'
import { AddItemTemplateComponent } from './master-setup/items-templates/add-item-template/add-item-template.component'
import { EditItemTemplateComponent } from './master-setup/items-templates/edit-item-template/edit-item-template.component'
import { ItemTemplateFormComponent } from './master-setup/items-templates/item-template-form/item-template-form.component'
import { DetailsItemTemplateComponent } from './master-setup/items-templates/details-item-template/details-item-template.component'
import { ChartistModule } from 'ng-chartist'

import { ItemsGroupComponent } from './master-setup/items-group/items-group.component'
import { ItemgroupfromComponent } from './master-setup/items-group/item-group-form/itemgroupfrom.component'
import { AddItemgroupComponent } from './master-setup/items-group/add-itemgroup/add-itemgroup.component';

import { EditItemgroupComponent } from './master-setup/items-group/edit-itemgroup/edit-itemgroup.component';

import { EditItemTemplateResolver, DetailsItemTemplateResolver, EditItemgroupResolver, EditSupplierResolver, EditShortagePolicyResolver, EditChartOfAccountsResolver, EditSubsidiaryResolver, EditSlowMovingPolicyResolver, EditTaxSchemeResolver, EditTaxSchemeDetailsResolver, EditInventoryPeriodsResolver } from 'src/app/services/resolver.service';
import { ChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/chart-of-accounts.component';
import { SlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/slow-moving-policy.component';
import { AddSlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/add-slow-moving-policy/add-slow-moving-policy.component';
import { EditSlowMovingPolicyComponent } from './master-setup/general-setup/slow-moving-policy/edit-slow-moving-policy/edit-slow-moving-policy.component';
import { SlowMovingPolicyFormComponent } from './master-setup/general-setup/slow-moving-policy/slow-moving-policy-form/slow-moving-policy-form.component';
import { SupplierComponent } from './master-setup/general-setup/supplier/supplier.component';
import { AddSupplierComponent } from './master-setup/general-setup/supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './master-setup/general-setup/supplier/edit-supplier/edit-supplier.component';
import { SupplierFormComponent } from './master-setup/general-setup/supplier/supplier-form/supplier-form.component';
import { ShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/shortage-policy.component';
import { AddShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/add-shortage-policy/add-shortage-policy.component';
import { EditShortagePolicyComponent } from './master-setup/general-setup/shortage-policy/edit-shortage-policy/edit-shortage-policy.component';
import { ShortagePolicyFormComponent } from './master-setup/general-setup/shortage-policy/shortage-policy-form/shortage-policy-form.component';
import { AddChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/add-chart-of-accounts/add-chart-of-accounts.component';
import { EditChartOfAccountsComponent } from './master-setup/general-setup/chart-of-accounts/edit-chart-of-accounts/edit-chart-of-accounts.component';
import { SubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/subsidiary-inv-setup.component';
import { AddSubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/add-subsidiary-inv-setup/add-subsidiary-inv-setup.component';
import { EditSubsidiaryInvSetupComponent } from './master-setup/general-setup/subsidiary-inv-setup/edit-subsidiary-inv-setup/edit-subsidiary-inv-setup.component';
import { SubsidiaryInvSetupFormComponent } from './master-setup/general-setup/subsidiary-inv-setup/subsidiary-inv-setup-form/subsidiary-inv-setup-form.component';
import { ChartOfAccountsFormComponent } from './master-setup/general-setup/chart-of-accounts/chart-of-accounts-form/chart-of-accounts-form.component';
import { InventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/inventory-periods.component';
import { AddInventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/add-inventory-periods/add-inventory-periods.component';
import { EditInventoryPeriodsComponent } from './master-setup/general-setup/inventory-periods/edit-inventory-periods/edit-inventory-periods.component';
import { InventoryPeriodsFormComponent } from './master-setup/general-setup/inventory-periods/inventory-periods-form/inventory-periods-form.component';
import { TaxSchemesComponent } from './master-setup/general-setup/tax-scheme/tax-schemes.component';
import { AddTaxSchemeComponent } from './master-setup/general-setup/tax-scheme/add-tax-scheme/add-tax-scheme.component';
import { EditTaxSchemeComponent } from './master-setup/general-setup/tax-scheme/edit-tax-scheme/edit-tax-scheme.component';
import { TaxSchemeDetailsComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/tax-scheme-details/tax-scheme-details.component';
import { AddTaxSchemeDetailsComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/add-tax-scheme-details/add-tax-scheme-details.component';
import { TaxSchemeDetailsFormComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/tax-scheme-details-form/tax-scheme-details-form.component';
import { EditTaxSchemeDetailsComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-details/edit-tax-scheme-details/edit-tax-scheme-details.component';
import { TaxSchemeFormComponent } from './master-setup/general-setup/tax-scheme/tax-scheme-form/tax-scheme-form.component';
import { OrganisationsComponent } from './master-setup/organisations/organisations.component';
import { DemandComponent } from './master-setup/demand/demand.component';
// import { EditInvTransferItemsDetailsDResolver } from './master-setup/stores-setup/stores.resolve';

const COMPONENTS = [
  ItemsTemplatesComponent,
  MasterSetupComponent,

  AddItemTemplateComponent,
  EditItemTemplateComponent,
  ItemTemplateFormComponent,
  DetailsItemTemplateComponent,

  MasterSetupComponent,

  ItemsGroupComponent,
  ItemgroupfromComponent,
  EditItemgroupComponent,

  AddItemgroupComponent,



  SlowMovingPolicyComponent,
  SupplierComponent,
  AddSupplierComponent,
  EditSupplierComponent,
  SupplierFormComponent,
  ShortagePolicyComponent,
  AddShortagePolicyComponent,
  EditShortagePolicyComponent,
  ShortagePolicyFormComponent,

  ChartOfAccountsComponent,
  AddChartOfAccountsComponent,
  EditChartOfAccountsComponent,
  SubsidiaryInvSetupComponent,
  ShortagePolicyFormComponent,
  AddSubsidiaryInvSetupComponent,
  EditSubsidiaryInvSetupComponent,
  SubsidiaryInvSetupFormComponent,
  ChartOfAccountsFormComponent,
  EditSlowMovingPolicyComponent,
  SlowMovingPolicyFormComponent,
  AddSlowMovingPolicyComponent,
  EditInventoryPeriodsComponent,
  AddInventoryPeriodsComponent,
  InventoryPeriodsFormComponent,
  TaxSchemesComponent,
  AddTaxSchemeComponent,
  TaxSchemeFormComponent,
  EditTaxSchemeComponent,
  TaxSchemeDetailsComponent,
  AddTaxSchemeDetailsComponent,
  TaxSchemeDetailsFormComponent,
  EditTaxSchemeDetailsComponent,

  InventoryPeriodsComponent,
  AddInventoryPeriodsComponent,
  EditInventoryPeriodsComponent,
  InventoryPeriodsFormComponent,

]

const PROVIDERS = [
  EditItemTemplateResolver,
  DetailsItemTemplateResolver,
  EditItemgroupComponent,
  EditItemgroupResolver,
  DetailsItemTemplateResolver,
  EditItemTemplateResolver,
  DetailsItemTemplateResolver,
  EditItemgroupResolver,
  DetailsItemTemplateResolver,
  EditTaxSchemeResolver,
  EditTaxSchemeDetailsResolver,
  EditSupplierResolver,
  EditShortagePolicyResolver,
  EditChartOfAccountsResolver,
  EditSubsidiaryResolver,
  EditSlowMovingPolicyResolver,
  EditInventoryPeriodsResolver,
  // EditInvTransferItemsDetailsDResolver
]


@NgModule({
  imports: [
    CommonModule,
    InventoryRouterModule,
    CleanUIModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
  ],
  declarations: [...COMPONENTS, OrganisationsComponent, DemandComponent],
  providers: [...PROVIDERS],
})
export class InventoryModule { }
