import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MedicalRecordService} from '../services/medical-record.service'
import {MedicalRecord} from '../models/medical-record';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  user: any;
  medicalRecord : MedicalRecord;
  constructor(private authService: AuthService,private medServices: MedicalRecordService) { 
  
    this.medicalRecord = new MedicalRecord();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.medServices.getMedicalRecordById(this.authService.getUser().medical_record.id).subscribe(
      response => {
       
          this.medicalRecord = response;
          this.medicalRecord.dob = new Date(this.medicalRecord.dob.replace('[UTC]',''));
      },
      error => {
        console.log('********** Manage Component.ts:'+error );
      }
    );
  }

}
