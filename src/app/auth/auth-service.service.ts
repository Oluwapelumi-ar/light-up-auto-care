import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

interface loginData {
  email: string;
  password: string;
}

interface loginResponse {
  email: string;
  password: string;
}

interface createPasswordData {
  password: string;
  confirmPassword: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  login(data: loginData): Observable<any> {
    return this.http.post<loginResponse>(
      'https://lightup-auto-care.herokuapp.com/staffs/login',
      data
    );
  }

  createPassword(data: createPasswordData): Observable<any> {
    return this.http.put<createPasswordData>(
      'https://lightup-auto-care.herokuapp.com/staffs/password/create?email=newclerk@gmail .com',
      data
    );
  }
}
