import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.getQuoteById(id);
  }

  backToQuote(row: any) {
    this.router.navigate(['/quote'], {});
  }

  getQuoteById(id: number) {
    console.log('get v');
    this.api.getQuoteId(id).subscribe((res: any) => {
      this.quoteData = res.payload;
      // console.log('hello quoute', this.quoteData);
    });
  }
}
