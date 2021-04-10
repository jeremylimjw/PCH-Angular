import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MedicalRecordService} from '../services/medical-record.service'
import { MedicalRecord } from '../models/medical-record';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageAccountComponent } from '../manage-account/manage-account.component';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  medicalRecordToUpdate : MedicalRecord;
  date:Date;
  user: any;

  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<ManageAccountComponent>,
    private medServices: MedicalRecordService
    ) {
      this.medicalRecordToUpdate = new MedicalRecord();
     
     }

ngOnInit(){

  this.medicalRecordToUpdate.dob = this.date;

  this.user = this.authService.getUser();
  this.medServices.getMedicalRecordById(this.authService.getUser().medical_record.id).subscribe(
  response => {
    this.medicalRecordToUpdate = response;
    this.medicalRecordToUpdate.dob = new Date(this.medicalRecordToUpdate.dob.replace('[UTC]',''));
  },
    error => {
    console.log('********** Manage Component.ts:'+error );
  });
}



update() {

  this.medicalRecordToUpdate.dob = new Date(this.date);

  this.medServices.updateMedicalRecord(this.medicalRecordToUpdate).subscribe(
  
  response => {
    this.medicalRecordToUpdate.dob = new Date(this.medicalRecordToUpdate.dob.replace('[UTC]',''));
  });
    this.dialogRef.close();
}





}