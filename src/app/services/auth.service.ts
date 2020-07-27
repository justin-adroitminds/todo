import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

    // if you turn this is authenticated to false, you wouldnt be able to reach the protected routes
  login(authCredentials): any{
   const promise = new Promise((resolve, reject) => {
    this.http.post<{status: boolean, list: Array<string>}>('/login', authCredentials)
    .subscribe(resData => {
      if (resData.status){
        localStorage.setItem('isAuthenticated', 'true');
        resolve(resData);
      }
      else{
        localStorage.setItem('isAuthenticated', 'false');
        reject(false);
      }
    } );
   });
   return promise;
  }
  getisAuth(): string{
    return localStorage.getItem('isAuthenticated');
  }
}
