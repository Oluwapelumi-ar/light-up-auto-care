import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userDetails = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem('userDetails')))
  );
  username: string = '';
  role: string = '';

  constructor(private router: Router) {
    this.username = this.userDetails.name;
    this.role = this.userDetails.role;
  }

  ngOnInit(): void {}

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
