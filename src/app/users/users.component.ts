import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  Data:any;
  data:any[] = [];
  constructor(private UsersService:UsersService , private AuthService:AuthService , private Router:Router){}

  ngOnInit(): void
  {
    this.UsersService.Users().subscribe
    (
      {
        next:(v)=>
        {
          this.Data = v;
          for(let i = 0; i<this.Data.length; ++i)
          {
            if(this.Data[i]?.Results)
            {
              this.data.push(this.Data[i]);
            }
          }
        }
      }
    );
  }
}
