import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../shared/api.service';
import { ClientModel } from './client-dashboard.model';
import { ClientModalComponent } from './client-modal/client-modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clientData: any = [];
  formValue: any;
  alertInstance: string = '';

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllClient();
  }

  open(data?: ClientModel) {
    this.alertInstance = '';
    const clientModal = this.modalService.open(ClientModalComponent, {
      centered: true,
      size: 'md',
    });
    clientModal.componentInstance.edit;
    if (data) {
      clientModal.componentInstance.formValue.patchValue({
        id: data.id,
        name: data.name,
        email: data.email,
        telephone: data.telephone,
      });
    }

    clientModal.result.then(
      (result) => {
        this.alertInstance = clientModal.componentInstance.formStatus;
        // fetch all client again
        this.getAllClient();
      },
      (reason) => {
        this.alertInstance = clientModal.componentInstance.formStatus;
        this.getAllClient();
      }
    );
  }

  getAllClient() {
    this.api.getAllClients().subscribe({
      next: (res) => {
        this.clientData = res.payload;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  deleteClient(row: any) {
    this.api.deleteClient(row.id).subscribe(
      (res) => {
        alert('Client deleted successfully ');
        this.getAllClient();
      },
      (reason) => {
        this.getAllClient();
      }
    );
  }

  closeAlert() {}
}
