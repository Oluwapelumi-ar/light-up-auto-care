import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css'],
})
export class ViewQuoteComponent implements OnInit {
  today: number = Date.now();
  quoteData: any = [];
  id!: number;
  history: any;
  myQuote: any = {
    name: 'Chika',
    vehicle: 'Benz',
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(history.state);
    this.history = history;
    console.log('vt5756767u');

    console.log(history.state.data);
  }

  backToQuote(row: any) {
    this.router.navigate(['/quote'], {});
  }
}
