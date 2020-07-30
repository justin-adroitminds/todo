import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getList(id): any{
    const promise = new Promise((resolve, reject) => {
     this.http.get<{status: boolean, list: Array<string>}>('/todolist/' + id)
     .subscribe(resData => {
       if (resData.status){
        resolve(resData);
       }
       else{
         reject(false);
       }
     } );
    });
    return promise;
   }

   addTask(newTodo): any{
    const promise = new Promise((resolve, reject) => {
     this.http.post<{status: boolean, list: Array<string>}>('/addtask', newTodo)
     .subscribe(resData => {
       if (resData.status){
        console.log(resData.list);
        resolve(resData);
       }
       else{
         reject(false);
       }
     } );
    });
    return promise;
   }

   deleteTask(index, id): any{
    const promise = new Promise((resolve, reject) => {
     this.http.delete<{status: boolean, list: Array<string>}>('/task/' + index + '/' + id)
     .subscribe(resData => {
       if (resData.status){
        console.log(resData.list);
        resolve(resData);
       }
       else{
         reject(false);
       }
     } );
    });
    return promise;
   }

   updateTask(update): any{
    const promise = new Promise((resolve, reject) => {
     this.http.put<{status: boolean, list: Array<string>}>('/updatetask/', update)
     .subscribe(resData => {
       if (resData.status){
        console.log(resData.list);
        resolve(resData);
       }
       else{
         reject(false);
       }
     } );
    });
    return promise;
   }

   getTodos(): any{
    const promise = new Promise((resolve, reject) => {
     this.http.get<{status: boolean, list: Array<string>}>('/todos')
     .subscribe(resData => {
       if (resData.status){
        console.log(resData.list);
        resolve(resData);
       }
       else{
         reject(false);
       }
     } );
    });
    return promise;
   }

   addTodo(name: string, file: File): any{
    const promise = new Promise((resolve, reject) => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('image', file);
    this.http.post<{status: boolean, list: Array<string>}>('/addlist', formdata)
    .subscribe(resData => {
      if (resData.status){
        console.log(resData.list);
        resolve(resData);
      }
      else{
        reject(false);
      }
    } );
  });
    return promise;
   }
}
