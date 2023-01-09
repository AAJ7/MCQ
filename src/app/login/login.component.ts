import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService:AuthService , private Router:Router) { }

  ngOnInit(): void {
  }

  loginform : FormGroup = new FormGroup
  (
    {
      username : new FormControl(null , [Validators.required]),
      email : new FormControl(null , [Validators.required , Validators.email]),
      password : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
      role: new FormControl(null , [Validators.required])
    }
  )
  Submit(loginform:FormGroup)
  {
    this.AuthService.Data(loginform.value.role).subscribe
    (
      {
        next:(values)=>
        {
          let role =  values.findIndex
          (
            (value:any)=>
            {
              return (value["email"] === loginform.value["email"] && value["password"] === loginform.value["password"] && value["username"] === loginform.value["username"]);
            }
          );
          ++role;
          this.AuthService.isloginID.next(role);
          const model =
          {
            username : loginform.value.username,
            role : loginform.value.role,
            userID : role
          }
          if(role)
          {
            this.AuthService.isloginrole.next(loginform.value.role);
            this.AuthService.isloginusername.next(loginform.value.username);
            this.AuthService.UsersSubjects(model).subscribe({next:()=>{}});
            this.AuthService.login(model).subscribe({next:()=>{this.Router.navigate(["/home"]);}});
          }
          else
          {
            this.Router.navigate(["/login"]);
          }
        }
      }
    );
  }
}
