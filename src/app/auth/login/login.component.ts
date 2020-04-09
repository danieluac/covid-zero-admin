import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    action: new FormControl('login',[Validators.required]),
  });
  loginError : string;
  loginLoading = false;

  constructor(private route : Router, private authService : AuthService) {
    if(authService.check())
        route.navigate(["admin/page"])
  }

  ngOnInit(): void {

  }
  onSubmit(){
    if(this.loginForm.valid){
      this.loginError = null;
      this.loginLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.loginLoading = false;
          if( typeof response.status != "undefined")
            if(response.status =='Ok')
            {
              this.authService.registerToken(response.token, response.username);
              this.route.navigate(["admin/page"])
            }else 
              if(response.status == 'error')
                this.loginError = response.message;
        },
        (error) => {
          if(error.status === 401 ){            
            this.loginError = error.error.error;
          }else if ( error.status === 0 || error.status === 501 )
            this.loginError = " serviço indisponivel tente mais tarde...";
          this.loginLoading = false;
        });    
      }else
          this.loginError =  '*Os campos devem ser preenchidos';
  }

}
