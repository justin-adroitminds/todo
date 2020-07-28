import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo/todo.component';

import { RouterModule } from '@angular/router';
import { TodoRoutes } from './to-do.routes';
import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthGuard } from '../auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [TodoComponent, LayoutComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TodoRoutes),
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToDoModule { }
