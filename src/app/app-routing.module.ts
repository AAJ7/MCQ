import { AuthenticationGuard } from './authentication.guard';
import { UsersComponent } from './users/users.component';
import { ExamComponent } from './exam/exam.component';
import { LoginComponent } from './login/login.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewquizComponent } from './newquiz/newquiz.component';

const routes: Routes =
[
  { path : "" , redirectTo : "login" , pathMatch : "full" },
  { path : " " , redirectTo : "login" , pathMatch : "full" },

  { path : "register" , component : RegisterComponent },
  { path : "login" , component : LoginComponent },

  { path : "home" , canActivate:[AuthenticationGuard], component : HomeComponent },
  { path : "subjects" , canActivate:[AuthenticationGuard], component : SubjectsComponent },
  { path : "quiz" , canActivate:[AuthenticationGuard], component : NewquizComponent },
  { path : "exam/:id" , canActivate:[AuthenticationGuard], component : ExamComponent },
  { path : "users" , canActivate:[AuthenticationGuard], component : UsersComponent},

  { path : "**", redirectTo : "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
