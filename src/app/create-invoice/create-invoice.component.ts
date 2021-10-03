import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { invoiceQuoteModel } from '../invoice/invoiceQuoteModel';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.history = history;
    console.log(history.state.data);
  }

  sendInvoice(data: any) {
    console.log('Got Here');
    console.log('Row Data: ', data);
    const modifiedItems = data.items.map((value: any) => {
      delete value._id;
      return value;
    });
    let invoicePayload: invoiceQuoteModel = {
      clientId: data.clientId,
      vehicleId: data.vehicleId,
      items: modifiedItems,
      totalAmount: data.totalAmount,
    };

    this.api.postInvoice(invoicePayload).subscribe(
      (data: any) => {
        console.log(data);
        alert('successful');
      },

      (err: any) => {
        alert('something went wrong!');
      }
    );
  }

  backToQuote(row: any) {
    this.router.navigate(['/quote'], {});
  }

  // this.router.navigate(['path/to'])
  // .then(() => {
  //   window.location.reload();
  // });
}
