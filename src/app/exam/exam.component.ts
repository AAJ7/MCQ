import { UsersService } from './../users.service';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  isloginID:any;

  SubjectName:string = "";
  Question:string = "";
  A1:string = "";
  A2:string = "";
  A3:string = "";
  A4:string = "";
  index:number = 0;
  Radio:boolean = false;
  CorrectAnswer:string[] = [];
  ChosenAnswer:string[] = [];
  Interval:any;
  Result:number = 0;
  Res:boolean = true;
  close:boolean = false;
  id!:any;
  Subject:any;
  // SubjectQuestions:number[] = [];
  UserResults:any =
    {
      Results : []
    };
  UserSubjectObject:any = {};
  Results:object[] = [];
  constructor(private ActivatedRoute:ActivatedRoute , private AdminService:AdminService , private Router:Router , private AuthService:AuthService , private UsersService:UsersService){ }

  ngOnInit(): void
  {
    this.AuthService.isloginID.subscribe({next:()=>{if(this.AuthService.isloginID.getValue()){this.isloginID = this.AuthService.isloginID.getValue();this.UsersService.GetUserData(this.isloginID).subscribe({next:(v)=>{if(v?.Results){this.Results = v?.Results;}}});}}});
    this.AuthService.isloginusername.subscribe({next:()=>{this.UserResults.username = this.AuthService.isloginusername.getValue();}});
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.AdminService.GetSubject(this.id).subscribe({next:(v)=>{this.Subject = v;this.SubjectName = this.Subject.SubjectName;this.UserSubjectObject["subject"] = this.Subject.SubjectName;}});

    this.Interval = setInterval(() =>
      {
        // this.SubjectQuestions = Array.from({length: this.Subject.Questions.length}, () => Math.floor(Math.random() * this.Subject.Questions.length) + 3);
        if(this.index < this.Subject.Questions.length)
        {
          this.close = false;
          this.Radio = true;
          this.Question = this.Subject.Questions[this.index].question;
          this.A1 = this.Subject.Questions[this.index].answer_1;
          this.A2 = this.Subject.Questions[this.index].answer_2;
          this.A3 = this.Subject.Questions[this.index].answer_3;
          this.A4 = this.Subject.Questions[this.index].answer_4;
          this.CorrectAnswer.push(this.Subject.Questions[this.index].correctAnswer);
        }
        else
        {
          clearInterval(this.Interval);
          this.Result = this.Compare();
          this.UsersService.SendUserData(this.UserResults , this.isloginID).subscribe
          (
            {
              next:()=>{}
            }
          );
        }
        this.index = this.index + 1;
      }, 5000);
  }

  FormRadio : FormGroup = new FormGroup(
    {
      Radio : new FormControl(null)
    }
  )
  Submit(FormRadio : FormGroup)
  {
    this.close = true;
    if(FormRadio.value != null)
    {
      this.ChosenAnswer.push(FormRadio.value.Radio);
      FormRadio.reset();
    }
  }
  Compare():number
  {
    let Result = 0;
    for(let i = 0; i<this.CorrectAnswer.length; ++i)
    {
      if (this.ChosenAnswer.indexOf(this.CorrectAnswer[i]) != -1)
      {
        Result += 1;
      }
    }
    this.Res = false;
    Result = (Result / this.CorrectAnswer.length) * 100;
    this.UserSubjectObject.score = +Result.toFixed(1);
    this.Results.push(this.UserSubjectObject);
    this.UserResults.Results = this.Results;
    return +Result.toFixed(1);
  }
  BacktoSubjects()
  {
    this.Router.navigate(["/subjects"]);
  }
}
