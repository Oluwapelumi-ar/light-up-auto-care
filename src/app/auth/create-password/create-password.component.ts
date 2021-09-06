import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatchPassword } from '../validators/match-password';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  regex = new RegExp('/^[A-Za-z]+$/');

  createPasswordForm!: FormGroup

  constructor(private router: Router, private authService: AuthServiceService,private matchPassword: MatchPassword) { }

  ngOnInit(): void {
    this.createPasswordForm = new FormGroup({
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
      acceptTerms: new FormControl(true),
    }, { validators: [this.matchPassword.validate]}
    );
  }

  handleCreatePassword() {
    if (this.createPasswordForm.invalid) {
      return;
    }
    this.authService.createPassword(this.createPasswordForm.value).subscribe(
      (response) => {
      this.router.navigate(['/']);
      console.log(response)
    },(err) => {
      if (!err.status) {
        this.createPasswordForm.setErrors({ noConnection: false });
      } else {
        this.createPasswordForm.setErrors({ unknownError: true });
      }
    });
  };

}


