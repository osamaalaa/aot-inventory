import { Component, OnInit, Input } from '@angular/core'
declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'cui-progress-group',
  templateUrl: './progress-group.component.html',
})
export class ProgressGroupComponent implements OnInit {
  @Input() name: string
  @Input() description: string
  @Input() progress: string
  @Input() status: string
  groupData = data.progressGroup
  constructor() {}
  ngOnInit() {}
}
