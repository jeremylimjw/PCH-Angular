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

  getAppointmentById(id: number): Observable<any> {
    return this.http.get<any>(`api/appointments/${id}`);
  }

  getAllAppointments(): Observable<any> {
    return this.http.get<any>(`api/appointments`);
  }

  newAppointment(doctorId: number, medicalRecordId: number, date: Date, type: string): Observable<any> {
    return this.http.post<any>(`api/appointments`, { doctor_id: doctorId, medical_record_id: medicalRecordId, date: date, type: type});
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put<any>(`api/appointments/cancel`, id);
  }

  getDoctors(): Observable<any> {
    return this.http.get<any>(`api/doctors`);
  }
  
  getQueueBoard(): Observable<any> {
    return this.http.get<any>(`api/queueBoard`);
  }
}
