import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }

    signUp(user: User): Promise<any> {
        return this.http
            .post(
                'https://userdata-89ae3-default-rtdb.firebaseio.com/users.json',
                user
            )
            .toPromise();
    }

    signIn(userName: string, password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          this.http
            .get<{ [key: string]: User }>(
              'https://userdata-89ae3-default-rtdb.firebaseio.com/users.json'
            )
            .toPromise()
            .then((response) => {
              if (response) {
                const users: User[] = Object.values(response);
      
                const matchedUser = users.find((user) => user.userName === userName);
      
                if (matchedUser) {
                  if (matchedUser.password === password) {
                    resolve('match');
                  } else {
                    resolve('check password');
                  }
                } else {
                  resolve('user not found');
                }
              } else {
                resolve('user not found');
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      }      
}
