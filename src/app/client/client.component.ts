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
  clientData!: Array<any>;

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.api.getClient().subscribe(
      (res) => {
        this.clientData = res;
      },
      (err: any) => {
        alert('Something Went Wrong');
      }
    );
  }

  open() {
    this.modalService.open(ClientModalComponent, {
      centered: true,
      size: 'md',
    });
  }
}
