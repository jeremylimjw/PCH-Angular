import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  
  openDialog() {
    this.dialog.open(ChangePasswordComponent, { width: '500px' });
  }

}
