import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user = {
    userName: '',
    password: '',
  };
  users: User[] = [];
  passwordMatch = true;
  @ViewChild('f') signUpForm!: NgForm;
  error = null;
  noUser = true;
  signupbutton = true;

  constructor(
    private router: Router,
    public appcomponent: AppComponent,
    private http: HttpClient,
    private authService: AuthGuardService
  ) {
    this.appcomponent.signup = false;
  }

  signUp() {
    this.appcomponent.signup = false;
    this.signUpForm.reset();
  }

  signIn() {
    if (this.signUpForm.value.userName || this.signUpForm.value.password) {
      const userName = this.signUpForm.value.userName;
      const password = this.signUpForm.value.password;

      this.authService
        .checkMatch(userName, password)
        .then((result) => {
          if (result === 'match') {
            this.appcomponent.isLoggedIn = true;
            this.router.navigate(['/home']);
          } else if (result === 'check password') {
            alert('Please Check the Password');
            this.signUpForm.reset();
          } else {
            alert('User Not Found, Please Sign Up');
            this.signUpForm.reset();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  onFormSubmit() {
    if (!this.signUpForm.value.userName || !this.signUpForm.value.password) {
      alert('please fill the form');
    } else {
      if (this.signUpForm.value.password === this.signUpForm.value.repassword) {
        this.user.userName = this.signUpForm.value.userName;
        this.user.password = this.signUpForm.value.password;

        this.http
          .post(
            'https://userdata-89ae3-default-rtdb.firebaseio.com/users.json',
            this.user
          )
          .subscribe((res) => {
            console.log(res);
          });

        this.signUpForm.reset();
      }
    }
  }
}
