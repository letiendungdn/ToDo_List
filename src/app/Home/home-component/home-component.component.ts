import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';



@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit {

  hasTodo$: Observable<boolean>;
  constructor(private readonly router: Router,private todoService: TodoService,private readonly storage: LocalStorageService, private readonly cookieService: CookieService){}
  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
  logout() {
    this.storage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

}
