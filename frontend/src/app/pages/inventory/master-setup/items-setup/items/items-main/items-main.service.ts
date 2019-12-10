import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ItemMainService{
    constructor(){}

    public onImageListChange:Subject<any> = new Subject();
}