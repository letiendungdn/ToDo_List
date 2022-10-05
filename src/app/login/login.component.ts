import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from './../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private readonly router: Router,
    private readonly storage: LocalStorageService,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {}
  login() {
    if (this.username === 'test' && this.password === 'test') {
      this.cookieService.set(this.username, this.password);
      this.storage.set(this.username, this.password);
      this.router.navigate(['/home']);
    }
  }
}
