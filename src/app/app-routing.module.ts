import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : '', redirectTo: 'admin/auth/login', pathMatch: "full"},
  {path : 'admin', redirectTo: 'admin/auth/login', pathMatch: "full"},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [ RouterModule]
})
export class AppRoutingModule { }
