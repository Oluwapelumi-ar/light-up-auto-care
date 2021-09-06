import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../shared/api.service';
import { ClientModalComponent } from './client-modal/client-modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clientData: any = [];
  formValue: any;

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllClient();
  }

  open() {
    this.modalService.open(ClientModalComponent, {
      centered: true,
      size: 'md',
    });
  }

  getAllClient() {
    this.api.getAllClients().subscribe((res) => {
      this.clientData = res.payload;
    });
  }

  deleteClient(row: any) {
    this.api.deleteClient(row.id).subscribe((res) => {
      alert('Client deleted successfully ');
      this.getAllClient();
    });
  }

  onEdit(row: any) {
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
  }
}
