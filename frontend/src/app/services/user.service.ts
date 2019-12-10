import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    constructor(){}


    getUserAddressBoxId(){
        return JSON.parse(localStorage.getItem('user')).ADDRESS_BOX_ID
    }

    getEmployeeId(){
        return JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID
    }
}