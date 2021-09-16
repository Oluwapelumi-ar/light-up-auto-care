import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { staffModel } from '../staff-model';


interface staffDetails {
  id?:number;
  name: string;
  email:string;
  role:string;
  password: string; 
}



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffModelo : staffModel= new staffModel()
  totalRecords:String = '';
  page:number = 1;
  staffData: any = [];
  // formValue: any;
  count = 0;
  tableSize = 10;
  alertInstance: string = '';
  alert!: boolean;
  editID:any;
  formStatus: string = '';
  editId!: boolean;

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
  

  constructor(private modalService: NgbModal, private api: ApiService,private formBuilder: FormBuilder,) {}
  ngOnInit(): void {
    this.getAllStaff();
  }

  // open(data?: staffModel) {
  //   this.alertInstance = '';
  //   const staffModal = this.modalService.open(this.modalService, {
  //     centered: true,
  //     size: 'md',
  //   }
  //   );
  //   staffModal.componentInstance.edit;
  //   // To populate the modal
  //   if (data) {
  //     staffModal.componentInstance.formValue.patchValue({
  //       name: data.name,
  //       email: data.email,
  //       role:data.role,
  //       password:data.password
  //     });
  //     staffModal.componentInstance.editID = data.id;
  //   }
  //   // to stop page from reloading after making changes 
  //   staffModal.result.then(
  //     (result) => {
  //       this.alertInstance = staffModal.componentInstance.formStatus;
  //       console.log(staffModal.componentInstance.formStatus)
  //       this.getAllStaff();
  //     },
  //     (reason) => {
  //       this.alertInstance = staffModal.componentInstance.formStatus;
        
  //       this.getAllStaff();
  //     }
  //   )};
    

  getAllStaff() {
    this.api.getAllStaffs().subscribe({
      next: (res) => {
        this.staffData = res.payload;
        
      },
      error: (error) => {
        alert('An error occured')
      }
    })
  }

  postStaff() {
    this.api.postStaff(this.formValue.value).subscribe(
      (res: staffDetails) => {
        alert('Staff Added Successfully');
        this.alert = true;
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.editID = false;
      },
      (err: any) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        // console.log(err); 
        // alert('Something Went Wrong');
        
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
        ref?.click();
        this.formValue.reset();
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

  deleteStaff(row:any) {
    this.api.deleteStaff(row.id).subscribe({
      next: (res) => {
        alert('Client deleted successfully ')
        this.alert = true;
        this.getAllStaff();
        console.log(this.staffData)
      }
    }) 
  }

  onEdit(row:any){
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['password'].setValue(row.password)
    this.formValue.controls['role'].setValue(row.role)
    let ref = document.getElementById('cancel');
        ref?.click();

    this.editID = true;
   }

  closeAlert() {
    this.alert = false;
  }

  tabSize(index: number){
    this.page = index ;
    this.getAllStaff();
  }  

};

