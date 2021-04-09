import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AuthService } from '../services/auth.service';
import {MedicalRecordService} from '../services/medical-record.service'
import {MedicalRecord} from '../models/medical-record';
import { EditAccountComponent } from '../edit-account/edit-account.component';
@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  user: any;
  medicalRecord : MedicalRecord;
  constructor(private authService: AuthService, public dialog: MatDialog, private medServices: MedicalRecordService) { 
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
  
  openDialog() {
    this.dialog.open(ChangePasswordComponent, { width: '500px' });
  }

  updateMed() {
    this.dialog.open(EditAccountComponent).afterClosed().subscribe(() => location.reload());
  }

 
}
