import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { ServiceModel } from './services-dashboard.model';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  serviceData: any;
  formValue!: FormGroup;
  ServiceModelObj: ServiceModel = new ServiceModel();
  // ServiceComponent: ServicesComponent = new ServicesComponent(
  //   NgbModal,
  //   ApiService
  // );
  static result: any;
  alertInstance: string = '';
  static componentInstance: any;
  formStatus: string = '';
  getAllService: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.getAllService();
  }

  postServiceDetails() {
    this.ServiceModelObj.name = this.formValue.value.name;
    console.log(this.ServiceModelObj);
    this.api.postService(this.ServiceModelObj).subscribe(
      (res: any) => {
        console.log('post', res);
        this.getAllService();
        this.formStatus = 'Successful';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        this.formStatus = 'Error, Try Again';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
