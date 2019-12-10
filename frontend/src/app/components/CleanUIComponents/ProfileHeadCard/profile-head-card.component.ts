import { Component, OnInit } from '@angular/core'
import { ProfileService } from '../../../services/profile.service'
import { UIService } from '../../../services/ui.service'
declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'cui-profile-head-card',
  templateUrl: './profile-head-card.component.html',
  styleUrls: ['./profile-head-card.component.scss'],
})
export class ProfileHeadCardComponent implements OnInit {
  userData = data.user
  img_url: any
  spinning: any = true
  EN_NAME: any
  HIRE_DATE: any
  EMPLOYEE_EMAIL: any
  DEPARTMENT_EN_NAME: any
  POSITION_NAME: any
  userDate: any = JSON.parse(localStorage.getItem('user'))
  userName: any = this.userDate.USER_NAME || 'Anonymous'
  about: any = "What's up"

  constructor(private profileservice: ProfileService,
    private ui: UIService) { }
  ngOnInit() {
    this.getUserProfile()
    this.getUserImage()
  }

  getUserProfile() {
    this.profileservice.getUserProfile(this.userDate.USER_ID).subscribe(profile => {
      this.POSITION_NAME = profile.rows[0].POSITION_NAME
      this.EN_NAME = profile.rows[0].EN_NAME
      this.DEPARTMENT_EN_NAME = profile.rows[0].DEPARTMENT_EN_NAME
      this.HIRE_DATE = profile.rows[0].HIRE_DATE
      this.EMPLOYEE_EMAIL = profile.rows[0].EMPLOYEE_EMAIL
    },
      error => {
        this.ui.createMessage('error', 'error while getting user profile info ..' + error.message)
      })
  }

  getUserImage() {
    this.profileservice.getUserImage(this.userDate.USER_ID).subscribe(url => {
      this.img_url = url.url
      this.spinning = false
    },
      error => {
        this.ui.createMessage('error', 'error while getting user profile image ..' + error.message)
      })
  }

}
