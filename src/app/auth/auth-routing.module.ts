import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'admin', redirectTo: "admin/auth/login", pathMatch: "full"},
  {path:'admin/auth', redirectTo: "admin/auth/login", pathMatch: "full"},
  {path: "admin/auth/login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }