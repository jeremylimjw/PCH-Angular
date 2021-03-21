import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewAppointmentComponent } from '../view-appointment/view-appointment.component';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['queue_no','date_time','schedule_type', 'appointment_type', 'doctor', 'status', 'medical_certificate', 'total_price'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getAppointments(1).subscribe( // value 1 to be replaced with logged in user id
      result => {
        for (let appointment of result) {
          appointment.date_time = new Date(appointment.date_time.replace('[UTC]',''));
          appointment.date_created = new Date(appointment.date_created.replace('[UTC]',''));
        }
          
        this.dataSource.data = result;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'medical_certificate': return item['medical_certificate'] ? 1 : 0;
        case 'doctor': return item['employee'].name;
        default: return item[property];
      }
    }
  }

  openDialog(appointment: any) {
    this.dialog.open(ViewAppointmentComponent, { data: { appointment: appointment }, width: '500px' });
  }
}