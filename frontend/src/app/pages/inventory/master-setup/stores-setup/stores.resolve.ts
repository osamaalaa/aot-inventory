import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { StoresService } from 'src/app/services/stores.service';

/**** STORE RESOLVERS  */
@Injectable()
export class EditStoreResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getOneStore(route.params.STORES_ID)
    }
}
@Injectable()
export class EditStoreItemResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getOneStoreItem(route.params.STORES_ITEMS_ID)
    }
}
@Injectable()
export class EditStoreItemNoResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getOneStoreItemNo(route.params.STORES_ITEMS_NO_ID)
    }
}
@Injectable()
export class EditStoreDocTypeResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getOneStoreDocumentTypes(route.params.STORES_DOCUMENT_TYPES_ID)
    }
}

@Injectable()
export class EditStoresItemsGroupResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getStoresItemsGroupData(route.params.STORES_ITEMS_GROUP_ID)
    }
}

@Injectable()
export class EditStoresItemsGroupNOResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getStoresItemsGroupNoData(route.params.STORES_ITEMS_GROUP_NO_ID)
    }
}

@Injectable()
export class EditStoresLocationResolver implements Resolve<any>{
    constructor(
        private storesService: StoresService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.storesService.getOneStoreLocations(route.params.STORES_LOCATIONS_ID)
    }
}

