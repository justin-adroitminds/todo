import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  title = 'my-todo-list';
  newTodo: string;
  todos: any;
  todo: any;
  completed: any;
  visible: any;

  constructor(private ToDoService1: ToDoService) {
    this.newTodo = '';
    this.todos = [];
    this.completed = 0;
    this.visible = false;
    this.getList();
  }

  getList(): void{
    try{
      this.ToDoService1.getList()
      .then(resData => {
        if (resData.status) {
          console.log(resData.list);
          this.todos = resData.list;
          this.completed = 0;
          this.todos.forEach(to => {
            if (to.completed){
              this.completed += 1;
            }
          });
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

  addTodo(event): void {
    this.todo = {
      newTodo: this.newTodo
    };
    try{
      this.ToDoService1.addTask(this.todo)
      .then(resData => {
        if (resData.status) {
          this.getList();
        }
        else {
          this.getList();
        }
      }).catch ((error) => {
        console.log(error);
      });
     }
     catch (error) {
      console.log(error);
    }
    this.visible = false;
    this.newTodo = '';
    event.preventDefault();
  }

  deleteTodo(index): void {
    try{
      this.ToDoService1.deleteTask(index)
      .then(resData => {
        if (resData.status) {
          if (this.completed > 0){
            this.completed = this.completed - 1;
          }
          this.getList();
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

  deleteSelectedTodos(): void {
    for (let i = (this.todos.length - 1); i > -1; i--) {
      if (this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  }

  updateCompleted(index): void {
    if (this.todos[index].completed){
      this.completed = this.completed - 1;
    }else{
      this.completed = this.completed + 1;
    }

    try{
      this.ToDoService1.updateTask(this.todos[index])
      .then(resData => {
        if (resData.status) {
          this.getList();
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

  visibleButton(bool): void {
    this.visible = bool;
  }
}
