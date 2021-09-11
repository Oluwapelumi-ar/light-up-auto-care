import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';

interface staffDetails {

    id?:number;
  name: string;
  email:string;
  role:string;
  password: string;
  
}

@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.css'],
})
export class StaffModalComponent implements OnInit {
  [x: string]: any;
  editID:any;

  

  formValue: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  errMsg = {
    name: '',
    email: '',
    password: '',
  };
 

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {  }

  ngOnInit(): void { }

  postStaff() {
    this.api.postStaff(this.formValue.value).subscribe(
      (res) => {
        console.log(res);
        alert('Staff Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        console.log(err);
        alert('Something Went Wrong');
      }
    );
  };

  updatedStaff() {
    const StaffModelObj: staffDetails = {
      ...this.formValue.value,
    };
    console.log("staff model object sent: ",  this.editID);
    this.api
      .updateStaff(StaffModelObj, this.editID)
      .subscribe((res) => {
        console.log("response: "+res)
        alert('updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        // getAllStaff();
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
    }
  }
}


