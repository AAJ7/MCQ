import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users:any[] = [];
  constructor(private AuthService:AuthService , private Router:Router) { }

  registerform : FormGroup = new FormGroup
  (
    {
      username : new FormControl(null , [Validators.required]),
      email : new FormControl(null , [Validators.required , Validators.email]),
      password : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
      confirmpassword : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]),
    }
  )

  ngOnInit(): void {
  }


  Submit(registerform:FormGroup)
  {
    const model =
    {
      username: registerform.value.username,
      email: registerform.value.email,
      password: registerform.value.password
    };

    this.AuthService.usersData().subscribe
          (
            {
              next:(values)=>
              {
                const user = values.find((value:any)=>{return (value["email"] === registerform.value["email"] && value["password"] === registerform.value["password"]);});
                if(user)
                {
                  this.Router.navigate(["/subjects"]);
                }
                else
                {
                  this.AuthService.register(model).subscribe
                  (
                    {
                      next:()=>{this.Router.navigate(["/login"]);}
                    }
                  )
                }
              }
            }
          )
  }
}
