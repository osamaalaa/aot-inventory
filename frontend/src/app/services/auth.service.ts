import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { HttpClient } from '@angular/common/http'

interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  emailVerified: boolean
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any

  constructor(
    public router: Router,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {

  }

  async NewSignIn(username: string, password: string) {
 
    try {
      this.http.post(`/security/LoginAuth/`, { USER_NAME: username, USER_PASSWORD: password }).subscribe((accessdata: any) => {
        if (accessdata.valid === 'Y') {
          // ------ load access rules & screens ..
           this.http.get('/userRole/getallScreensUserId/' + accessdata.rows[0].USER_ID).subscribe((roles: any) => {
             console.log(roles)
             localStorage.setItem('role', JSON.stringify(roles.rows[0]))
           })
          // ------ load access rules & screens ..
          localStorage.setItem('user', JSON.stringify(accessdata.rows[0]))
          this.router.navigate(['dashboard/beta'])
          // this.notification.success(
          //   'Logged In',
          //   accessdata.rows[0].USER_NAME + ', You have successfully logged in to AOT Inventory Management !',
          // )
        } else {
          localStorage.removeItem('user')
          // this.notification.error('Invalid Login', accessdata.message)
          this.notification.error("خطأ","خطأ في اسم المستخدم أو كلمة مرور")
        }
      })
    } catch (error) {
      localStorage.removeItem('user')
      this.notification.error(error.code, error.message)

      // this.notification.error("خطأ","خطأ في اسم المستخدم أو كلمة مرور")
    }

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return user !== null
  }

  async SignOut() {
    localStorage.removeItem('user')
    this.router.navigate(['user/login'])
  }
}
