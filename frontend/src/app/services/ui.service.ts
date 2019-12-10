import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { TranslateService } from '@ngx-translate/core'

@Injectable({ providedIn: 'root' })

export class UIService {

  constructor(private message: NzMessageService, private translate: TranslateService) {
  }

  createMessage(type: string, message: string): void {

    if (type == "success") {
      this.translate.get('SUCCESS').subscribe((res: string) => {
        this.message.create(type, res)
      });
    } else {
      this.message.create(type, message)
    }

  }

createMessagedelete(type: string, message: string): void {

  
  if (type == "success1") {
    this.translate.get('SUCCESS1').subscribe((res: string) => {
      this.message.create(type, res)
    });
  } else {
    this.message.create(type, message)
  }

}

}
