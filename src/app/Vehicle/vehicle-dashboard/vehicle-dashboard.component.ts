import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { ClientComponent } from 'src/app/client/client.component';

import { ApiService } from 'src/app/shared/api.service';
import { VehicleModel } from '../vehicle-dashboard-model';

@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.css'],
})
export class VehicleDashboardComponent implements OnInit {
  formValue!: FormGroup;
  vehicleModelObj: VehicleModel = new VehicleModel();
  clientData: any = [];
  vehicleData: any;
  getAllClients: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  alertInstance = '';

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      vehicleName: [''],
      chassis: [''],
      model: [''],
      name: [''],
    });

    this.getVehicles();
    this.getAllClient();
  }

  clickAddVehicle() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postVehicleDetails() {
    this.vehicleModelObj.clientId = this.formValue.value.name;
    this.vehicleModelObj.vehicleName = this.formValue.value.vehicleName;
    this.vehicleModelObj.chassis = this.formValue.value.chassis;
    this.vehicleModelObj.model = this.formValue.value.model;
    this.api.postVehicle(this.vehicleModelObj).subscribe(
      (res: any) => {
        this.alertInstance = 'Successful';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        this.alertInstance = 'Error, try again';
      }
    );
  }

  getAllClient() {
    this.api.getAllClients().subscribe((res: any) => {
      this.clientData = res.payload;
      console.log(this.clientData, 'ew');
    });
  }

  getVehicles() {
    this.api.getVehicle().subscribe((res: any) => {
      this.vehicleData = res.payload;
      console.log(this.vehicleData);
    });
  }

  deleteVehicle(row: any) {
    this.api.deleteVehicle(row.id).subscribe(
      (res) => {
        this.alertInstance = 'Deleted';
        this.getVehicles();
      },
      (reason) => {
        this.getVehicles();
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.vehicleModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['vehicleName'].setValue(row.vehicleName);
    this.formValue.controls['model'].setValue(row.model);
    this.formValue.controls['chassis'].setValue(row.chassis);
  }

  updateVehicleDetails() {
    this.vehicleModelObj.clientId = this.formValue.value.name;
    this.vehicleModelObj.vehicleName = this.formValue.value.vehicleName;
    this.vehicleModelObj.chassis = this.formValue.value.chassis;
    this.vehicleModelObj.model = this.formValue.value.model;

    this.api
      .updateVehicle(this.vehicleModelObj, this.vehicleModelObj.id)
      .subscribe((res) => {
        this.alertInstance = 'Updated';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getVehicles();
      });
  }

  closeAlert() {}
}
