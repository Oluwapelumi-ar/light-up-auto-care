import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { ServiceModel } from './services-dashboard.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  formValue!: FormGroup;
  ServiceModelObj: ServiceModel = new ServiceModel();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      service: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // postServiceDetails() {
  //   this.ServiceModelObj.service = this.formValue.value.service;

  //   this.api.postService(this.ServiceModelObj).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       alert('Client Added Successfully');
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //       this.formValue.reset();
  //     },
  //     (err: any) => {
  //       alert('Something Went Wrong');
  //     }
  //   );
  // }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
