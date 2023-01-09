import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit
{
  isloginrole:string = "";

  SubjectName:string = "";
  Questions:any[] = [];
  show:boolean = true;
  constructor(private AdminService:AdminService , private AuthService:AuthService , private Router:Router) { }

  Subjects:any[] = [];
  ngOnInit(): void
  {
    this.AdminService.GetAllSubjects().subscribe({next:(v)=>{this.Subjects = v;}});
    this.AuthService.isloginrole.subscribe({next:()=>{if(this.AuthService.isloginrole.getValue()){this.isloginrole = this.AuthService.isloginrole.getValue();}}});
  }
  Delete(SubjectName:string)
  {
    this.AdminService.GetAllSubjects().subscribe
    (
      {
        next:(v)=>
        {
          for (let index = 0; index < v.length; index++)
          {
            if(v[index]?.SubjectName === SubjectName)
            {
              this.AdminService.DeleteSubject(v[index]?.id).subscribe({next:()=>{}});
              this.Subjects.splice(index , 1);
            }
          }
        }
      }
    );
  }
  Show(index:number)
  {
    this.AdminService.GetSubject(++index).subscribe
    (
      {
        next:(v)=>
        {
        //  if(v?.Questions.length)
        //  {
          this.SubjectName = v.SubjectName;
          this.Questions = v.Questions;
          this.show = false;
        //  }
        }
      }
    );
  }
}



