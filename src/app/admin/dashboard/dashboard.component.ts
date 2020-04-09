import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public suspeitos;
  public mortes;
  public positivos;
  public recuperados;
  public quarentena;
  public negativos;
  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.totalData();
  }
  totalData(){
    this.admin.getTotalEstatistica().subscribe(
      (response) =>{
        // console.log(response)
        this.suspeitos = response.suspeitos;
        this.positivos = response.positivos;
        this.recuperados = response.recuperados;
        this.mortes = response.mortes;
        this.quarentena = response.quarentena;
        this.negativos = response.negativos;
      }
    )
  }

}
