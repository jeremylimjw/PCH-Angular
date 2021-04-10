import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageAccountComponent } from '../manage-account/manage-account.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MessageService, TypeEnum } from '../services/message.service';

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

  constructor(
    public dialogRef: MatDialogRef<ManageAccountComponent>, 
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.changeForm.get("cPassword").valueChanges.subscribe(x => {
      if (x.length == 0 || x != this.changeForm.get("password").value) {
        this.changeForm.get("cPassword").setErrors({'incorrect': true});
      } else {
        this.changeForm.get("cPassword").setErrors(null);
      }
    });
  }

  onSubmit(): void {
    this.apiService.changePassword({ 
      id: this.authService.getUser().id, 
      old_password: this.changeForm.get('oPassword').value, 
      password: this.changeForm.get('password').value
    }).subscribe(res => {
      this.messageService.addTemporaryMessage(TypeEnum.Success, "Password successfully changed!", "Password changed successfully");
      this.dialogRef.close();
    })
  }

}
