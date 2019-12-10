import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { OperationsService } from 'src/app/services/operations.service';

@Injectable()
export class EditInvOpenBalanceResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneInvOpenBalance(route.params.INV_OPEN_BALANCE_ID)
    }
}

@Injectable()
export class EditinvtransferstoreResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('@:' + route.params.INV_TRANSFER_ID)
        return this.operationsService.getOneTransfer(route.params.INV_TRANSFER_ID)
    }
}
@Injectable()
export class EditinvtransferRResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneTransferR(route.params.INV_TRANSFER_R_ID)
    }
}
@Injectable()
export class EditRcvDocumentResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneRcvDocument(route.params.DOCUMENT_ID)
    }
}
@Injectable()
export class EditRcvInspectionResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneRcvInspection(route.params.DOCUMENT_ID)
    }
}
@Injectable()
export class EditRcvTempResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneRcvTemp(route.params.DOCUMENT_ID)
    }
}



@Injectable()
export class EditInvOpenBalanceItemsResolver implements Resolve<any>{
    constructor(
          private operationsService:OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneInvOpenBalanceItems(route.params.INV_OPEN_BALANCE_ITEMS_ID)
    }
}
@Injectable()
export class EditInvOpenBalanceItemsDetailsResolver implements Resolve<any>{
    constructor(
          private operationsService:OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneInvOpenBalanceItemsDetails(route.params.INV_OPEN_BALANCE_ITEMS_D_ID)
    }
}

@Injectable()
export class EditReqDocResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneReqDoc(route.params.DOCUMENT_ID)
    }
}

@Injectable()
export class EditDispenseResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneDispense(route.params.DOCUMENT_ID)
    }
}

@Injectable()
export class InvStockTakingResolver implements Resolve<any>{
    constructor(
        private operationsService: OperationsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.operationsService.getOneInvStocktaking(route.params.INV_STOCKTAKING_ID)
    }
}