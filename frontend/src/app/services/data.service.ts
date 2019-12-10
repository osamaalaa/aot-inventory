import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private value1 = new BehaviorSubject('')
  private value2 = new BehaviorSubject('')
  currentMessage1 = this.value1.asObservable()
  currentMessage2 = this.value2.asObservable()

  constructor() { }

  assignNewValue(message1: string, message2: string) {
    this.value1.next(message1)
    this.value2.next(message2)
  }

}
