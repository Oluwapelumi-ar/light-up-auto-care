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
  page: number = 1;
  count = 0;
  tableSize = 10;
  noOfInvoice = 0;
  noOfQuotes = 0;
  userDetails = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem('userDetails')))
  );

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.hideStaffList()) {
      this.getAllClient();
      this.getVehicle();
      this.getAllStaff();
      this.getInvoices();
    } else if (this.hideInvoice()) {
      this.getAllClient();
      this.getVehicle();
      this.getQuote();
      this.getInvoices();
    } else {
      this.getAllClient();
      this.getVehicle();
      this.getInvoices();
      this.getQuote();
    }
  }

  getAllClient() {
    this.api.getAllClients().subscribe({
      next: (res:any) => {
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
      next: (res:any) => {
        this.staffData = res.payload;
        this.noOfStaff = this.staffData.length;
      },
      error: (error) => {
        alert('An error occurred');
      },
    });
  }

  getInvoices() {
    this.api.getInvoice().subscribe((res: any) => {
      let invoiceData = res.payload;
      this.noOfInvoice = invoiceData.length
      console.log(this.noOfInvoice);
      
    });

    (err: any) => {
      console.log('Unable to get data from URL + err');
    };
  }
  getQuote() {
    this.api.getQuotes().subscribe(
      (data: any) => {
        let response = data.payload;
        this.noOfQuotes = response.length;
      },
      (err: any) => {}
    );
  }

  hideStaffList() {
    if (this.userDetails.role == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  hideInvoice() {
    if (this.userDetails.role == 'clerk') {
      return false;
    } else {
      return true;
    }
  }

  tabSize(index: number) {
    this.page = index;
  }
}
