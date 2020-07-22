import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from '../auth-guard.service';


export const TodoRoutes: Routes = [
  {
    path: 'to-do',
    component: TodoComponent,
    canActivate: [AuthGuard], // this is protected by Auth guard
  }
];