import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'demoHospital';
  isLoggedIn = false;
  signup = false;
  constructor(private router: Router) {}

  homeSignUp() {
    this.signup = true;
  }

  homeSignIn() {
    this.signup = false;
  }

  logOut() {
    this.signup = false;
    this.isLoggedIn = false;
  }
}
