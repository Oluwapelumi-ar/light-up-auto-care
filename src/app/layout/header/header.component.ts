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

  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  handleName() {
    this.username = this.userDetails.name
    console.log(this.username);
  }

  handleLogout() {
    localStorage.clear();
    alert('Logged Out');
    this.router.navigate(['/login']);
  }

}
