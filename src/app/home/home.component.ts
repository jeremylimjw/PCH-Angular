import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService, TypeEnum } from '../services/message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  appointments: any[];

  constructor(
    private apiService: ApiService, 
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void { 
    this.apiService.getAppointments(this.authService.getUser().medical_record.id).subscribe(result => {
      this.appointments = result;
      
      this.apiService.getQueueBoard().subscribe(result => {
        if (result.length) {
          if (this.isMyAppointment(result[0].appointment.queue_no)) this.messageService.addMessage(TypeEnum.Warning, "Appointment " + result[0].appointment.queue_no + " is being called!", "Appointment is being called");
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
        }
      });
    });
  }

  isMyAppointment(queue_no: string): boolean {
    if (this.appointments) {
      for (let a of this.appointments) {
        if (a.queue_no == queue_no) return true;
      }
    }
    return false;
  }

}
