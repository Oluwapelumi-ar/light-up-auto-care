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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllClient();
    this.getVehicle();
    this.getAllStaff();
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

  getAllStaff() {
    this.api.getAllStaffs().subscribe({
      next: (res) => {
        this.staffData = res.payload;
        this.noOfStaff = this.staffData.length;
      },
      error: (error) => {
        alert('An error occurred');
      },
    });
  }
}
