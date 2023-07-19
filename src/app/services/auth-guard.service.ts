import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { logInOut } from './log-in-out.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private logInOut: logInOut) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.logInOut.isLoggedIn;
    return isLoggedIn;
  }
}
