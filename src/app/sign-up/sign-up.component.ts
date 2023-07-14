import { Component, ViewChild } from '@angular/core';
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
    repassword: '',
  };
  users: User[] = [];
  passwordMatch = true;
  @ViewChild('f') signUpForm!: NgForm;
  error = null;
  noUser = true;
  signupbutton = true;
  //@ViewChild(AppComponent) appcomponent!: AppComponent;

  constructor(
    private router: Router,
    public appcomponent: AppComponent,
    private http: HttpClient,
    private authService: AuthGuardService
  ) {
    this.appcomponent.signup = true;
  }

  signUp() {
    this.appcomponent.signup = false;
    this.signUpForm.reset();
  }
  signIn() {
    // this.appcomponent.isLoggedIn = true;
    //this.getUsers()
    this.router.navigate(['/home']);
  }
  onFormSubmit() {
    if (this.signUpForm.value.password === this.signUpForm.value.repassword) {
      this.user.userName = this.signUpForm.value.userName;
      this.user.password = this.signUpForm.value.password;
      this.signUpForm.reset();
      this.http
        .post(
          'https://userdata-89ae3-default-rtdb.firebaseio.com/users.json',
          this.user
        )
        .subscribe((res) => {
          console.log(res);
          //this.getPosts();
        });
      //this.postForm.reset();
    }
  }
}
