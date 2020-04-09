import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})   
export class HeaderComponent implements OnInit {
  constructor( public auth : AuthService,private router : Router) {
    if(!auth.check())
      this.router.navigate(["admin/auth/login"])
   }

  ngOnInit(): void {
  }

}
