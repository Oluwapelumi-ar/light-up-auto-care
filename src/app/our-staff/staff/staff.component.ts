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
  // staffData: any;
  staffData: any = [];

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllStaff();
  }

  open() {
    this.modalService.open(StaffModalComponent, {
      centered: true,
      size: 'md',
    });
  }

  getAllStaff() {
    this.api.getAllStaffs().subscribe((res: { payload: any; }) => {
      this.staffData = res.payload;
      console.log(res.payload)
    });
  }

  deleteStaff(row: any) {
    this.api.deleteStaff(row.id).subscribe((res) => {
      alert('Client deleted successfully ');
      this.getAllStaff();
    });
  }
};

