import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/Operators';
import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NgForm } from '@angular/forms';

interface staffDetails {
  id?: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface quote {
  id?: number;
  clientId: number;
  vehicleId: number;
  vehicleChasisNumber: string;
  items: {
    item: string;
    unit: number;
    rate: number;
    amount: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // deleteQuote(id: any) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private http: HttpClient) {}

  // handleError(error: { error: { message: any; }; status: any; message: any; }) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${'This email is already in use'}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  // Client

  postClient(data: any) {
    console.log(data);
    return this.http
      .post<any>('https://lightup-auto-care.herokuapp.com/clients', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllClients() {
    return this.http
      .get<any>('https://lightup-auto-care.herokuapp.com/clients')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClientByID(ID: number) {
    return this.http
      .get<any>(`https://lightup-auto-care.herokuapp.com/clients/${ID}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateClient(data: any, id: number) {
    return this.http
      .put<any>('https://lightup-auto-care.herokuapp.com/clients/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteClient(id: number) {
    return this.http
      .delete<any>('https://lightup-auto-care.herokuapp.com/clients/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Staff
  postStaff(data: staffDetails) {
    console.log(data);
    return this.http
      .post<staffDetails>(
        'https://lightup-auto-care.herokuapp.com/staffs/signup',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllStaffs() {
    return this.http
      .get<any>('https://lightup-auto-care.herokuapp.com/staffs')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getStaffByID(ID: number) {
    return this.http
      .get<any>(`https://lightup-auto-care.herokuapp.com/staffs/${ID}`)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  updateStaff(data: any, id: number) {
    return this.http
      .put<any>('https://lightup-auto-care.herokuapp.com/staffs/' + id, data)
      .pipe(
        map((res: any) => {
          console.log('LOG: ' + res);
          return res;
        })
      );
  }

  deleteStaff(id: number) {
    return this.http
      .delete<staffDetails>(
        'https://lightup-auto-care.herokuapp.com/staffs/' + id
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Vehicle

  postVehicle(data: any) {
    return this.http.post<any>(
      'https://lightup-auto-care.herokuapp.com/vehicles',
      data
    );
  }

  getVehicle() {
    return this.http
      .get<any>('https://lightup-auto-care.herokuapp.com/vehicles')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClientVehicles(clientId: any) {
    return this.http
      .get<any>(
        `https://lightup-auto-care.herokuapp.com/vehicles?clientId=${clientId}`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateVehicle(data: any, id: number) {
    return this.http
      .put<any>('https://lightup-auto-care.herokuapp.com/vehicles' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteVehicle(id: number) {
    return this.http
      .delete<any>('https://lightup-auto-care.herokuapp.com/vehicles/' + id)
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
        'https://lightup-auto-care.herokuapp.com/personalisedServices',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAllService() {
    return this.http
      .get<any>('https://lightup-auto-care.herokuapp.com/personalisedServices')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateService(data: any, id: number) {
    return this.http
      .put<any>(
        'https://lightup-auto-care.herokuapp.com/personalisedServices/' + id,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteService(id: number) {
    return this.http
      .delete<any>(
        'https://lightup-auto-care.herokuapp.com/personalisedServices/' + id
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Quote-Pages Services

  getQuotes(): Observable<quote> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    const params = new HttpParams();

    return this.http.get<quote>(
      'https://lightup-auto-care.herokuapp.com/quotes',
      { headers: headers }
    );
  }

  //post Quote request
  postQuote(data: any) {
    const customHeaders = new HttpHeaders({
      autheticationKey: 'testing2323',
    });
    return this.http.post(
      'https://lightup-auto-care.herokuapp.com/quotes',
      data,
      { headers: customHeaders }
    );
  }

  updateQuote(data: any, id: number): Observable<quote> {
    const putHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJpYXQiOjE2MzI4MjMyMDIsImV4cCI6MTYzMjkwOTYwMn0.vySlgLfJ4BOuDZTDmCWQP4DIUn9T9Njvf8NNFMzLWu4',
    });

    return this.http.put<quote>(
      'https://lightup-auto-care.herokuapp.com/quotes/' + id,
      data,
      { headers: putHeaders }
    );
  }

  deleteQuote(id: number): Observable<quote> {
    return this.http.delete<quote>(
      'https://lightup-auto-care.herokuapp.com/quotes/' + id
    );
  }

  //  const deleteParams = new HttpParams().set('userRole', 'admin');

  getClientAndVehicle(id:any) {
    return this.http.get(
      `https://lightup-auto-care.herokuapp.com/vehicles?clientId=${id}`
    );
  }
}
