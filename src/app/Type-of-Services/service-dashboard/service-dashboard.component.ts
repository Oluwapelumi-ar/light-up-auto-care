import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ServiceModel } from '../service-dashboard-model';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css'],
})
export class ServiceDashboardComponent implements OnInit {
  formValue!: FormGroup;
  serviceData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  serviceModelObj: ServiceModel = new ServiceModel();
  alertInstance: string = '';
  order: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', [Validators.required]],
    });

    this.getAllServices();
  }

  clickAddService() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postServiceDetails() {
    this.serviceModelObj.name = this.formValue.value.name;
    this.api.postService(this.serviceModelObj).subscribe(
      (res: any) => {
        console.log(res);
        this.alertInstance = 'Successful';
        this.getAllServices();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        this.alertInstance = 'Error, Try Again';
      }
    );
  }

  // getAllServices() {
  //   this.api.getAllService().subscribe((res: any) => {
  //     this.serviceData = res.payload;
  //     console.log(this.serviceData, 'ew');
  //   });
  // }

  sortData() {
    if (this.order) {
      let newArr = this.serviceData.sort((a: any, b: any) => a.id - b.id);
      this.serviceData = newArr;
    } else {
      let newArr = this.serviceData.sort((a: any, b: any) => b.id - a.id);
      this.serviceData = newArr;
    }
    this.order = !this.order;
  }

  getAllServices() {
    this.api.getAllService().subscribe((data: any) => {
      let response = data.payload;
      response = response.sort((a: any, b: any) => b.id - a.id);
      this.serviceData = response;
    });
  }

  deleteService(row: any) {
    this.api.deleteService(row.id).subscribe(
      (res) => {
        this.alertInstance = 'Deleted';
        // alert(');
        this.getAllServices();
      },
      (reason) => {
        this.getAllServices();
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.serviceModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
  }

  updateServiceDetail() {
    this.serviceModelObj.name = this.formValue.value.name;
    this.api
      .updateService(this.serviceModelObj, this.serviceModelObj.id)
      .subscribe(
        (res) => {
          this.alertInstance = 'Updated';
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllServices();
        },
        (err: any) => {
          this.alertInstance = 'Error, Try Again';
        }
      );
  }

  closeAlert() {}
}
