import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../auth-guard.service';


export const TodoRoutes: Routes = [
  {
    path: 'to-do',
    component: LayoutComponent,
    canActivate: [AuthGuard], // this is protected by Auth guard
    children: [
      { path: '', redirectTo: 'todo', pathMatch: 'full' },
      { path: 'todo', component: TodoComponent},
      { path: 'list', component: ListComponent}
    ]
  }
];
