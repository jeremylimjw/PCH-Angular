import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MedicalRecord } from '../models/medical-record';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {



  constructor(private httpClient: HttpClient)
  {
  }

  getMedicalRecordById(id : number): Observable<MedicalRecord> {

    return this.httpClient.get<MedicalRecord>(`/api/MedicalRecord/retrieveMedicalRecord/${id}`).pipe
    (
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse)
    {
      let errorMessage: string = "";
      
      if (error.error instanceof ErrorEvent) 
      {		
        errorMessage = "An unknown error has occurred: " + error.error;
      } 
      else 
      {		
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
      }
      
      console.error(errorMessage);
      
      return throwError(errorMessage);		
    }




}
