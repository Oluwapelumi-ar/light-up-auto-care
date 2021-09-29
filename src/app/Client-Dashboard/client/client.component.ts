import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  MinLengthValidator,
} from '@angular/forms';

import { ApiService } from 'src/app/shared/api.service';
import { ClientModel } from '../client-model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  formValue!: FormGroup;
  alertInstance: string = '';
  clientData: any = [];
  showAdd!: boolean;
  showUpdate!: boolean;

  clientModelObj: ClientModel = new ClientModel();
  order: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z]+'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telephone: [
        '',
        [Validators.required, Validators.pattern('0+[0-9 ]{10}')],
      ],
      address: ['', Validators.pattern('')],
      repName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z]+'),
        ],
      ],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: [0, [Validators.required, Validators.pattern('^\\d{6}$')]],
    });

    this.getAllClient();
  }

  get m() {
    return this.formValue.controls;
  }

  clickAddClient() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postClientDetails() {
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.email = this.formValue.value.email;
    this.clientModelObj.telephone = this.formValue.value.telephone;
    this.clientModelObj.billingAddress.repName = this.formValue.value.repName;
    this.clientModelObj.billingAddress.address = this.formValue.value.address;
    this.clientModelObj.billingAddress.city = this.formValue.value.city;
    this.clientModelObj.billingAddress.state = this.formValue.value.state;
    this.clientModelObj.billingAddress.postalCode =
      this.formValue.value.postalCode;

    this.api.postClient(this.clientModelObj).subscribe(
      (res) => {
        this.alertInstance = 'Successful';
        this.getAllClient();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err: any) => {
        this.alertInstance = 'Error, Try Again';
      }
    );
  }

  getAllClient() {
    this.api.getAllClients().subscribe((data: any) => {
      let response = data.payload;
      response = response.sort((a: any, b: any) => b.id - a.id);
      this.clientData = response;
    });
  }

  sortData() {
    if (this.order) {
      let newArr = this.clientData.sort((a: any, b: any) => a.id - b.id);
      this.clientData = newArr;
    } else {
      let newArr = this.clientData.sort((a: any, b: any) => b.id - a.id);
      this.clientData = newArr;
    }
    this.order = !this.order;
  }

  deleteClients(row: any) {
    this.api.deleteClient(row.id).subscribe(
      (res) => {
        this.alertInstance = 'Deleted';
        this.getAllClient();
      },
      (reason) => {
        this.getAllClient();
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.clientModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['telephone'].setValue(row.telephone);

    // this.formValue.patchValue({
    //   billingAddress: { ...row.billingAddress },
    // });
  }

  updateClientDetails() {
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.email = this.formValue.value.email;
    this.clientModelObj.telephone = this.formValue.value.telephone;
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.billingAddress.repName = this.formValue.value.repName;
    this.clientModelObj.billingAddress.address = this.formValue.value.address;
    this.clientModelObj.billingAddress.city = this.formValue.value.city;
    this.clientModelObj.billingAddress.postalCode =
      this.formValue.value.postalCode;
    this.clientModelObj.billingAddress.state = this.formValue.value.state;

    this.api
      .updateClient(this.clientModelObj, this.clientModelObj.id)
      .subscribe((res) => {
        this.alertInstance = 'Updated';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllClient();
      });
  }

  closeAlert() {}
}
