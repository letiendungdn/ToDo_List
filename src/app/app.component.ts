import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dung',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasTodo$: Observable<boolean>;
  constructor(private todoService: TodoService){}
  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
}
