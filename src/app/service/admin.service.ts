
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpFormEncodingCodec } from './HttpFormEncodingCodec';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private auth : AuthService, private snackBar : MatSnackBar) { }

  public putMessage(sms : string) : void{
    this.snackBar.open(sms,"",{
      panelClass: 'snackbar',duration: 1500, 
      horizontalPosition : "center", verticalPosition :'bottom'
    });
  }

  public registerCategoria(data : any){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('nome', data.nome)
        .append('telefone', data.telefone)
        .append('profissao', data.profissao)
        .append('senha', data.senha)
        .append('numOrdem', data.numOrdem)
        .toString();

    return this.http.post<any>(environment.API_ROOT_URL+"profissionaisSaude",body, {      
      headers: headers
    });
  }
  public deleteCategoria(id : number){
    return this.http.delete<any>(environment.API_ROOT_URL+"profissionaisSaude/"+id);
  }
  public UpdateCategoria(nome : string, id : number){
    return this.http.put<any>(environment.API_ROOT_URL+"profissionaisSaude/"+id,{nome :nome, "_method": "put"});
  }

  public getCategoria(): any{
    return this.http.get<any>(environment.API_ROOT_URL+"profissionaisSaude");
  } 
  public getTotalEstatistica(): any{
    
    return this.http.get<any>(environment.API_ROOT_URL+'dados');
  }
  
  public registerDados(data : any){
      
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('provincia', data.provincia)
        .append('municipio', data.municipio)
        .append('suspeitos', data.suspeitos)
        .append('positivos', data.positivos)
        .append('recuperados', data.recuperados)
        .append('negativos', data.negativos)
        .append('quaretena', data.quaretena)
        .append('mortes', data.mortes)
        .toString();
    return this.http.post<any>(environment.API_ROOT_URL+"dados",body, {      
        headers: headers
      });
  }
  public deleteDados(id : number){
    return this.http.delete<any>(environment.API_ROOT_URL+"dados/"+id+"?id="+id);
  }
  public UpdateDados(data :any){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('provincia', data.provincia)
        .append('municipio', data.municipio)
        .append('suspeitos', data.suspeitos)
        .append('positivos', data.positivos)
        .append('recuperados', data.recuperados)
        .append('negativos', data.negativos)
        .append('quaretena', data.quaretena)
        .append('mortes', data.mortes)
        .toString();
    return this.http.put<any>(environment.API_ROOT_URL+"dados/EditDados/"+data.id,body, {      
      headers: headers
    });
  }
  public getDados(provincia: string): any{
    return this.http.get<any>(environment.API_ROOT_URL+"dados/"+provincia);
  }
  public registerProvincia(data : any){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('nome', data.nome)
        .append('telefone', data.telefone)
        .append('profissao', data.profissao)
        .toString();

    return this.http.post<any>(environment.API_ROOT_URL+"provincias",body, {      
      headers: headers
    });
  }
  public deleteProvincia(id : number){
    return this.http.delete<any>(environment.API_ROOT_URL+"provincias/"+id);
  }
  public UpdateProvincia(nome : string, id : number){
    return this.http.put<any>(environment.API_ROOT_URL+"provincias/"+id,{nome :nome, "_method": "put"});
  }

  public getProvincia(): any{
    return this.http.get<any>(environment.API_ROOT_URL+"provincias");
  } 
}
