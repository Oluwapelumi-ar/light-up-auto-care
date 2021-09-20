import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { staffModel } from '../staff-model';

interface staffDetails {
  id:number;
  name: string;
  email:string;
  role:string;
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})

export class StaffComponent implements OnInit {
  staffModelo : staffModel= new staffModel()
  staffData: any = [];
  totalRecords:String = '';
  page:number = 1;
  count = 0;
  tableSize = 10;
  alertInstance: string = '';
  createStaffAlert!: boolean;
  updatedStaffAlert!:boolean;
  alert!: boolean;
  editID: any;
  formStatus: string = '';
  editId!: boolean;

  formValue: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  errMsg = {
    name: '',
    email: '',
  };

  constructor(private modalService: NgbModal, private api: ApiService,private formBuilder: FormBuilder,) {}
  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff() {
    this.api.getAllStaffs().subscribe({
      next: (res) => {
        this.staffData = res.payload;  
      },
      error: (error) => {
        alert('An error occurred');
      },
    });
  }

  postStaff() {
    this.api.postStaff(this.formValue.value).subscribe(
      (res: staffDetails) => {
        this.createStaffAlert = true;
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.editID = false;
      },
      (err: any) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();  
      }
    );
  }

  updatedStaff() {
    const StaffModelObj: staffDetails = {
       ...this.formValue.value,  
    };
    this.staffModelo.id
    this.api
      .updateStaff(StaffModelObj, this.staffModelo.id)
      .subscribe((res) => {
        this.updatedStaffAlert= true;
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllStaff();
      });
  }

  closeModal() {
    this.modalService.dismissAll();
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

  deleteStaff(row: any) {
    this.api.deleteStaff(row.id).subscribe({
      next: (res) => {
        this.alert = true;
        this.getAllStaff();
        console.log(this.staffData);
      },
    });
  }

  onEdit(row:any){
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['role'].setValue(row.role)
    this.staffModelo.id= row.id
    let ref = document.getElementById('cancel');
        ref?.click();
    this.editID = true; 
   }

  closeAlert() {
    this.alert = false;
  }

  tabSize(index: number) {
    this.page = index;
    this.getAllStaff();
  }
}
