import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{canActivate,redirectLoggedInTo,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverComponent } from './components/recover/recover.component';
const routes: Routes = [ 
  {path:``,component :LoginComponent},
  {path:`dashboard`,component :DashboardComponent,
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:`login`,component :LoginComponent},
  {path:`register`,component :RegisterComponent},
  {path:`recover`,component:RecoverComponent},
  {path:`**`,component :LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
