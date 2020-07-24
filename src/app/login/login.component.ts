import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  durationInSeconds = 5;

  constructor(private AuthService1: AuthService, private router: Router, private snackBar: MatSnackBar) { }

    openSnackBar(): void{
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }

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
            this.openSnackBar();
          }
        }).catch ((error) => {
          console.log(error);
          this.serverErrorMessages = 'Incorrect Credentials';
          this.openSnackBar();
        });
       }
       catch (error) {
        console.log(error);
      }
    }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
