import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
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
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      telephone: [''],
      address: [''],
    });

    this.getAllClient();
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
    // this.clientModelObj.address = this.formValue.value.address;

    this.api.postClient(this.clientModelObj).subscribe(
      (res) => {
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
    this.formValue.controls['address'].setValue(row.address);
  }

  updateClientDetails() {
    this.clientModelObj.name = this.formValue.value.name;
    this.clientModelObj.email = this.formValue.value.email;
    this.clientModelObj.telephone = this.formValue.value.telephone;
    this.clientModelObj.name = this.formValue.value.name;
    // this.clientModelObj.billingAddress = this.formValue.value.address;
    // this.clientModelObj.city = this.formValue.value.city;
    // this.clientModelObj.postalCode = this.formValue.value.postalCode;
    // this.clientModelObj.state = this.formValue.value.state;

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
