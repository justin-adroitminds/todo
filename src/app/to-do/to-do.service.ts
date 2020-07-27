import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getList(): any{
    const promise = new Promise((resolve, reject) => {
     this.http.get<{status: boolean, list: Array<string>}>('/todolist')
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

   deleteTask(index): any{
    const promise = new Promise((resolve, reject) => {
     this.http.delete<{status: boolean, list: Array<string>}>('/task/' + index)
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

   updateTask(index): any{
    const promise = new Promise((resolve, reject) => {
     this.http.put<{status: boolean, list: Array<string>}>('/updatetask/', {id : index})
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
