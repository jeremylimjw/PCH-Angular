import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAppointments(id: number): Observable<any> {
    return this.http.get<any>(`api/appointments/medicalRecord/${id}`);
  }
}
