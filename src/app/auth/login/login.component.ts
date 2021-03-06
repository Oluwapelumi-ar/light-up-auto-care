import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.payload.token != undefined) {
          localStorage.setItem('userDetails', JSON.stringify(response.payload));
          localStorage.setItem('token', response.payload.token);
          this.router.navigate(['/home']);
        } else {
          alert('Token was not generated');
        }
      },
      (err) => {
        console.log(err);
        if (!err.status) {
          this.loginForm.setErrors({ noConnection: false });
        } else {
          this.loginForm.setErrors({ unknownError: true });
        }
      }
    );
  }
}
