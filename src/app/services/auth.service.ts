import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) { }

    // if you turn this is authenticated to false, you wouldnt be able to reach the protected routes
  login(authCredentials): any{
    this.http.post<{status: boolean}>('/login', authCredentials)
    .subscribe(resData => {
      if (resData.status === true){
        this.isAuthenticated = true;
        // console.log(this.isAuthenticated);
        return true;
      }
      else{
        console.log(resData.status);
        this.isAuthenticated = false;
        return false;
      }
    } );
  }
  getisAuth(): boolean{
    return this.isAuthenticated;
      }
}
