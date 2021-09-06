import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    this.modalService.open(ModalComponent, {
      centered: true,
      size: 'md',
    });

    //clientModal.componentInstance.testMe ='';
  }

  //clientModal.componentInstance.testMe ='';
}
