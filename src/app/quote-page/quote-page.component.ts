import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css']
})
export class QuotePageComponent implements OnInit{

  addQuoteTypeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  trackClientId(): void{
    this.addQuoteTypeForm.valueChanges.subscribe(data => {
      console.log(data);
    })
    
  }

  ngOnInit(): void {

    this.addQuoteTypeForm = this.fb.group({
      'clientId' : new FormControl('', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(15)
    ]),
      'vehicleId' : new FormControl('', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ],
      )
    })
  }

  addQuoteType(){
    console.log(this.addQuoteTypeForm.value); 

  }


  resetForm(){
    this.addQuoteTypeForm.reset();
  }
  

}
