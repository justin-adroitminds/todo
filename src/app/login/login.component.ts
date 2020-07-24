import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {

  model = {
    email : '',
    password: ''
  };
  serverErrorMessages: string;
  loginReturn: boolean;

  constructor(private AuthService1: AuthService, private router: Router) { }

     onSubmit(form: NgForm): void{
       try{
        this.AuthService1.login(form.value)
        .then(resData => {
          if (resData.status === true) {
            this.router.navigate(['/to-do']);
          }
          else {
            console.log(resData);
            this.serverErrorMessages = 'Incorrect Credentials';
            this.router.navigate(['/login']);
          }
        }).catch ((error) => {
          console.log(error);
          this.serverErrorMessages = 'Incorrect Credentials';
          this.router.navigate(['/login']);
        });
       }
       catch (error) {
        console.log(error);
      }
    }
}
