import { Component, OnInit, Inject } from "@angular/core";
import { User1 } from "../shared/user.model";
import { NgForm } from "@angular/forms";
import { UserService1 } from "../shared/user.service";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatToolbar,
} from "@angular/material";

declare var M: any;

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
  providers: [UserService1],
})
export class TestComponent implements OnInit {
  constructor(
    public userService: UserService1,
    private dailogRef: MatDialogRef<TestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.resetForm();

    this.OnEdit(this.data);
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.userService.selectedUser = {
      _id: "",
      email: "",
      username: "",
      password: "",
    };
  }
  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      console.log(res);
      this.userService.users = res as User1[];
      console.log(this.userService);
    });
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      console.log("inside submit");
      this.userService.postUser(form.value).subscribe(
        (res) => {
          this.refreshUserList();
          M.toast({ html: "Saved Successfully", classes: "rounded" });
          this.onClose();
        },
        (err) => {
          M.toast({
            html: "Enter Unique Information Carefully",
            classes: "rounded",
          });
        }
      );
    } else {
      console.log("inside update");
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: "Update Successfully", classes: "rounded" });
        this.onClose();
      });
    }
  }

  OnEdit(data) {
    console.log(data);
    console.log(data._id);

    this.userService.selectedUser = data;
  }

  // onEdit(user) {
  //   this.dailogRef.
  // }

  onClose() {
    this.resetForm();
    this.dailogRef.close("test");
  }
}
