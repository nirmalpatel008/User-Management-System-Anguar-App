import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, NgForm } from "@angular/forms";
import { Observable, from, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { User } from "./user.model";
import { User1 } from "./user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  selectedUser: User = {
    username: "",
    email: "",
    password: "",
  };
  users: User[];
  // readonly baseURL = "http://localhost:5000/api/v1/users";

  noAuthHeader = { headers: new HttpHeaders({ Noauth: "True" }) };
  constructor(private http: HttpClient) {}
  private _refereshNeeded$ = new Subject<void>();
  // get refereshNeeded$() {
  //   return this._refereshNeeded$;
  // }
  postUser(user: User) {
    return this.http.post(
      environment.apiBaseURL + "/register",
      user,
      this.noAuthHeader
    );
    // .pipe(
    //   tap(() => {
    //     this.refereshNeeded$.next();
    //   })
    // );
  }
  login(authCredentials) {
    return this.http.post(
      environment.apiBaseURL + "/login",
      authCredentials,
      this.noAuthHeader
    );
  }

  logout() {
    this.deleteToken();
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}

export class UserService1 {
  selectedUser: User1;
  isAuthenticated = false;

  users: User1[];
  // readonly baseURL = "http://localhost:5000/api/v1/users";
  noAuthHeader = { headers: new HttpHeaders({ Noauth: "True" }) };

  constructor(private http: HttpClient) {}
  private _refereshNeeded$ = new Subject<void>();
  get refereshNeeded$() {
    return this._refereshNeeded$;
  }

  postUser(user: User1) {
    return this.http
      .post(environment.apiBaseURL + "/register", user, this.noAuthHeader)
      .pipe(
        tap(() => {
          this.refereshNeeded$.next();
        })
      );
  }

  getUserList() {
    return this.http.get(environment.apiBaseURL);
  }
  putUser(user: User1) {
    return this.http.put(environment.apiBaseURL + `/${user._id}`, user);
  }
  deleteUser(_id: string) {
    return this.http.delete(environment.apiBaseURL + `/${_id}`);
  }

  // populateForm(user) {
  //   this.putUser(user);
  // }
}
