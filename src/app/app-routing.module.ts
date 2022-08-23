import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'registration', component: RegistrationComponent, pathMatch: 'full'
  },
  {
    path: 'user-details', component: UserDetailsComponent, pathMatch: 'full'
  },
  {
    path: '', redirectTo: 'registration', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
