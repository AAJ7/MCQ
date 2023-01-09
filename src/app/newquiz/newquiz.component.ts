import { AuthService } from './../auth.service';
import { AdminService } from './../admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';


@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.scss']
})
export class NewquizComponent implements OnInit {

  Questions:any[] = [];
  GoToStep_3:boolean = false;

  Go:string = "Next";
  Color:string = "primary";
  Type:string = "submit";
  Ok:boolean = true;
  Model:any =
  {
    Questions : []
  };
  form_2!:FormGroup;



  constructor(private AdminService:AdminService , private AuthService:AuthService , private Router:Router) { }

  ngOnInit(): void {
    this.form_2 = new FormGroup
  (
    {
      "question" : new FormControl(null , [Validators.required]),
      "answer_1" : new FormControl(null , [Validators.required]),
      "answer_2" : new FormControl(null , [Validators.required]),
      "answer_3" : new FormControl(null , [Validators.required]),
      "answer_4" : new FormControl(null , [Validators.required]),
      "correctAnswer" : new FormControl(null , [Validators.required])
    }
  )

  }
  form_1 : FormGroup = new FormGroup
  (
    {
      "subject" : new FormControl(null , [Validators.required])
    }
  )


  submitForm_1(form_1: FormGroup)
  {
    this.Model.SubjectName = form_1.value.subject;
  }

  CreateQuestion(form_2: FormGroup)
  {
    this.Ok = false;
    let X = form_2.value.correctAnswer;
    let correctAnswer = "";
    if(X === "answer_1"){correctAnswer = form_2.value.answer_1;}
    if(X === "answer_2"){correctAnswer = form_2.value.answer_2;}
    if(X === "answer_3"){correctAnswer = form_2.value.answer_3;}
    if(X === "answer_4"){correctAnswer = form_2.value.answer_4;}
    const model =
    {
      question : form_2.value.question,
      answer_1 : form_2.value.answer_1,
      answer_2 : form_2.value.answer_2,
      answer_3 : form_2.value.answer_3,
      answer_4 : form_2.value.answer_4,
      correctAnswer
    };
    this.Questions.push(model);
    this.Model.Questions = this.Questions;

    form_2.reset();
  }
  submitForm_2(form_2:FormGroup)
  {
    this.Go = "Go";
    this.Color = "warn";
    this.GoToStep_3 = true;
    this.Type = "button";
    this.AdminService.SendSubject(this.Model).subscribe
    (
      {
        next:()=>{}
      }
    )
  }


  Reset(form_2:FormGroup)
  {
    form_2.reset();
  }
  Reset2(form_1:FormGroup, form_2:FormGroup)
  {
    this.Questions = [];
    form_1.reset();
    form_2.reset();
  }


  Update(index:number)
  {
    this.form_2 = new FormGroup
    (
      {
        "question" : new FormControl(this.Questions[index].question),
        "answer_1" : new FormControl(this.Questions[index].answer_1),
        "answer_2" : new FormControl(this.Questions[index].answer_2),
        "answer_3" : new FormControl(this.Questions[index].answer_3),
        "answer_4" : new FormControl(this.Questions[index].answer_4),
      }
    )
  }
  Delete(index:number)
  {
    this.Questions.splice(index , 1);
    this.Model.Questions = this.Questions;
    this.AdminService.GetAllSubjects().subscribe
    (
      {
        next:(v)=>
        {
          for (let X = 0; X < v.length; ++X)
          {
            if(v[X]?.SubjectName === this.Model.SubjectName)
            {
              this.AdminService.UpdateSubject(this.Model , ++X).subscribe({next:()=>{}});
            }
          }
        }
      }
    );
  }
}
