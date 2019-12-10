import { Component, OnInit, Input } from '@angular/core'
@Component({
  selector: 'cui-slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.scss'],
})
export class SliderCardComponent implements OnInit {
  @Input() inverse = false
  @Input() title: string
  @Input() value: string
  @Input() title2: string
  @Input() value2: string
  constructor() {}
  ngOnInit() {}
}
