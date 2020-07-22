import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo/todo.component';

import { RouterModule } from '@angular/router';
import { TodoRoutes } from './to-do.routes';

import { AuthGuard } from '../auth-guard.service';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TodoRoutes),
    FormsModule
  ],
  providers: [AuthGuard],
})
export class ToDoModule { }
