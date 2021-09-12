//

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../shared/api.service';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';
import { staffModel } from '../staff-model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staffData: any = [];
  formValue: any;

  constructor(private modalService: NgbModal, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllStaff();
  }

  open(data?: staffModel) {
    const staffModal = this.modalService.open(StaffModalComponent, {
      centered: true,
      size: 'md',
    });

    // To populate the modal
    if (data) {
      staffModal.componentInstance.formValue.patchValue({
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      });
      staffModal.componentInstance.editID = data.id;
    }
    // to stop page from reloading after making changes
    staffModal.result.then(
      (result) => {
        this.getAllStaff();
      },
      (reason) => {
        this.getAllStaff();
      }
    );
  }

  getAllStaff() {
    this.api.getAllStaffs().subscribe({
      next: (res) => {
        this.staffData = res.payload;
      },
      error: (error) => {
        alert('An error occurred');
      },
    });
  }

  deleteStaff(row: any) {
    this.api.deleteStaff(row.id).subscribe({
      next: (res) => {
        alert('Client deleted successfully ');
        this.getAllStaff();
        console.log(this.staffData);
      },
    });
  }
}
