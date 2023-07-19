import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { logInOut } from './services/log-in-out.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'demoHospital';
  constructor(private router: Router, public logInOut: logInOut) {}

  ngOnInit(): void {
    this.logInOut.signup = true;
  }

  homeSignUp() {
    this.logInOut.signup = true;
    this.router.navigate(['/signUp']);
  }

  homeSignIn() {
    this.logInOut.signup = false;
    this.logInOut.exist = false;
    this.router.navigate(['/signUp']);
  }

  default() {
    this.router.navigate(['/']);
    this.logInOut.isLoggedIn = false;
  }

  logOut() {
    this.logInOut.signup = false;
    this.logInOut.isLoggedIn = false;
    this.router.navigate(['/signUp']);
  }
}
