import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../auth/intafaces/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpFormEncodingCodec } from './HttpFormEncodingCodec';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router : Router, private snackBar : MatSnackBar) { }

  public login(credentials : { username : string, password: string, action: string}){
   
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('username', credentials.username)
        .append('password', credentials.password)
        .append('action', credentials.action)
        .toString();
    return this.http.post<any>(environment.API_ROOT_URL+'admin',body,{      
      headers: headers
    });
    
  }
  public registerUser (credentials : {username : string,password: string,action : string}){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('username', credentials.username)
        .append('password', credentials.password)
        .append('action', 'register')
        .toString();
    return this.http.post(environment.API_ROOT_URL+'admin',body,{      
      headers: headers
    });
  }
  public registerToken(token, user){
    localStorage.setItem("token", token);
    localStorage.setItem("user", btoa(JSON.stringify(user)));
  }
  public handleErrorWhenLogin(error : any){
    if(error.status === 401)
    {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    }
  }
  public logOut() : void {
    
        localStorage.clear();
        this.router.navigate(['admin/auth/login']);
  }
  public getToken(){
    return localStorage.getItem('token')? "Bearer "+localStorage.getItem('token') : null;
  }
  public getUser() : User{
    return localStorage.getItem('user')? JSON.parse(atob(localStorage.getItem("user"))) : null;
  }
  public check(): boolean{
    return (localStorage.getItem("token") && localStorage.getItem("user") )? true : false 
  }
}
