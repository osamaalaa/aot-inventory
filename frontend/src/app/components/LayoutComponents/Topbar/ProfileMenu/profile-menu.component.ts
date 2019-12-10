import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { ProfileService } from '../../../../services/profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cui-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class TopbarProfileMenuComponent {
  badgeCount: number = 7
  userName: string
  employee: string
  email: string
  phone: string
  position: string
  img_url: any
  userid: any
  spinning: any = true;
  arabicName:string;

  constructor(public authService: AuthService,
    private translate:TranslateService,
    private profileservice: ProfileService) {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    this.userName = userInfo.USER_NAME || 'Anonymous'
    this.employee = userInfo.EMPLOYEE_ID
    this.email = userInfo.USER_EMAIL
    this.phone = userInfo.USER_MOBILE || '-'
    this.position = userInfo.POSITION_NAME
    this.userid = userInfo.USER_ID
    this.arabicName = userInfo.ARABIC_NAME;
    this.onLangugateChange()
    this.fetchCurrentLanguage()

    this.getUserImage();
    this.getUserProfile()
  }

  lang
  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  badgeCountIncrease() {
    this.badgeCount = 0
  }

  logout() {
    this.authService.SignOut()
  }

  getUserImage() {
    this.profileservice.getUserImage(this.userid).subscribe(url => {
      console.log(url.url)
      this.img_url = url.url
      this.spinning = false
    })
  }

  EN_NAME;
  AR_NAME;
  EMPLOYEE_EMAIL
  getUserProfile() {
    let USER_ID = JSON.parse(localStorage.getItem('user')).USER_ID
    this.profileservice.getUserProfile(USER_ID).subscribe(profile => {
      this.EN_NAME = profile.rows[0].EN_NAME
      this.AR_NAME = profile.rows[0].ARABIC_NAME
      this.EMPLOYEE_EMAIL = profile.rows[0].EMPLOYEE_EMAIL
    },
      error => {
      })
  }

}
