import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-todo-list';
  newTodo: string;
  todos: any;
  todo: any;
  completed: any;

  constructor() {
    this.newTodo = '';
    this.todos = [];
    this.completed = 0;
  }

  addTodo(event): void {
    this.todo = {
      newTodo: this.newTodo,
      completed: false
    };
    this.todos.push(this.todo);
    this.newTodo = '';
    event.preventDefault();
  }

  deleteTodo(index): void {
    if (this.todos[index].completed){
      this.completed = this.completed - 1;
    }
    this.todos.splice(index, 1);
  }

  deleteSelectedTodos(): void {
    for (let i = (this.todos.length - 1); i > -1; i--) {
      if (this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  }

  updatecompleted(bool): void {
    if (bool){
      this.completed = this.completed + 1;
    }else{
      this.completed = this.completed - 1;
    }
  }
}
