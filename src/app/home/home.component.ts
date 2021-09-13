import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clientData: any = [];

  constructor( private api: ApiService) { }

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
    this.api.getAllClients().subscribe({
      next: (res) => {
        this.clientData = res.payload;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
