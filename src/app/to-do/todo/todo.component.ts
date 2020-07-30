import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  title: string;
  todos: any;
  todo: any;
  completed: any;
  visible: any;
  length: 0;
  id: any;

  constructor(private ToDoService1: ToDoService, private route: ActivatedRoute) {
    this.title = '';
    this.todos = [];
    this.completed = 0;
    this.visible = false;
    this.route.params
          .subscribe(
            (params) => {
              this.id = params.id;
              console.log(this.id);
            }
          );
    this.getList();
  }

  ngOnInit(): void{ }

  getList(): void{
    try{
      this.ToDoService1.getList(this.id)
      .then(resData => {
        if (resData.status) {
          this.todos = resData.list[0].list;
          this.completed = 0;
          if (this.todos.length){
            this.length = this.todos.length;
          }
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
      id : this.id,
      title: this.title
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
    this.title = '';
    event.preventDefault();
  }

  deleteTodo(index): void {
    try{
      this.ToDoService1.deleteTask(index, this.id)
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

    const update = {
      indx : index,
      id : this.id,
      todo : this.todos[index]
    };

    try{
      this.ToDoService1.updateTask(update)
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
