import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { logInOut } from '../services/log-in-out.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user: User = {
    userName: '',
    password: '',
  };
  passwordMatch = true;
  @ViewChild('f') signUpForm!: NgForm;
  error: string | null = null;
  noUser = true;
  signupbutton = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public logInOut: logInOut,
  ) { }

  signUp() {
    this.signUpForm.reset();
    this.router.navigate(['/signUp']);
  }

  signIn() {
    if (this.signUpForm.value.userName || this.signUpForm.value.password) {
      const userName = this.signUpForm.value.userName;
      const password = this.signUpForm.value.password;

      this.authService
        .signIn(userName, password)
        .then((result) => {
          if (result === 'match') {
            this.logInOut.isLoggedIn = true;
            this.router.navigate(['/home']);
          } else if (result === 'check password') {
            alert('Please check the password');
            this.signUpForm.reset();
          } else {
            alert('User not found, please sign up');
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
      alert('Please fill the form');
    } else {
      if (this.signUpForm.value.password === this.signUpForm.value.repassword) {
        this.user.userName = this.signUpForm.value.userName;
        this.user.password = this.signUpForm.value.password;

        this.authService
          .signUp(this.user)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });

        this.signUpForm.reset();
      }
    }
  }
}
