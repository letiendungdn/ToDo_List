import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private readonly storage: LocalStorageService, private readonly cookieService: CookieService){

    }
    get currentUser() {

        // return of(this.storage.get("test"));
        return of(this.cookieService.get("test"));
    }
    
}