import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthenticated: boolean;
  public userData: UserData | null;

  constructor(private http: HttpClient) {
    this.isAuthenticated = false;
    this.userData = null;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  setUserData(data: UserData | null) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  getUserDataByUsername(username: string): Observable<UserData> {
    return this.http.get<UserData>(
      `http://localhost:3000/users?username=${username}`
    );
  }
}
