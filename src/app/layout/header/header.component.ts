import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));
  username:string ='';

<<<<<<< HEAD
  constructor(private router :Router) { }
=======
  constructor(private router :Router) {
    this.username = this.userDetails.name
   }
>>>>>>> 4e50d5abb288e6cc1a6233b3a6915831cd9f0d2c

  ngOnInit(): void {
  }
  

  // handleName() {
    
  //   console.log(this.username);
  // }

  handleLogout() {
    localStorage.clear();
    alert('Logged Out');
    this.router.navigate(['/login']);
  }

  handleLogout() {
    localStorage.clear();
    alert('Logged Out');
    this.router.navigate(['/login']);
  }

}
