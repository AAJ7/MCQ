import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloginrole = new BehaviorSubject("");
  isloginusername = new BehaviorSubject("");
  isloginID = new BehaviorSubject(null);

  constructor(private HttpClient:HttpClient , private Router:Router) { }

  register(data:any):Observable<any>
  {
    return this.HttpClient.post("http://localhost:3000/users" , data);
  }
  usersData():Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/users");
  }
  Data(role:string):Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/" + role);
  }
  LoginData():Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/login");
  }
  login(data:any)
  {
    return this.HttpClient.post("http://localhost:3000/login" , data);
  }
  UsersSubjects(data:any)
  {
    return this.HttpClient.post("http://localhost:3000/UsersSubjects" , data);
  }
  // Deletelogin(id:any):Observable<any>
  // {
  //   return this.HttpClient.delete(environment.baseapi + "login/" + id);
  // }


  signout()
  {
    // this.Deletelogin(this.isloginID.getValue()).subscribe({next:()=>{}});
    this.isloginusername.next("");
    this.isloginrole.next("");
    this.isloginID.next(null);
    this.Router.navigate(["/login"]);
  }

}

