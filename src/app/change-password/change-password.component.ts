import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageAccountComponent } from '../manage-account/manage-account.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  changeForm = this.formBuilder.group({
    oPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ManageAccountComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
