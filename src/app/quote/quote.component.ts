import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { QuoteModel } from './quote.model';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  QuoteModel = [];
  enableEdit = false;
  enableEditIndex = null;

  quoteForm = new FormGroup({
    clientId: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    vehicleId: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),

    items: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    unit: new FormControl([
      Validators.required,
      [Validators.minLength(3), Validators.maxLength(20)],
    ]),
    rate: new FormControl([Validators.minLength(1), Validators.maxLength(100)]),
    amount: new FormControl([
      '',
      [Validators.minLength(3), Validators.maxLength(20)],
    ]),
  });
  quoteModelObj = {} as QuoteModel;
  quoteData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllQuote();
  }

  clickAddQuote() {
    this.quoteForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getAllQuote() {
    this.api.getQuote().subscribe((res) => {
      console.log('...', res);
      this.quoteData = res.payload;
    });
  }

  deleteQuote(id: any) {
    this.api.deleteQuote(id).subscribe((res: any) => {
      alert('Client deleted successfully');
    });
  }

  // get q

  enableEditMethod(data: any) {
    this.enableEdit = false;
    this.enableEditIndex = null;
    this.showAdd = false;
    this.showUpdate = true;

    this.quoteForm.patchValue({
      clientId: data.clientId,
      vehicleId: data.vehicleId,
      items: data.items[0].item,
      unit: data.items[0].unit,
      rate: data.items[0].rate,
      amount: data.items[0].amount,
    });
  }

  updatePostQuoteDetails() {
    const { clientId, vehicleId, items, unit, rate, amount } =
      this.quoteForm.value;
    this.quoteModelObj.clientId = clientId;
    this.quoteModelObj.vehicleId = vehicleId;
    this.quoteModelObj.items = items;
    this.quoteModelObj.items[0] = unit;
    this.quoteModelObj.items[1] = rate;
    this.quoteModelObj.items[2] = amount;

    this.api
      .updateQuote(this.quoteModelObj, this.quoteModelObj.id!)
      .subscribe((res) => {
        alert('Updated Successful');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getAllQuote();
      });
  }

  clickSub() {
    const { amount, clientId, items, rate, unit, vehicleId } =
      this.quoteForm.value;
    const payload = {
      clientId,
      vehicleId,
      items: [
        {
          item: items,
          unit: Number(unit),
          rate: Number(rate),
          amount: Number(amount),
        },
      ],
    };
    this.api.postQuote(payload).subscribe((res) => {
      console.log('...', res);
      const data = this.postQuote();
      window.location.reload();
      this.postQuote();
    });
  }
  postQuote() {
    throw new Error('Method not implemented.');
  }
}
