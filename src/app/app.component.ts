import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'demoHospital';
  isLoggedIn = false;
  signup = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signup = true;
  }

  homeSignUp() {
    this.signup = true;
    this.router.navigate(['/signUp'])

  }

  homeSignIn() {
    this.signup = false;
    this.router.navigate(['/signUp'])
  }

  logOut() {
    this.signup = false;
    this.isLoggedIn = false;
    this.router.navigate(['/signUp'])
  }
}
