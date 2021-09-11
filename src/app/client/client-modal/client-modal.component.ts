import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { ClientModel } from '../client-dashboard.model';

@Component({
  selector: 'app-clients-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css'],
})
export class ClientModalComponent implements OnInit {
  // closeResult: string = '';
  formStatus: string = '';
  ClientModelObj: ClientModel = new ClientModel();
  clientData!: any;
  showUpdate!: boolean;
  showAdd!: boolean;
  isButtonVisible!: false;

  formValue: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required]],
    telephone: ['', [Validators.required, Validators.minLength(11)]],
  });
  errMsg = {
    name: '',
    email: '',
    phone: '',
  };
  getAllClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {}

  // for posting data (ApiServe)
  postClientDetails() {
    this.ClientModelObj.name = this.formValue.value.name;
    this.ClientModelObj.email = this.formValue.value.email;
    this.ClientModelObj.telephone = this.formValue.value.telephone;
    this.api.postClient(this.ClientModelObj).subscribe(
      (res: any) => {
        this.formStatus = 'Successful';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        // this.getAllClient();
      },
      (err: any) => {
        this.formStatus = 'Error, Try Again';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        console.log(err); 
        alert('Something Went Wrong');
      }
    );
  }

  updateClient() {
    this.ClientModelObj.name = this.formValue.value.name;
    this.ClientModelObj.email = this.formValue.value.email;
    this.ClientModelObj.telephone = this.formValue.value.telephone;
    this.ClientModelObj.id = this.formValue.value.id;

    console.log(this.ClientModelObj);
    this.api
      .updateClient(this.ClientModelObj, this.ClientModelObj.id)
      .subscribe((res) => {
        alert('updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        // this.getAllClient();
      });
  }

  // open() {
  //   this.showAdd = true;

  // }

  closeModal() {
    this.modalService.dismissAll(ClientModalComponent);
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
