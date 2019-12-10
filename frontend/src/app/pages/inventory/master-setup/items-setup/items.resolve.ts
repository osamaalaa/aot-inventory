import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ItemsService } from 'src/app/services/items.service';

@Injectable()
export class ItemMainResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getoneitem(route.params.ITEMS_ID)
    }
}
@Injectable()
export class ItemImageResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getItemImages(route.params.ITEMS_ID)
    }
}

@Injectable()
export class EditItemAliasResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getItemAliasDetail(route.params.ITEM_ALIAS_ID)
    }
}
@Injectable()
export class EditItemBalanceResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getItemBalance(route.params.ITEMS_BALANCE_ID)
    }
}

@Injectable()
export class DetailsItemBalanceResolver implements Resolve<any>{

    constructor(private itemsService:ItemsService){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){

        let ItemsBalanceId:number | string = route.params.ITEMS_BALANCE_ID;
        return this.itemsService.getItemBalanceDetails(ItemsBalanceId);

    }
}





@Injectable()
export class EditItemComponentsResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getItemComponentsDetail(route.params.ITEMS_COMPONENTS_ID)
    }
}

@Injectable()
export class EditItemBalanceUnitsResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getItemBalanceUnit(route.params.ITEMS_BALANCE_UNITS_ID)
    }
}
@Injectable()
export class EditItemResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getoneitem(route.params.ITEMS_ID)
    }
}
@Injectable()
export class EditItemSubstitutionResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getOneItemSubstitution(route.params.ITEMS_SUBSTITUTIONS_ID)
    }
}
@Injectable()
export class DetailsItemResolver implements Resolve<any>{

    constructor(private itemsService:ItemsService){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){

        let itemId:number | string = route.params.ITEMS_ID;
        return this.itemsService.getItemDetails(itemId);

    }
}
@Injectable()
export class EdititemsupplierResolver implements Resolve <any>{
    constructor(
        private itemsService:ItemsService
    ){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getoneitemsup(route.params.ITEMS_SUPPLIERS_ID)
    }
}
@Injectable()
export class EditItemUnitsUnitsResolver implements Resolve<any>{
    constructor(
        private itemsService:ItemsService
    ){}
        //unit-fix
    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.itemsService.getOneItemUnit(route.params.ITEMS_UNITS_ID)
    }
}