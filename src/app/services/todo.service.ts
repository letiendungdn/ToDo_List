import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, retry, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  private todos: Todo[];
  private static readonly TodoStorageKey = 'todos';
  private filteredTodos1: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;
  test$: Observable<Todo[]>;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  // private httpClient: HttpClient;
  private REST_API_URL = 'http://localhost:3000/posts';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
  constructor(private httpClient: HttpClient) {}
  // constructor(private storageService: LocalStorageService,) {

  //  }
  public getComments(): Observable<any> {
    const url = `${this.REST_API_URL}`;
    return this.httpClient.get<any>(url);
  }
  ngOnInit() {}
  fetchFromLocalStorage() {
    //  this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.httpClient
      .get<Todo[]>('http://localhost:3000/posts')
      .subscribe((data) => {
        this.todos = data;
      });

    //  this.filteredTodos1 = [...this.todos.map(todo => ({...todo}))];
    //  this.filteredTodos1 = this.todos;

    setTimeout(() => {
      this.filteredTodos1 = [...this.todos.map((todo) => ({ ...todo }))];
      this.updateTodosData();
    }, 1000);
  }

  updateToLocalStorage() {
    //  this.storageService.setObject(TodoService.TodoStorageKey,this.todos)
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }
  addTodo(content: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    //  this.todos.unshift(newTodo);
    //  console.log(newTodo);
    //  this.updateToLocalStorage();
    this.httpClient
      .post<Todo>('http://localhost:3000/posts', newTodo, this.httpOptions)
      .subscribe((data) => {
        this.todos.unshift(data);
        this.updateToLocalStorage();
      });
  }
  changeTodoStatus(id: number, isCompleted: boolean) {
    const index = this.todos.findIndex((t) => t.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    //  this.todos.splice(index, 1,todo);

    const url = 'http://localhost:3000/posts/' + id;
    this.httpClient.put(url, todo).subscribe();
    this.updateToLocalStorage();
  }
  editTodo(id: number, content: string) {
    const index = this.todos.findIndex((t) => t.id === id);
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index, 1, todo);
    const url = 'http://localhost:3000/posts/' + id;
    this.httpClient.put(url, todo).subscribe();
    this.updateToLocalStorage();
  }
  deleteTodo(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos.splice(index, 1);
    const url = 'http://localhost:3000/posts/' + id;
    this.httpClient.delete(url).subscribe();
    this.updateToLocalStorage();
  }
  toggleAll() {
    this.todos = this.todos.map((todo) => {
      return {
        ...todo,
        isCompleted: !this.todos.every((t) => t.isCompleted),
      };
    });
    this.updateToLocalStorage();
  }
  clearComplete() {
    this.todos = this.todos.filter((todo) => !todo.isCompleted);
    this.updateToLocalStorage();
  }
  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos1 = this.todos.filter((todo) => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos1 = this.todos.filter((todo) => todo.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos1 = [...this.todos.map((todo) => ({ ...todo }))];
        break;
    }
    if (isFiltering) {
      this.updateTodosData();
    }
  }
  private updateTodosData() {
    this.displayTodosSubject.next(this.filteredTodos1);
    this.lengthSubject.next(this.todos.length);
  }
}
