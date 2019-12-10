import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service'
import { UIService } from '../../../services/ui.service'
import { parseNumber, formatNumber, AsYouType } from 'libphonenumber-js'
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  name = data.name
  nickname = data.nickname
  photo = data.photo
  background = data.background
  post = data.post
  postsCount = data.postsCount
  followersCount = data.followersCount
  lastActivity = data.lastActivity
  status = 'active'
  skills = data.skills
  coursesEnd = data.coursesEnd
  adress = data.adress
  profSkills = data.profSkills
  lastCompanies = data.lastCompanies
  personal = data.personal
  posts = data.posts
  POSITION_NAME: any
  EN_NAME: any
  EMPLOYEE_ID: any
  DEPARTMENT_EN_NAME: any
  GENDER: any
  MANAGER_EN_NAME: any
  DATE_OF_BIRTH: any
  HIRE_DATE: any
  EMPLOYEE_EMAIL: any
  MOBILE: any
  WORK_HOURS: any
  img_url: any
  spinning: any = true
  formLayout = 'vertical'
  userDate: any = JSON.parse(localStorage.getItem('user'))
  userName: any = this.userDate.USER_NAME || 'Anonymous'

  constructor(private profileservice: ProfileService,
    private ui: UIService,
    private router: Router,
    private shared: DataService) { }

  ngOnInit() {
    this.getUserProfile()
    this.getUserImage()
  }

  getUserProfile() {
    this.profileservice.getUserProfile(this.userDate.USER_ID).subscribe(profile => {
      this.POSITION_NAME = profile.rows[0].POSITION_NAME
      this.EN_NAME = profile.rows[0].EN_NAME
      this.EMPLOYEE_ID = profile.rows[0].EMPLOYEE_ID
      this.DEPARTMENT_EN_NAME = profile.rows[0].DEPARTMENT_EN_NAME
      this.GENDER = profile.rows[0].GENDER
      this.MANAGER_EN_NAME = profile.rows[0].MANAGER_EN_NAME
      this.DATE_OF_BIRTH = profile.rows[0].DATE_OF_BIRTH
      this.HIRE_DATE = profile.rows[0].HIRE_DATE
      this.EMPLOYEE_EMAIL = profile.rows[0].EMPLOYEE_EMAIL
      this.MOBILE =  formatNumber({ country: 'SA', phone: profile.rows[0].MOBILE }, 'National')
      this.WORK_HOURS = profile.rows[0].WORK_HOURS
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

  changePic() {
    this.shared.assignNewValue(this.EN_NAME, this.img_url)
    this.router.navigate(['/basic/profile/pic'])
  }

}
