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

  constructor(private AuthService1: AuthService, private router: Router) { }

    onSubmit(form: NgForm): void{
      this.AuthService1.login(form.value).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/to-do');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
}
