import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css'],
})
export class ViewQuoteComponent implements OnInit {
  quoteData: any = [];
  id!: number;
  history: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(history.state);
    this.history = history;
    console.log(history.state.data);
  }
}
