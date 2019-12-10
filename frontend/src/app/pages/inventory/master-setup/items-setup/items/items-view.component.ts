import { Component, Input } from '@angular/core';

@Component({
    selector: "item-view",
    template: `
    <nz-descriptions nzTitle="Item Info" nzBordered>
      <nz-descriptions-item 
      nzSpan="2"
      *ngFor="let item of data | keyvalue" 
      nzTitle="{{getKey(item.key) }}">
      {{item.value}}
      </nz-descriptions-item>
    </nz-descriptions>
    `
})
export class ItemViewComponent {
  @Input() data:any

  constructor(){
    console.log(this.data)
  }



  ngOnInit(){
    console.log(this.data)
  }

  getKey(txt){
    return txt.split('_').map(o=>o = o.charAt(0) + o.substring(1).toLowerCase()).filter(a=>a!="Id").join(" ")
  }
}