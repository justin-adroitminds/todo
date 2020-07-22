import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // if you turn this is authenticated to false, you wouldnt be able to reach the protected routes
  isAuthenticated(): boolean {
  return true;
  }

  // if you change this Admin to anything else it wouldnt let u in
  // tslint:disable-next-line: typedef
  decode() {
return { name: 'justin' , Role: 'Admin' };
  }
}
