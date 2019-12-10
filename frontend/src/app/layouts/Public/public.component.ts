import { Component } from '@angular/core'

@Component({
  selector: 'layout-public',
  template: `
    <router-outlet (activate)="onActivate($event)"></router-outlet>
  `,
})
export class LayoutPublicComponent {

  onActivate(event:any) {
    window.scroll(0, 0)
  }
}
