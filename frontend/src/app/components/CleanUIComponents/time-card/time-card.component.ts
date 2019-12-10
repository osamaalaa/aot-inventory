import { Component, OnInit, Input } from '@angular/core';
import { HelperUtil } from 'src/app/common/Helper.Util';
const TEN_MINUTES_IN_MILISEC = 200000;
@Component({
  selector: 'cui-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss'],
})
export class TimeCardComponent implements OnInit {

  @Input() date: string | null;

  displayText: string;

  constructor(
  ) { }

  ngOnInit() {
    this.prepareData();
  }

  prepareData() {
    let now = new Date()
    var nowUtc = (now.getTime() + now.getTimezoneOffset() * 60 * 1000);


    let date = new Date(this.date).getTime();

    if (nowUtc - date < TEN_MINUTES_IN_MILISEC) {
      this.displayText = "Now"
    } else if (this.isToday(new Date(this.date))) {
      this.displayText = "Today"
    } else if (this.isYesterDay(new Date(this.date))) {
      this.displayText = "Yesterday"
    } else {
      this.displayText = HelperUtil.formatDate(new Date(this.date))
    }


  }

  isToday(someDate) {
    const today = new Date()
    return someDate.getUTCDate() == today.getUTCDate() &&
      someDate.getUTCMonth() == today.getUTCMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  isYesterDay(someDate) {
    let today = new Date();
    let yesterday = new Date(today.setDate(today.getUTCDate() - 1));

    return someDate.getUTCDate() == yesterday.getUTCDate() &&
      someDate.getUTCMonth() == yesterday.getUTCMonth() &&
      someDate.getUTCFullYear() == yesterday.getUTCFullYear()
  }

}
