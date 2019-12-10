import { Component, OnInit } from '@angular/core';
import { UserAddOutline } from '@ant-design/icons-angular/icons/public_api';
import { DataService } from '../../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService, UploadFile } from 'ng-zorro-antd'
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-change-pic',
  templateUrl: './change-pic.component.html',
  styleUrls: ['./change-pic.component.scss']
})
export class ChangePicComponent implements OnInit {
  backgroundNumber = 1
  fullScreen = false
  userDate: any = JSON.parse(localStorage.getItem('user'))
  userName: any = this.userDate.USER_NAME || 'Anonymous'
  url: any
  uploading = false
  fileList: UploadFile[] = []

  changeForm: FormGroup

  constructor(private shared: DataService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder) {

    this.changeForm = fb.group({
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.shared.currentMessage1.subscribe(value => {
      this.userName = value
    })
    this.shared.currentMessage2.subscribe(value => {
      this.url = value
    })
  }

  changeBackground(): void {
    if (this.backgroundNumber === 5) {
      this.backgroundNumber = 1
    } else {
      this.backgroundNumber += 1
    }
  }

  changeScreen(): void {
    this.fullScreen = !this.fullScreen
  }

  submitForm() {
console.log(this.fileList)
  }
}
