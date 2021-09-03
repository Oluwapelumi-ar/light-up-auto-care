import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  regex = new RegExp('/^[A-Za-z]+$/');

  signUpForm!: FormGroup

  constructor(private router: Router) { }

  ngOnInit(): void {

    const rege = /^[A-Za-z]+$/;

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      firstName: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^[A-Za-z]+$/)
      ]),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('',Validators.required),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/)
        ]),
      confirmPassword: new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
        ]),
      acceptTerms: new FormControl(false),
    }
    );

  }
  // firstNameValid = this.signUpForm.controls.firstName.value;



  // validatorMsgFirst(){
  //   const firstName = this.signUpForm.controls.firstName.value;

  //   let errMsg;
  //   if(firstName){
  //     if(!regex.test(firstName)) {
  //       errMsg = 'Enter Letters';
  //     }
  //   } else {
  //     errMsg = 'Enter Your Firstname'
  //   }
  //   return errMsg;
  // }

  validatorMsgLast() {
    const lastName = this.signUpForm.controls.lastName.value;
    const regex = /^[A-Za-z]+$/;
    let errMsg;
    if (lastName) {
      if (!regex.test(lastName)) {
        errMsg = 'Enter Letters';
      }
    } else {
      errMsg = 'Enter Your Lastname'
    }
    return errMsg;
  }

  handleSubmit(): void {

    this.router.navigate(['/login']);
  }

}
