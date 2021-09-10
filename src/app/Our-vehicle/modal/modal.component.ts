import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from '../vehicle/vehicle-dashboard.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  formValue!: FormGroup;
  clientData: any = [];
  VehicleModelObj: VehicleModel = new VehicleModel();
  apiService: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      vehicleName: ['', [Validators.required]],
      chasisNo: ['', [Validators.required, Validators.minLength(7)]],
      model: ['', [Validators.required]],
    });

    this.getAllClients();
  }

  // postVehicleDetails() {
  //   this.VehicleModelObj.name = this.formValue.value.name;
  //   this.VehicleModelObj.vehicleName = this.formValue.value.vehicleName;
  //   this.VehicleModelObj.chasisNo = this.formValue.value.chasisNo;
  //   this.VehicleModelObj.model = this.formValue.value.model;

  //   this.api.postVehicle(this.VehicleModelObj).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       alert('Vehicle Added Successfully');
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //       this.formValue.reset();
  //     },
  //     (err: any) => {
  //       alert('Something Went Wrong');
  //     }
  //   );
  // }

  getAllClients() {
    this.api.getAllClients().subscribe((res: any) => {
      this.clientData = res;
      console.log(this.clientData);
    });
  }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
