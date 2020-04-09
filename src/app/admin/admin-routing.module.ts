import { HomeComponent } from './livro/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path : 'admin/page', redirectTo: 'admin/page/dashboard', pathMatch: "full"},
  {path : 'admin/page/dashboard', component : DashboardComponent},
  {path : 'admin/page/home', component : HomeComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
