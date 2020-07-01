import { Component, OnInit } from "@angular/core";
import { UserService1 } from "../user/shared/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [UserService1],
})
export class UserComponent implements OnInit {
  constructor(public userService: UserService1) {}

  ngOnInit() {}
}
