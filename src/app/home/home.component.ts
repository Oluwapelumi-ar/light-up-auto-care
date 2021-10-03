import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  staffData: any;
  vehicleData: any;
  clientData: any = [];
  noOfClients: number = 0;
  noOfVehicles: number = 0;
  noOfStaff: number = 0;
  page:number = 1;
  count = 0;
  tableSize = 10;
  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllClient();
    this.getVehicle();
  }

  getAllClient() {
    this.api.getAllClients().subscribe({
      next: (res) => {
        this.clientData = res.payload;
        this.noOfClients = this.clientData.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getVehicle() {
    this.api.getVehicle().subscribe((res: any) => {
      this.vehicleData = res.payload;
      this.noOfVehicles = this.vehicleData.length;
      console.log(this.vehicleData);
    });
  }

  getStaff() {
    this.api.getAllStaffs().subscribe((res: any) => {
      this.staffData = res.payload;
      this.noOfStaff = this.staffData.length;
    });
  }

  hideStaffList(){
    if(this.userDetails.role == 'admin'){
      return true;
    }else {
      return false;
    }
  }



  tabSize(index: number) {
    this.page = index;
  }
}
