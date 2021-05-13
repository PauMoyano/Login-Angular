import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3001';
  authSubject = new BehaviorSubject(false);
  private token: string;
  private isError: string;
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            console.log("esto es res",res)
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            this.setUser(res.dataUser.name);
          }
        }
        )
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
  setUser(user:Object): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }
  getCurrentUser(): UserI {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserI = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
}
