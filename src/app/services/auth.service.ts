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
    let temp = {username: username, password: password};
    sessionStorage.isLogin = true;
    sessionStorage.currentStaff = JSON.stringify(temp);
    this.router.navigate(['']);
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

  isLoggedIn(): boolean {
    return sessionStorage.isLogin == 'true';
  }
}
