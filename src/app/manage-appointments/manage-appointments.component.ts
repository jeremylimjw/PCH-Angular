import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MessageService, TypeEnum } from '../services/message.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAppointments(1).subscribe( // value 1 to be replaced with logged in user id
      result => {
        for (let i = 0; i < result.length; i++) result[i].date_time = new Date(result[i].date_time.replace('[UTC]',''))
          
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
        default: return item[property];
      }
    }
  }

  redirect(id: number) {
    console.log(id);
  }
}
