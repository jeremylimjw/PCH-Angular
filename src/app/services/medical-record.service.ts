import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MedicalRecord } from '../models/medical-record';
import { UpdateMedicalRecordReq } from '../models/update-medical-record-req';


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


  updateMedicalRecord(body :any ): Observable<any>
  {
    //let updateMedicalRecord: UpdateMedicalRecordReq = new UpdateMedicalRecordReq(body.id,body.name,body.nric,body.address,body.dob,body.contact_number,body.blood_type,body.drug_allergys,body.family_historys,body.past_medical_historys,body.vaccinations)
    return this.httpClient.post<any>(`/api/MedicalRecord/updateMedicalRecord`,body);
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
