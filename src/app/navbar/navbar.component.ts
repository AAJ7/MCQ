import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  isloginusername:string = "";
  isloginrole:string = "";

  constructor(private AuthService:AuthService , private Router:Router) { }

  ngOnInit(): void {
    this.AuthService.isloginrole.subscribe({next:()=>{if(this.AuthService.isloginrole.getValue()){this.isloginrole = this.AuthService.isloginrole.getValue();}else{this.isloginrole = "";}}});
    this.AuthService.isloginusername.subscribe({next:()=>{if(this.AuthService.isloginusername.getValue()){this.isloginusername = this.AuthService.isloginusername.getValue();}else{this.isloginusername = "";}}});
  }

  logout()
  {
    this.AuthService.signout();
  }
}
