import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePicComponent } from './user-profile/change-pic/change-pic.component';


const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    data: { title: 'User Profile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/pic',
    component: ChangePicComponent,
    data: { title: 'User Pic' },
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AppsRouterModule {}
