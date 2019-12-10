import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class HomeMenuService{
    constructor(){

    }

    public refreshNotification$ = new Subject();
}