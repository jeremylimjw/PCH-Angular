import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  appointments: any[];
  user: any;

  ngOnInit(): void {
    this.user = {id: 1 };
    this.apiService.getAppointments(this.user.id).subscribe(
      result => {
        this.appointments = result;
      },
      err => {
        console.log(err);
      },
      () => console.log('Done')
    );
  }

}
