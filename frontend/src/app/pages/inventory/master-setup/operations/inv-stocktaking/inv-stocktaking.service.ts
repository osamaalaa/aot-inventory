import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class InvStocktakingService{

    onPhysicalEntrySwitchChange = new Subject();

    isItemsEmpty:boolean = true;

    isPhysicalEntryEnabled:boolean;

}