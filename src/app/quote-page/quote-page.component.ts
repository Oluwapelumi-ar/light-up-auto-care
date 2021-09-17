import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


interface quoteDetails {
  clientId:number;
  vehicleId: number;
  items: [
    {
      item: string,
      unit: number,
      rate: number,
      id:number;
      amount: number;
    }
  ],
}
@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css'],
})
export class QuotePageComponent implements OnInit {
  item: any;
  unit: any;
  rate: any;
  amount: any;
  // itemsItem: any;
  required!: Boolean;

  quotes: any;
  clients: any;
  vehicle: any;
  isQuoteCreated: boolean = false;
  quoteData :any;

  enableEdit = false;
  enableEditIndex = null; 

  addQuoteTypeForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiServices: ApiService) {}

  ngOnInit(): void {
    this.addQuoteTypeForm = this.fb.group({
      clientId: new FormControl('', [Validators.required]),

      vehicleId: new FormControl('', [Validators.required]),

      items: this.fb.array([
        this.fb.group({
          item: new FormControl('', Validators.required),
          unit: new FormControl('', Validators.required),
          rate: new FormControl('', Validators.required),
          amount: new FormControl(''),
        }),
      ]),
    });
   
    this.getAllClients();
    this.getAllVehicles();
    this.getAllServices();
    this.getQuotes();

    this.addQuoteTypeForm.statusChanges.subscribe((data: any) => {
      // console.log('Form Status');
      // console.log(data);
    });
  }

  getQuotes() {
    this.apiServices.getQuotes().subscribe(
      (data: any) => {
        console.log({data});
        
        this.quotes = data.payload;
        // console.log(this.quotes)
      },
      (err: any) => {
        // console.log('Unable to get data from URL + err');
      }
    );
  }

  //getting values from Items Array
  get itemsFormArray(): FormArray {
    return this.addQuoteTypeForm.get('items') as FormArray;
  }

  get vehicleIDControl(): FormControl {
    return this.addQuoteTypeForm.get('vehicleId') as FormControl;
  }

  //tracking client ID
  trackClientId(): void {
    //value change monitor
    this.addQuoteTypeForm.valueChanges.subscribe((data) => {
      // console.log(data);
    });
  }
  getAllClients() {
    this.apiServices.getAllClients().subscribe((res: any) => {
      // console.log({ res });
      this.clients = res.payload
    });
  }

  getAllVehicles(){
    this.apiServices.getVehicle().subscribe((res:any) =>{
    // console.log({ res });
    this.vehicle = res.payload
    });
  }

  getAllServices(){
  // console.log("Called Here!!!!")
  this.apiServices.getAllService().subscribe((res:any)=>{
  // console.log({ res });
  this.item = res.payload
  });
  }

  addItems() {
    this.itemsFormArray.push(
      this.fb.group({
        item: '',
        unit: '',
        rate: '',
        amount: '',
      })
    );
  }

  removeItems(i: any) {
    let arr = this.addQuoteTypeForm.get('items') as FormArray;
    arr.removeAt(i);
  }
addQuoteType() {
    this.apiServices.postQuote(this.addQuoteTypeForm.value).subscribe(
      (data) => {
        this.isQuoteCreated = true;
        console.log(data);
        this.getQuotes();
      },
      (err) => {
        console.log('Unable to add Quote + err');
      }
    );
  }

  updateQuote() {
    this.apiServices.updateQuote();

    this.apiServices.updateQuote().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  deleteQuote(row:any) {
    this.apiServices.deleteQuote(1).subscribe(
      (data) => {
        // console.log('User deleted successfully' + data);
      },
      (err) => {
        // console.log('Unable to delete the Quote' + err);
      }
    );
  }

  enableEditMethod(data: any){​​​​​​​​
    this.enableEdit = false;
    this.enableEditIndex = null;
    
   }​​​​​​​​
}
