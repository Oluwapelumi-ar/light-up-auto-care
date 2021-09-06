import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}
  login(data: loginData): Observable<any> {
    return this.http.post<loginResponse>(
      'https://rocky-spire-51361.herokuapp.com/staff/login',
      data
    );
  }

  createPassword(data: createPasswordData):Observable<any>{
    return this.http.put<createPasswordData>('https://rocky-spire-51361.herokuapp.com/staff/password/create?email=newclerk@gmail .com',data);
  }


}
