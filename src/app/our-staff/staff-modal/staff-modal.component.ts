import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
<<<<<<< HEAD

interface staffDetails {
  data: {
    id?: number;
    name: string;
    email: string;
    role: string;
    password: string;
  };
=======
import Swal from 'sweetalert2';
import { staffModel } from '../staff-model';


interface staffDetails {
  id?:number;
  name: string;
  email:string;
  role:string;
  password: string; 
>>>>>>> 4e50d5abb288e6cc1a6233b3a6915831cd9f0d2c
}

@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.css'],
})
export class StaffModalComponent implements OnInit {
<<<<<<< HEAD
  [x: string]: any;
  editID: any;

=======
  editID:any;
  formStatus: string = '';
  action:any;
  edit:any;
  add:any;


>>>>>>> 4e50d5abb288e6cc1a6233b3a6915831cd9f0d2c
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

<<<<<<< HEAD
  ngOnInit(): void {}
=======
  ngOnInit(): void { }
>>>>>>> 4e50d5abb288e6cc1a6233b3a6915831cd9f0d2c

  postStaff() {
    this.api.postStaff(this.formValue.value).subscribe(
      (res) => {
        alert('Staff Added Successfully');
        Swal.fire('Thank you...', 'Staff Created Succesfully!', 'success')
        let ref = document.getElementById('cancel');
        let action = ref;
        let add = action;
        action?.click();
        this.formValue.reset();
      },
      (err: any) => {
        //alert('Something Went Wrong');
        
      }
    );
  };

 
  updatedStaff() {
    const StaffModelObj: staffDetails = {
       ...this.formValue.value, 
    };
    this.api
      .updateStaff(StaffModelObj, this.editID)
      .subscribe((res) => {
        alert('updated Successfully');
        let ref = document.getElementById('cancel');
        let action = ref;
        let edit = action;
        action?.click();
        this.formValue.reset();
      });
  }

  updatedStaff() {
    const StaffModelObj: staffDetails = {
      ...this.formValue.value,
    };
    console.log('staff model object sent: ', this.editID);
    this.api.updateStaff(StaffModelObj, this.editID).subscribe((res) => {
      console.log('response: ' + res);
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


