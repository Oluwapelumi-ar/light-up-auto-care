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
  staffData: any = [];
  formValue: any;

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllStaff();
  }

  open() {
    this.modalService.open(StaffModalComponent, {
      centered: true,
      size: 'md',
    });
  };

  getAllStaff() {
    this.api.getAllStaffs().subscribe({
      next: (res) => {
        this.staffData = res.payload;
      },
      error: (error) => {
        alert('An error occured')
      }
    })
  }

  deleteStaff(row:any) {
    this.api.deleteStaff(row.id).subscribe({
      next: (res) => {
        alert('Client deleted successfully ')
        this.getAllStaff();
        console.log(this.staffData)
      }
    })
  }
};

