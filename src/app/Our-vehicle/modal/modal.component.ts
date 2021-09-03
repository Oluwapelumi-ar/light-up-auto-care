import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleModel } from './vehicle-dashboard.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  formValue!: FormGroup;

  VehicleModelObj: VehicleModel = new VehicleModel();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      chasisNo: ['', [Validators.required, Validators.minLength(4)]],
      model: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
    });
  }

  postVehicleDetails() {
    this.VehicleModelObj.chasisNo = this.formValue.value.chasisNo;
    this.VehicleModelObj.model = this.formValue.value.model;
    this.VehicleModelObj.clientName = this.formValue.value.clientName;

    this.api.postClient(this.VehicleModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('Client Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        alert('Something Went Wrong');
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
