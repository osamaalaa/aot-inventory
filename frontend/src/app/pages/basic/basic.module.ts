import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AppsRouterModule } from './apps-routing.module'
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module'
import { SharedModule } from '../../shared.module'
import { PhonePipe } from '../../pipes/phone.pipe'
import { ChangePicComponent } from './user-profile/change-pic/change-pic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent, PhonePipe, ChangePicComponent],
  imports: [
    CommonModule,
    AppsRouterModule,
    SharedModule,
    CleanUIModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BasicModule { }
