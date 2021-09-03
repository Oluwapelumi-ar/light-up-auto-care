import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { QuoteModel } from './quote.model';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})

export class QuoteComponent implements OnInit {
  reform !: FormGroup;

  formValue !: FormGroup;
  quoteModelObj : QuoteModel= new QuoteModel();
  quoteData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;


  constructor(private formbuilber: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.reform = new FormGroup({
      'quoteId' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(7)]),
      'clientId' : new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      'vehicleId' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      'vehicleChasisNumber' : new FormControl
      (null, [Validators.required, Validators.minLength(17), Validators.maxLength(17)
      ]),
      'itemDescription' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      'unit': new FormControl ('null', [Validators.required, Validators.pattern('^[1-9.,]+$')]),
      'rate' : new FormControl(['null', [Validators.pattern('^[1-9.,]+$')]]),
      'amount' : new FormControl(['', [Validators.minLength(3), Validators.maxLength(20)]]),
    });


    this.formValue = this.formbuilber.group ({
      quoteId : [''],
      clientId : [''],
      vehicleId : [''],
      vehicleChasisNumber : [''],
      itemDescription : [''],
      unit : [''],
      rate : [''],
      amount : [''],
    })
    this.getAllQuote();
  }
  clickAddQuote(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  getAllQuote(){
    this.api.getQuote()
    .subscribe(res=>{
      this.quoteData = res;
    })
  }

  deleteQuote(row : any){
    this.api.deleteQuote(row.id)
    .subscribe(res=>{
      alert("Quote Deleted");
      this.getAllQuote();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.quoteModelObj.id = row.id;
    this.formValue.controls['quoteId'].setValue(row.quoteId);
    this.formValue.controls['clientId'].setValue(row.quoteId);
    this.formValue.controls['vehicleId'].setValue(row.vehicleId);
    this.formValue.controls['vehicleChasisNumber'].setValue(row.vehicleChasisNumber);
    this.formValue.controls['itemDescription'].setValue(row.itemDescription);
    this.formValue.controls['unit'].setValue(row.unit);
    this.formValue.controls['rate'].setValue(row.rate);
    this.formValue.controls['amount'].setValue(row.amount);
  }

  updatepostQuoteDetails(){
    const {quoteId,clientId,vehicleId,vehicleChasisNumber,itemDescription,unit,rate,amount } = this.formValue.value
    this.quoteModelObj.quoteId = quoteId;
    this.quoteModelObj.clientId = clientId;
    this.quoteModelObj.vehicleId = vehicleId;
    this.quoteModelObj.vehicleChasisNumber = vehicleChasisNumber;
    this.quoteModelObj.itemDescription = itemDescription;
    this.quoteModelObj.unit = unit;
    this.quoteModelObj.rate = rate;
    this.quoteModelObj.amount = amount; 

    this.api.updateQuote(this.quoteModelObj,this.quoteModelObj.id)
    .subscribe(res=>{
      alert("Updated Successful")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllQuote();
    })
  }
  clickSub(){
    console.log(this.reform.value);
    this.api.postQuote(this.reform.value)
    .subscribe(res=>{
      console.log("Quote Added Successfully", res);
      const data = this.getAllQuote();
      window.location.reload()
      this.reform.reset();
    },
    err=>{
      alert("Something went wrong.")
    }) 
  }

}
