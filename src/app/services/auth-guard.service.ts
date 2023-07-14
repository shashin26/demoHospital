import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../sign-up/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements OnInit {
  users: User[] = [];
  error = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.users = [];
    this.http
      .get<{ [key: string]: User }>(
        'https://userdata-89ae3-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((response) => {
          console.log(response);

          for (const [key, value] of Object.entries(response)) {
            this.users.push(value);
            this.error = null;
          }
          return this.users;
        })
      )
      .subscribe(
        (res: User[]) => {
          console.log(res);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }
}
