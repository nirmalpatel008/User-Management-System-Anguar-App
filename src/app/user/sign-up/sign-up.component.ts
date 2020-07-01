import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { NgForm } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  Status: boolean;
  serverErrorMessages: String;
  constructor(private userService: UserService) {}

  ngOnInit() {}
  OnSubmit(form: NgForm) {
    this.Status = true;
    // setTimeout(() => (this.Status = false), 1000);
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.Status = false;
        this.showSucessMessage = true;
        // if (this.Status === true) {
        //   setTimeout(() => (this.showSucessMessage = false), 4000);
        // }

        this.resetForm(form);
      },
      (err) => {
        if (err.status === 402) {
          this.Status = false;
          this.serverErrorMessages = err.error.join("</br>");
        } else {
          this.serverErrorMessages =
            "Something went wrong. Please contact admin";
        }
      }
    );
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      username: "",
      email: "",
      password: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
