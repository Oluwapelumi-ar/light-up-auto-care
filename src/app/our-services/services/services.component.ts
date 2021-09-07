import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  serviceData: any;
  constructor(private modalService: NgbModal, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllService();
  }

  open() {
    this.modalService.open(ModalComponent, {
      centered: true,
      size: 'md',
    });

    //clientModal.componentInstance.testMe ='';
  }

  getAllService() {
    this.api.getAllService().subscribe((res) => {
      this.serviceData = res.payload;
    });
  }

  onEdit(data: any): void {
    console.log('Data Name: ' + data.name);
    const modalValues = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'md',
    });
    console.log('Data Name: ' + data.id);
    modalValues.componentInstance.formValue.patchValue({
      id: data.id,
      name: data.name,
    });
  }

  deleteService(row: any) {
    this.api.deleteService(row.id).subscribe((res) => {
      alert('Service deleted successfully ');
      this.getAllService();
    });
  }
}
