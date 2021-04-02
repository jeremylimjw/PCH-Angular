import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MessageService, TypeEnum } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private message: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apiService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      this.authService.setUser(res);
      this.router.navigate(['']);
    });
  }
}
