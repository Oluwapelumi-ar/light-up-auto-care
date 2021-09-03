import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postClient(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postVehicle(data: any) {
    return this.http
      .post<any>('http://localhost:3000/posts', data)

      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postService(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //For Client

  getClient() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  putClient(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/posts' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteClient(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postQuote(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getQuote() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateQuote(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/posts/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteQuote(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
