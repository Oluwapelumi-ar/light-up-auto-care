import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface loginData {
  email: string;
  password : string
}

interface loginResponse {
  email: string;
  password : string
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // public getToken(){
  //     return localStorage.setItem("userDetails", JSON.stringify(data.payload))
  // }

  constructor(private http: HttpClient) { }
  login(data: loginData):Observable<any>{
    return this.http.post<loginResponse>('https://rocky-spire-51361.herokuapp.com/staff/login',data)
  }
}
