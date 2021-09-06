import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../shared/api.service';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  clientData: any = [];

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllClient();
  }

  open() {
    this.modalService.open(StaffModalComponent, {
      centered: true,
      size: 'md',
    });
  }

  getAllClient() {
    this.api.getClient().subscribe((res: { payload: any; }) => {
      this.clientData = [res.payload];
      // console.log(this.clientData, 're');
    });
  }

 

}
