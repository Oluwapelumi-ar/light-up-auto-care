import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  quoteData: any = [];
  id!: number;
  history: any;

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

  sendInvoice($event: any) {
    this.http
      .post('https://lightup-auto-care.herokuapp.com/invoices', {
        history,
      })
      .subscribe(console.log, console.error);
  }

  backToQuote(row: any) {
    this.router.navigate(['/quote'], {});
  }
}
