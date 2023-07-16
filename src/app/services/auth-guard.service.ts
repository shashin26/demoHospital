import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../sign-up/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  users: User[] = [];
  error = null;

  constructor(private http: HttpClient) { }

  checkMatch(userName: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http
        .get<{ [key: string]: User }>(
          'https://userdata-89ae3-default-rtdb.firebaseio.com/users.json'
        )
        .pipe(
          tap(() => {
            this.users = [];
            this.error = null;
          }),
          map((response) => Object.values(response)),
          tap((users: User[]) => {
            this.users = users;
          })
        )
        .subscribe(
          () => {
            for (const user of this.users) {
              //console.log(user);
              //console.log(user.userName, user.password);
              if (user.userName === userName) {
                if (user.password === password) {
                  resolve('match');
                  return;
                } else {
                  resolve('check password');
                  return;
                }
              }
            }
            resolve('user not found');
          },
          (error) => {
            this.error = error.message;
            reject(error);
          }
        );
    });
  }
}
