import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  model = {
    email: "",
    password: "",
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  Status: boolean;
  status: boolean;
  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.Status = true;

    this.userService.login(form.value).subscribe(
      (res) => {
        this.Status = false;
        this.userService.setToken(res["token"]);
        this.router.navigateByUrl("/userprofile");
      },
      (err) => {
        if (err.status === 400) {
          this.Status = false;
          this.serverErrorMessages = "Invalid Credentials";
        } else {
          this.serverErrorMessages = "Login Failed";
        }
      }
    );
  }
  isLoggedUser() {
    this.status = true;
  }
}
