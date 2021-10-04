import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { invoiceQuoteModel } from './invoiceQuoteModel';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  quoteData: any = [];
  id!: number;
  history: any;
  clientId: string = '';
  vehicleId: string = '';
  items: any = [];
  unit: number = 0;
  rate: number = 0;
  amount: number = 0;
  totalAmount: number = 0;
  // selectedClient: any;
  // selectedVehicle: any;
  invoiceData: any;

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.history = history;
    console.log(history.state.data);

    this.getInvoices();
  }

  getInvoices() {
    this.api.getInvoice().subscribe((res: any) => {
      console.log({ res });
      this.invoiceData = res.payload;
    });

    (err: any) => {
      console.log('Unable to get data from URL + err');
    };
  }

  // this.api.getInvoice().subscribe(
  //   (data: any) => {
  //     let response = data.payload;
  //     let responses = response.sort((a: any, b: any) => b.id - a.id);
  //     this.invoiceData = responses;
  //     console.log({ response });
  //   },
  //   (err: any) => {
  //     console.log('Unable to get data from URL + err');
  //   }
  // );

  deleteInvoices(row: any) {
    this.api.deleteInvoice(row.id).subscribe(
      (res) => {
        alert('successful!');
        // this.alertInstance = 'Deleted';
        this.getInvoices();
      },
      (reason) => {
        alert('Something went wrong!');
        this.getInvoices();
      }
    );
  }
}
