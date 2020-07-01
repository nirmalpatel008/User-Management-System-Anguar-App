import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  loginStatus = 0;
  setLoginStatus(status: number) {
    this.loginStatus = status;
  }

  constructor() {}
}
