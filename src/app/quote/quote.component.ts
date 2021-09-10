import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ChildrenOutletContexts } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { QuoteModel } from './quote.model';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})

export class QuoteComponent implements OnInit {
<<<<<<< HEAD
  QuoteModel = [];
  enableEdit = false;
  enableEditIndex = null;

  quoteForm = new FormGroup({
    clientId: new FormControl('', [
=======
  items: any;
  item: any;
  unit: any;
  rate: any;
  amount: any;
  clientId: any;
  vehicleId: any;
  vehicleChasisNumber: any;

 QuoteModel = [];
 enableEdit = false;
 enableEditIndex = null; 
  api: any;
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  model = new QuoteModel()

  quoteData!: any;


  submitted = false;

  // updateAmount: number;


  quoteForm = new FormGroup({

    clientId: new FormControl( '', [
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),

    vehicleId: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),

    vehicleChasisNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),

    items: new FormGroup({

      item: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
<<<<<<< HEAD
    unit: new FormControl([
      Validators.required,
      [Validators.minLength(3), Validators.maxLength(20)],
=======

    unit: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317
    ]),

    rate: new FormControl
    (['', Validators.minLength(1), 
    Validators.maxLength(100)]),

    amount: new FormControl(
      '',
<<<<<<< HEAD
      [Validators.minLength(3), Validators.maxLength(20)],
    ]),
  });
  quoteModelObj = {} as QuoteModel;
  quoteData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
=======
      [Validators.minLength(3), 
      Validators.maxLength(20)],
    ),
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317

    }),

  })

  public show:boolean = false;
  public buttonName:any = 'Show';

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Close Quote";
    else
      this.buttonName = "Add Quote";
  }

<<<<<<< HEAD
  deleteQuote(id: any) {
    this.api.deleteQuote(id).subscribe((res: any) => {
      alert('Client deleted successfully');
    });
=======

 getAmount() {
   this.rate = Number(this.rate);
   this.unit = Number(this.unit);
   this.amount = Number(this.amount);
  this.amount = Number(this.unit * this.rate);
  console.log(this.rate, this.unit, this.amount);
  
 }

 enableEditMethod(data: any){​​​​​​​​
  this.enableEdit = false;
  this.enableEditIndex = null;
  
 }​​​​​​​​
  

 onSubmit(){
 this.submitted = true;
  // console.log(this.quoteForm.value);
  }

  deleteQuote(id : any ) {​​​​​​​​
    this.api.deleteQuote(id)
        .subscribe((res: any) => {​​​​​​​​
    alert('Client deleted successfully');
        }​​​​​​​​);
      }​​​​​​​​
    

  get diagnostic(){
    return JSON.stringify(this.model);
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317
  }
}

<<<<<<< HEAD
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
=======


//earlier codes

// import {​​​​​​​​ Component, OnInit }​​​​​​​​ from'@angular/core';
// import {​​​​​​​​
// FormBuilder,
// FormGroup,
// FormControl,
// Validators,
// }​​​​​​​​ from'@angular/forms';
// import {​​​​​​​​ ApiService }​​​​​​​​ from'../shared/api.service';
// import {​​​​​​​​ QuoteModel }​​​​​​​​ from'./quote.model';
 
// @Component({​​​​​​​​
// selector:'app-quote',
// templateUrl:'./quote.component.html',
// styleUrls: ['./quote.component.css'],
// }​​​​​​​​)


// exportclassQuoteComponentimplementsOnInit {​​​​​​​​

 
// QuoteModel = [];
// enableEdit = false;
// enableEditIndex = null;
 
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317

// quoteModelObj = {​​​​​​​​}​​​​​​​​ asQuoteModel;
// quoteData!: any;
// showAdd!: boolean;
// showUpdate!: boolean;
 
// constructor(privateformBuilder: FormBuilder, privateapi: ApiService) {​​​​​​​​}​​​​​​​​
 
// ngOnInit(): void {​​​​​​​​
// this.getAllQuote();
//   }​​​​​​​​
 
// clickAddQuote() {​​​​​​​​
// this.quoteForm.reset();
// this.showAdd = true;
// this.showUpdate = false;
//   }​​​​​​​​
 
// getAllQuote() {​​​​​​​​
// this.api.getQuote().subscribe((res) => {​​​​​​​​
// console.log('...', res);
// this.quoteData = res.payload;
//     }​​​​​​​​);
//   }​​​​​​​​

<<<<<<< HEAD
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
=======
// deleteQuote(id : any ) {​​​​​​​​
// this.api.deleteQuote(id)
//     .subscribe((res: any) => {​​​​​​​​
// alert('Client deleted successfully');
//     }​​​​​​​​);
//   }​​​​​​​​


 
// // get q
 
// enableEditMethod(data: any){​​​​​​​​
// this.enableEdit = false;
// this.enableEditIndex = null;
// this.showAdd = false;
// this.showUpdate = true;

// this.quoteForm.patchValue({​​​​​​​​
// clientId:data.clientId,
// vehicleId:data.vehicleId,
// items:data.items[0].item,
// unit:data.items[0].unit,
// rate:data.items[0].rate,
// amount:data.items[0].amount
 
//     }​​​​​​​​)
//   }​​​​​​​​
 
// updatePostQuoteDetails() {​​​​​​​​
// const {​​​​​​​​ clientId, vehicleId, items, unit, rate, amount }​​​​​​​​ =
// this.quoteForm.value;
// this.quoteModelObj.clientId = clientId;
// this.quoteModelObj.vehicleId = vehicleId;
// this.quoteModelObj.items = items;
// this.quoteModelObj.items[0] = unit;
// this.quoteModelObj.items[1]= rate;
// this.quoteModelObj.items[2] = amount;

 
// this.api
//       .updateQuote(this.quoteModelObj, this.quoteModelObj.id!)
//       .subscribe((res) => {​​​​​​​​
// alert('Updated Successful');
// letref = document.getElementById('cancel');
// ref?.click();
// this.getAllQuote();
//       }​​​​​​​​);
//   }​​​​​​​​
 


// ​[09:31] Shukuralillahi Bakare
    

// clickSub() {​​​​​​​​
// const {​​​​​​​​ amount, clientId, items, rate, unit, vehicleId }​​​​​​​​ =
// this.quoteForm.value;
// constpayload = {​​​​​​​​
// clientId,
// vehicleId,
// items: [{​​​​​​​​
// item:items,
// unit:Number(unit),
// rate:Number(rate),
// amount:Number(amount)
//       }​​​​​​​​],
//     }​​​​​​​​;
// this.api.postQuote(payload).subscribe(
//       (res) => {​​​​​​​​
// console.log('...', res);
// constdata = this.postQuote();
// window.location.reload();
// this.postQuote();
//       }​​​​​​​​,
//     );
//   }​​​​​​​​
// postQuote() {​​​​​​​​
// thrownewError('Method not implemented.');
//   }​​​​​​​​


>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317
