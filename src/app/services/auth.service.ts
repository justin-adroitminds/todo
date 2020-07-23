import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = false;
   }

    // if you turn this is authenticated to false, you wouldnt be able to reach the protected routes
  login(authCredentials): any{
    this.http.post<{message: string, error: string}>('/login', authCredentials)
    .subscribe(resData => {
      if (resData.message){
        this.isAuthenticated = true;
        this.router.navigate(['/to-do']);
      }
      else if (resData.error){
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      }
    } );
  }
}
