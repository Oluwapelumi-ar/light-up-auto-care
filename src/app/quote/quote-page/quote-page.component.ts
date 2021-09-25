import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { QuoteModel } from './quoteModel';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css'],
})
export class QuotePageComponent implements OnInit {
  test: any;
  item: any;
  unit: any;
  rate: any;
  amount: any;
  required!: Boolean;

  // private quoteData: string = '';

  quotes: any;
  viewQte: any;
  clients: any;
  vehicle: any;
  clientVehicles: any;
  isQuoteCreated: boolean = false;
  quoteData!: any;
  row: any;
  quoteModelObj: QuoteModel = new QuoteModel();
  addQuoteTypeForm!: FormGroup;
  sum: number = 0;
  editID: any;
  api: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private router: Router
  ) {
    //    gotoDynamic() {
    //   //this.router.navigateByUrl('/dynamic', { state: { id:1 , name:'Angular' } });
    //   this.router.navigateByUrl('/dynamic', { state: this.quote })
    // }
  }

  ngOnInit(): void {
    this.addQuoteTypeForm = this.fb.group({
      clientId: new FormControl('', [Validators.required]),

      vehicleId: new FormControl('', [Validators.required]),

      items: this.fb.array([
        this.fb.group({
          item: new FormControl('', Validators.required),
          unit: new FormControl('', Validators.required),
          rate: new FormControl('', Validators.required),
        }),
      ]),
    });

    this.getAllClients();
    this.getAllVehicles();
    this.getAllServices();
    this.getQuotes();
    // this.getAllQuote();

    this.addQuoteTypeForm.statusChanges.subscribe((data: any) => {
      // console.log(data);
    });

    this.quoteData = 'Invoice Info';
  }

  goToInvoice() {
    this.router.navigate(['/invoice'], { state: { data: this.quoteData } });
  }

  onUnitChange(event: any) {
    this.sum = event.target.value;
    // console.log(event.target.value)
  }

  getQuotes() {
    this.apiServices.getQuotes().subscribe(
      (data: any) => {
        let response = data.payload;
        response = response.sort((a: any, b: any) => b.id - a.id);
        this.quoteData = response;
        // this.addQuoteTypeForm.reset();
      },
      (err: any) => {
        // console.log('Unable to get data from URL + err');
      }
    );
  }

  getAllQuote() {
    this.apiServices.getQuotes().subscribe((res) => {
      this.quoteData = res;
    });
  }

  addQuoteType() {
    const payload = {
      ...this.addQuoteTypeForm.value,
      items: [
        {
          ...this.addQuoteTypeForm.value.items[0],
          amount:
            this.addQuoteTypeForm.value.items[0].rate *
            this.addQuoteTypeForm.value.items[0].unit,
        },
      ],
    };
    this.apiServices.postQuote(payload).subscribe(
      (data) => {
        this.getQuotes();
        this.getAllQuote();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.showAdd = true;
        this.showUpdate = false;

        this.addQuoteTypeForm.reset();
      },
      (err) => {
        console.log('Unable to add Quote + err');
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
  trackClientId(event: any) {
    this.getAllVehiclesAttachedToClient(event.id);
  }

  getAllClients() {
    this.apiServices.getAllClients().subscribe((res: any) => {
      this.clients = res.payload;
    });
  }

  getAllVehicles() {
    this.apiServices.getVehicle().subscribe((res: any) => {
      this.vehicle = res.payload;
    });
  }

  getAllVehiclesAttachedToClient(id: any) {
    this.apiServices.getClientVehicles(id).subscribe((res: any) => {
      this.clientVehicles = res.payload;
    });
  }

  getAllServices() {
    this.apiServices.getAllService().subscribe((res: any) => {
      this.item = res.payload;
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

  updateQuote() {
    const payload: QuoteModel = {
      ...this.addQuoteTypeForm.value,
    };
    this.apiServices.updateQuote(payload, this.editID).subscribe((res: any) => {
      alert('Updated Successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.addQuoteTypeForm.reset();
    });
  }

  deleteQuote(row: any) {
    this.apiServices.deleteQuote(row.id).subscribe(
      (res: any) => {
        alert('User deleted successfully');
      },
      (err: any) => {
        console.log('Unable to delete the Quote' + err);
        this.addQuoteTypeForm.reset();
      }
    );
  }

  onEdit(row: any) {
    this.test = row.id;
    this.quoteModelObj.id = row.id;
    this.addQuoteTypeForm.controls['clientId'].setValue(row.clientId);
    this.addQuoteTypeForm.controls['vehicleId'].setValue(row.vehicleId);
    console.log(this.itemsFormArray, 'controls');
    this.addQuoteTypeForm.patchValue({
      clientId: row.clientId,
      vehicleId: row.vehicleId,
      items: [...row.items],
    });
    let ref = document.getElementById('cancel');
    ref?.click();
    this.editID = true;
    this.showAdd = false;
    this.showUpdate = true;
  }

  onViewClick(row: any) {
    console.log({ row });
    this.viewQte = row;

    let ref = document.getElementById('cancel');
    ref?.click();
  }

  // updateQuoteType(){
  //   const payload = {
  //     ...this.addQuoteTypeForm.value,
  //   }
  //   this.api.updateQuote(this.quoteModelObj, this.editID)
  //   .subscribe((res: any) =>{
  //     alert("Updated Successfully");
  //     let ref = document.getElementById('cancel')
  //     ref?.click()
  //     this.addQuoteTypeForm.reset();
  //   })
  // }
}
