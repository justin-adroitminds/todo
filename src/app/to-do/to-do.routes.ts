import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LayoutComponent } from './layout/layout.component';
import { ListLayoutComponent } from './list-layout/list-layout.component';
import { AuthGuard } from '../auth-guard.service';


export const TodoRoutes: Routes = [
  {
    path: 'to-do',
    component: LayoutComponent,
    canActivate: [AuthGuard], // this is protected by Auth guard
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'todo/:id', component: TodoComponent},
      { path: 'list', component: ListLayoutComponent}
    ]
  }
];
