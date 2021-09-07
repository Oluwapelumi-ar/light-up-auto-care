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
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  postServiceDetails() {
    this.ServiceModelObj.name = this.formValue.value.name;
    console.log(this.ServiceModelObj);
    this.api.postService(this.ServiceModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('Service Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        console.log(err);
        alert('Something Went Wrong');
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
