import { Component, OnInit } from "@angular/core";
import { StoreService } from "../user/shared/store.service";
import { UserService } from "../user/shared/user.service";
import { from } from "rxjs";
import { Router } from "@angular/router";
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
  providers: [StoreService, UserService, UserProfileComponent],
})
export class ToolbarComponent implements OnInit {
  constructor(
    public store: StoreService,
    public userService: UserService,
    private router: Router,
    public user: UserProfileComponent
  ) {}

  ngOnInit() {
    this.status();
  }

  status() {
    this.store.setLoginStatus(0);
  }
  logoutUser() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }

  createUser() {
    this.user.OnCreate();
  }

  refreshList() {
    this.user.OnRefresh();
  }
}
