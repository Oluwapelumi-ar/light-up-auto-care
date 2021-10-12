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
  // history: any;
  alertInstance: string = '';
  clientId: string = '';
  vehicleId: string = '';
  items: any = [];
  unit: number = 0;
  rate: number = 0;
  amount: number = 0;
  totalAmount: number = 0;
  alert!: boolean;
  invoiceData: any;
  selectedInvoice: any = {
    billingAddress: {},
  };

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  setInvoice(row: any) {
    this.selectedInvoice = row;
  }
  getInvoices() {
    this.api.getInvoice().subscribe((res: any) => {
      this.invoiceData = res.payload;
      let responses = this.invoiceData.sort((a: any, b: any) => b.id - a.id);
      console.log({ res });
    });

    (err: any) => {
      console.log('Unable to get data from URL + err');
    };
  }

  // deleteInvoices(row: any) {
  //   this.api.deleteInvoice(row.id).subscribe(
  //     (res) => {
  //       this.alert = true;
  //       setTimeout(() => {
  //         this.alert = false;
  //       }, 3000);
  //       this.getInvoices();
  //     },
  //     (reason) => {
  //       alert('Something went wrong!');
  //       this.getInvoices();
  //     }
  //   );
  // }

  closeAlert() {}
}
