import { UserData } from './../../model/UserData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {


  Url="http://localhost:3000/users";
  constructor(private http:HttpClient) { }
 
  postUser(data:UserData){
    return this.http.post(this.Url,data);
  }
  getUsers(){
    return this.http.get<any>(this.Url);
  }
}
