import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private HttpClient:HttpClient) { }
  GetUserData(ID:number):Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/UsersSubjects/" + ID);
  }
  SendUserData(Model:any, ID:number):Observable<any>
  {
    return this.HttpClient.put("http://localhost:3000/UsersSubjects/" + ID, Model);
  }
  Users():Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/UsersSubjects");
  }
}
