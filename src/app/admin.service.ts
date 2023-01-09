import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private HttpClient:HttpClient) { }

  SendSubject(data:any):Observable<any>
  {
    return this.HttpClient.post("http://localhost:3000/subjects" , data);
  }
  UpdateSubject(data:any , id:number):Observable<any>
  {
    return this.HttpClient.put("http://localhost:3000/subjects/" + id , data);
  }
  GetAllSubjects():Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/subjects");
  }
  GetSubject(id:number):Observable<any>
  {
    return this.HttpClient.get("http://localhost:3000/subjects/" + id);
  }
  DeleteSubject(id:number):Observable<any>
  {
    return this.HttpClient.delete("http://localhost:3000/subjects/" + id);
  }
}
