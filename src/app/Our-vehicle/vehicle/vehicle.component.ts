import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { CapitalizePipe } from 'src/app/capitalize.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { VehicleModel } from './vehicle-dashboard.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehicleData: any;
  getAllClient: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getVehicle();
    this.getAllClients();
  }

  createForm(item?: {}) {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      vehicleName: ['', [Validators.required]],
      chassis: ['', [Validators.required, Validators.minLength(7)]],
      model: ['', [Validators.required]],
    });
  }

  open(modalRef: any, item?: {}) {
    this.createForm(item);

    this.modalService.open(modalRef, {
      centered: true,
      size: 'md',
    });
  }

  /* ===================== MODAL CODE =============================== */

  formValue!: FormGroup;
  clientData: any = [];

  VehicleModelObj: VehicleModel = new VehicleModel();
  apiService: any;

  postVehicleDetails() {
    this.VehicleModelObj.clientId = this.formValue.value.name;
    this.VehicleModelObj.vehicleName = this.formValue.value.vehicleName;
    this.VehicleModelObj.chassis = this.formValue.value.chassis;
    this.VehicleModelObj.model = this.formValue.value.model;
    this.api.postVehicle(this.VehicleModelObj).subscribe(
      (res: any) => {
        alert('Vehicle Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        alert('Something Went Wrong');
      }
    );
  }

  getAllClients() {
    this.api.getAllClients().subscribe((res: any) => {
      this.clientData = res.payload;
      console.log(this.clientData);
    });
  }

  getVehicle() {
    this.api.getVehicle().subscribe((res: any) => {
      this.vehicleData = res.payload;
      console.log(this.vehicleData);
    });
  }

  deleteVehicle(row: any) {
    this.api.deleteVehicle(row.id).subscribe(
      (res) => {
        alert('Vehi cle deleted successfully ');
        this.getVehicle();
      },
      (reason) => {
        this.getVehicle();
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }

  /* ======================= MODAL CODE ENDS ========================== */
}
