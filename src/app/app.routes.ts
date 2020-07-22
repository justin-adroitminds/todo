import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

import { AuthGuard } from './auth-guard.service';


export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TodoComponent, canActivate: [AuthGuard] }
];