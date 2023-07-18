import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { logInOut } from '../services/log-in-out.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(private readonly logInOut: logInOut) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> {
    const isLoggedIn = this.logInOut.isLoggedIn;
    if (route.parent.path === 'signUp' && !isLoggedIn) {
      return false;
    }
    return true;
  }
}

const canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isLoggedIn = this.authService.isLoggedIn();
  if (route.parent.path === 'signUp' && !isLoggedIn) {
    return false;
  }
  return true;
};