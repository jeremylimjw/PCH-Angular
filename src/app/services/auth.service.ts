import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;

  constructor(private router: Router) { }

  // Not the actual implementation
  login(username: string, password: string): void {
    let temp = {username: username, password: password, medical_record: { id: 1 }};
    sessionStorage.isLogin = true;
    sessionStorage.currentStaff = JSON.stringify(temp);
  }

  logout(): void {
    sessionStorage.isLogin = false;
    sessionStorage.currentStaff = null;
    this.router.navigate(['welcome']);
  }

  getUser(): any {
    if (sessionStorage.currentStaff) return JSON.parse(sessionStorage.currentStaff);
    return null;
  }

  setUser(user: any): void {
    sessionStorage.isLogin = true;
    sessionStorage.currentStaff = JSON.stringify(user);
  }

  isLoggedIn(): boolean {
    return sessionStorage.isLogin == 'true';
  }
}
