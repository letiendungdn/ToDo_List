import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ArticleGuard implements CanActivate {
    constructor(private readonly auth: AuthService, private readonly router: Router) {

    }
   canActivate(
       next: ActivatedRouteSnapshot,
       state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
           return this.auth.currentUser.pipe(map((user) =>{
               const isAuth = !!user;
               if(isAuth) {
                   return true;
               }else{
                   this.router.navigate(['/'])
                   return false;
               }
           }));
       }
   
}