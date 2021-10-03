import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  alert!: boolean;

  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));
  constructor(private router: Router) {}

  ngOnInit(): void {}

  hideStaffList(){
    if(this.userDetails.role == 'admin'){
      return true;
    }else {
      return false ;
    }
  }

  hideInvoiceList(){
    if(this.userDetails.role == 'clerk'){
      return false;
    }else {
      return true;
    }
  }

  handleLogout() { 
    localStorage.clear();
    this.alert = true;
    this.router.navigate(['/login']);
  }

  closeAlert() {
    this.alert = false;
  }
}
