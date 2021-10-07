import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatchPassword } from '../validators/match-password';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  regex = new RegExp('/^[A-Za-z]+$/');
  passwordToken:string = ''

  createPasswordForm!: FormGroup

  constructor(private router: Router, private authService: AuthServiceService,private matchPassword: MatchPassword,private route: ActivatedRoute) { }

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

    this.passwordToken = this.route.snapshot.queryParams.password_token;
    console.log('...', this.passwordToken);
    //   .subscribe((params:any) => {
    //     console.log('......',params); 
    //     this.passwordToken = params.password_token;
    //     console.log(this.passwordToken); 
    //   }
    // );
  }
  

  handleCreatePassword() {
    if (this.createPasswordForm.invalid) {
      return;
    }
    const payload = {
      ...this.createPasswordForm.value,
      password_token: this.passwordToken
    }
    console.log('......',payload);
    
    this.authService.createPassword(payload).subscribe(
      (response) => {
      this.router.navigate(['/login']);
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


