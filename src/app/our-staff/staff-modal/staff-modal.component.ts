import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModel } from 'src/app/client/client-dashboard.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.css']
})
export class StaffModalComponent implements OnInit {
  ClientModelObj: ClientModel = new ClientModel();
  clientData!: any;

  formValue!: FormGroup;
  errMsg = {
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this.getAllClient();
  }
  postClientDetails() {
    this.ClientModelObj.name = this.formValue.value.name;
    this.ClientModelObj.email = this.formValue.value.email;
    this.ClientModelObj.telephone = this.formValue.value.phone;
    console.log(this.ClientModelObj);
    this.api.postClient(this.ClientModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('Client Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllClient();
      },
      (err: any) => {
        console.log(err);
        alert('Something Went Wrong');
      }
    );
  }

  // onSubmit() {
  //   this.apiService.createUser(this.addForm.value).subscribe((data) => {
  //     this.router.navigate(['list-user']);
  //   });
  //
  getAllClient() {
    this.api.getClient().subscribe((res: any) => {
      this.clientData = res;
      console.log(res);
    });
  }

  closeModal() {
    this.modalService.dismissAll(StaffModalComponent);
  }

  handleErrMsg(fieldName: string, fieldValue: string): void {
    switch (fieldName) {
      case 'email':
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!fieldValue) {
          this.errMsg.email = 'Enter an Email';
        } else {
          !regex.test(fieldValue)
            ? (this.errMsg.email = 'Enter a valid Email Address')
            : (this.errMsg.email = '');
        }
        break;
      case 'name':
        const nameRegex = /^[A-Za-z]+/;
        if (!fieldValue) {
          this.errMsg.name = 'Enter Name';
        } else {
          !nameRegex.test(fieldValue)
            ? (this.errMsg.name = 'Digits not accepted')
            : (this.errMsg.name = '');
        }
        break;

      case 'phone':
        const phoneRegex =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!fieldValue) {
          this.errMsg.phone = 'Enter Telephone no';
        } else {
          !phoneRegex.test(fieldValue)
            ? (this.errMsg.phone = 'Invalid Phone No')
            : (this.errMsg.phone = '');
        }
        break;
    }
  }

}
