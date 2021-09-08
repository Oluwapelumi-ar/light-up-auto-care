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

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllClient();
  }

  open(data?: ClientModel) {
    const clientModal = this.modalService.open(ClientModalComponent, {
      centered: true,
      size: 'md',
    });

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
        console.log(result);
        // fetch all client again
        this.getAllClient();
      },
      (reason) => {
        console.log(reason);
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

  onEdit(data: any): void {
    // const clientModal = this.modalService.open(ClientModalComponent, {
    //   centered: true,
    //   size: 'md',
    // });
    // clientModal.componentInstance.formValue.patchValue({
    //   id: data.id,
    //   name: data.name,
    //   email: data.email,
    //   telephone: data.telephone,
    // });
    // clientModal.result.then(
    //   (result) => {
    //     console.log(result);
    //     // fetch all client again
    //     this.getAllClient();
    //   },
    //   (reason) => {
    //     console.log(reason);
    //     this.getAllClient();
    //   }
    // );
  }

  deleteClient(row: any) {
    this.api.deleteClient(row.id).subscribe((res) => {
      alert('Client deleted successfully ');
      this.getAllClient();
    });
  }
}
