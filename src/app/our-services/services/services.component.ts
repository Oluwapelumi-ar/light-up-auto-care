import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from 'src/app/shared/api.service';
import { ServiceModel } from '../modal/services-dashboard.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  serviceData: any;
  formStatus: string = '';
  alertInstance: string = '';
  constructor(private modalService: NgbModal, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllService();
  }

  open(data?: ServiceModel) {
    this.alertInstance = '';
    const serviceModal = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'md',
    });
    serviceModal.componentInstance.edit;

    if (data) {
      serviceModal.componentInstance.formValue.patchValue({
        id: data.id,
        name: data.name,
      });
    }

    serviceModal.result.then(
      (result: any) => {
        this.alertInstance = serviceModal.componentInstance.formStatus;
        // fetch all client again
        this.getAllService();
      },
      (reason: any) => {
        this.alertInstance = serviceModal.componentInstance.formStatus;
        this.getAllService();
      }
    );

    // ModalComponent.result.then(
    //   (result: any) => {
    //     console.log(result);
    //     // fetch all client again
    //     this.getAllService();
    //   },
    //   (reason: any) => {
    //     console.log(reason);
    //     this.getAllService();
    //   }
    // );

    //clientModal.componentInstance.testMe ='';
  }
  // getAllClient() {
  //   throw new Error('Method not implemented.');
  // }

  getAllService() {
    this.api.getAllService().subscribe({
      next: (res) => {
        this.serviceData = res.payload;
      },
      error: (error) => {
        console.log(error);
      },
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

  closeAlert() {}
}
