
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { ItemsService } from './items.service';




@Injectable()
export class EditTaxSchemeResolver implements Resolve<any>{
    constructor(

        private taxSchemeService: GeneralSetupService
    ) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.taxSchemeService.gettaxschemeById(route.params.TAX_SCHEME_ID)
    }
}

@Injectable()
export class EditTaxSchemeDetailsResolver implements Resolve<any>{
    constructor(

        private taxSchemeService: GeneralSetupService
    ) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.taxSchemeService.getalltaxschemesdetails(route.params.TAX_SCHEME_ID)
    }
}

@Injectable()
export class EditSlowMovingPolicyResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //  console.log("hiii"+ITEMS_SLOW_POLICY_ID)
        return this.generalSetupService.getSlowmovingpolicy(route.params.SLOW_POLICY_ID)
    }
}

@Injectable()
export class EditInventoryPeriodsResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.generalSetupService.getOneInventoryPeriod(route.params.INVENTORY_PERIODS_ID)
    }
}

@Injectable()
export class EditSupplierResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.generalSetupService.getOneSupplier(route.params.SUPPLIER_ID)
    }
}
@Injectable()
export class EditShortagePolicyResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.generalSetupService.getOneShortagePolicy(route.params.SHORTAGE_POLICY_ID)
    }
}
@Injectable()
export class EditChartOfAccountsResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.generalSetupService.getOneChartOfAccount(route.params.CHART_OF_ACCOUNTS_ID)
    }
}

@Injectable()
export class EditSubsidiaryResolver implements Resolve<any>{
    constructor(
        private generalSetupService: GeneralSetupService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.generalSetupService.getOneSubsidiaryInv(route.params.SUBSIDIARY_ID)
    }
}


@Injectable()
export class EditItemTemplateResolver implements Resolve<any>{
    constructor(

        private itemsService: ItemsService
    ) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.itemsService.getItemTemplateDetail(route.params.ITEMS_TEMPLATE_ID)
    }
}

@Injectable()
export class DetailsItemTemplateResolver implements Resolve<any>{

    constructor(private itemsService: ItemsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let itemTemplateId: number | string = route.params.ITEMS_TEMPLATE_ID;
        return this.itemsService.getItemTemplateDetails(itemTemplateId);

    }
}


@Injectable()
export class EditItemgroupResolver implements Resolve<any>{
    constructor(
        private itemsService: ItemsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.itemsService.getoneitemgroup(route.params.ITEMS_GROUP_ID)
    }
}


