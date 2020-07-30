import { Component, Inject } from '@angular/core';
import { ToDoService } from '../to-do.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.css']
})
export class ListLayoutComponent {

  name: string;
  todos: any;
  todo: any;
  completed: any;
  visible: any;
  constructor(private ToDoService1: ToDoService, public dialog: MatDialog) {
    this.name = '';
    this.todos = [];
    this.completed = 0;
    this.visible = false;
    this.getTodos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      this.name = result;
      this.addTodo();
    });
  }

  addTodo(): void {
    this.todo = {
      name: this.name
    };
    try{
      this.ToDoService1.addTodo(this.todo)
      .then(resData => {
        if (resData.status) {
          this.getTodos();
        }
        else {
          this.getTodos();
        }
      }).catch ((error) => {
        console.log(error);
      });
     }
     catch (error) {
      console.log(error);
    }
    this.visible = false;
    this.name = '';
  }

  getTodos(): void{
    try{
      this.ToDoService1.getTodos()
      .then(resData => {
        if (resData.status) {
          console.log(resData.list);
          this.todos = resData.list;
          this.completed = 0;
        }
        else {
          console.log(resData);
          this.todos = [];
        }
      }).catch ((error) => {
        console.log(error);
      });
     }
     catch (error) {
      console.log(error);
    }
  }


}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
