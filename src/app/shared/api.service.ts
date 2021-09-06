import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postClient(data: any) {
    console.log(data);
    return this.http
      .post<any>('https://rocky-spire-51361.herokuapp.com/client', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClient() {
    return this.http
      .get<any>('https://rocky-spire-51361.herokuapp.com/client/2')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateClient(data: any, id: number) {
    return this.http
      .put<any>('https://rocky-spire-51361.herokuapp.com/client/2' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteClient(id: number) {
    return this.http
      .delete<any>('https://rocky-spire-51361.herokuapp.com/client' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Vehicle

  postVehicle(data: any) {
    console.log(data);
    return this.http
      .post<any>('https://rocky-spire-51361.herokuapp.com/vehicle', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getVehicle() {
    return this.http
      .get<any>('https://rocky-spire-51361.herokuapp.com/vehicle')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateVehicle(data: any, id: number) {
    return this.http
      .put<any>('https://rocky-spire-51361.herokuapp.com/vehicle' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteVehicle(id: number) {
    return this.http
      .delete<any>('https://rocky-spire-51361.herokuapp.com/vehicle/2' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Service

  postService(data: any) {
    return this.http
      .post<any>(
        'https://rocky-spire-51361.herokuapp.com/personalisedService',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getService() {
    return this.http
      .get<any>('https://rocky-spire-51361.herokuapp.com/personalisedService/1')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateServices(data: any, id: number) {
    return this.http
      .put<any>(
        'https://rocky-spire-51361.herokuapp.com/personalisedService/3' + id,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteServices(id: number) {
    return this.http
      .delete<any>(
        'https://rocky-spire-51361.herokuapp.com/personalisedService/4' + id
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Quote

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
