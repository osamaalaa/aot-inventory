import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Injectable } from '@angular/core'
import { ItemsService } from '../services/items.service';

@Injectable()
export class ItemsValidators {

   allItems: any[] = []

  constructor(private items: ItemsService) {}

   employeeValidator(control: AbstractControl): any {
    this.items.getsubsDiary().subscribe(data => {
      this.allItems = data.rows
      if (this.allItems.filter(function(e) {return e.NAME === control }).length <= 0 ) {
        return false
      } else {
        return null
      }
    },
    error => {
console.log(error)
    })
    }



  otherValidator(control: AbstractControl): ValidationErrors | null {
    return null
  }
}
