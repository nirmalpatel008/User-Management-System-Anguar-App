import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
} from "@angular/core";
import { UserService1 } from "../user/shared/user.service";
import { UserService } from "../user/shared/user.service";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatTable,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { TestComponent } from "../user/test/test.component";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User1 } from "../user/shared/user.model";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogService } from "../user/shared/dialog.service";
import { StoreService } from "../user/shared/store.service";
import { Observable, Subscription, timer, from } from "rxjs";
import { share, mergeMap } from "rxjs/operators";

declare var M: any;
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
  providers: [UserService1, UserService, StoreService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  // private matdatasource;

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @Output() page: EventEmitter<PageEvent>;

  // @ViewChild(MatPaginator, { static: false }) set paginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.setDataSourceAttributes();
  // }

  Status: boolean;
  data: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = 20;

  // getPaginatorData(event) {
  //   console.log(event);
  //   if (event.pageIndex === this.pageIndex + 1) {
  //     this.lowValue = this.lowValue + this.pageSize;
  //     this.highValue = this.highValue + this.pageSize;
  //   } else if (event.pageIndex === this.pageIndex - 1) {
  //     this.lowValue = this.lowValue - this.pageSize;
  //     this.highValue = this.highValue - this.pageSize;
  //   }
  //   this.pageIndex = event.pageIndex;
  // }

  getPaginatorData(event?: PageEvent): PageEvent {
    console.log(event);
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  // pageSizeOptions: number[] = [5, 10, 25, 100];

  // private updateSubscription: Subscription;

  constructor(
    public userService: UserService1,
    public oldService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public dialogService: DialogService,
    public store: StoreService // private cdr: ChangeDetectorRef
  ) {}

  // ngAfterViewInit() {
  //   this.paginator.page.subscribe((event) => console.log(event));
  // }

  ngOnInit() {
    this.userService.refereshNeeded$.subscribe(() => {
      this.refreshUserList();
      console.log("test");
    });

    // setInterval(() => {
    //   this.refreshUserList();
    //   this.cdr.markForCheck();
    // }, 1000);
    //     this.dataSource = new MatTableDataSource(this.userService.users);

    // this.dataSource.paginator = this.paginator;

    this.refreshUserList();
    this.status();
  }

  // onPageFired(event){
  //   this.userService.getUserList.subscribe((res)=>{
  //     this.dataSource = data;
  //   }
  // }
  // setDataSourceAttributes() {
  //   this.dataSource = new MatTableDataSource(this.userService.users);
  //   this.dataSource.paginator = this.paginator;
  // }

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
    this.Status = true;
    // this.matdatasource = new MatTableDataSource([]);
    // setTimeout(() => (this.Status = false), 4000);
    this.userService.getUserList().subscribe((res) => {
      this.Status = false;
      this.userService.users = res as User1[];
      // this.matdatasource.data = res as User1[];

      this.data = this.userService.users.length;

      // console.log(this.data);
    });
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: "Saved Successfully", classes: "rounded" });
      });
    } else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: "Updated Successfully", classes: "rounded" });
      });
    }
  }

  logoutUser() {
    this.oldService.logout();
    this.router.navigateByUrl("login");
  }

  // onEdit1(user: User1) {
  //   this.userService.selectedUser = user;
  // }

  onDelete(_id: string, form: NgForm) {
    this.dialogService
      .openConfirmDialog("Are you sure to delete this record?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.userService.deleteUser(_id).subscribe((res) => {
            this.refreshUserList();
            this.resetForm(form);
            M.toast({ html: "Deleted successfully", classes: "rounded" });
          });
        }
      });
  }
  OnCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.panelClass = "my-class";

    const dialogRef = this.dialog.open(TestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      if (data) this.refreshUserList();
    });
  }
  onEdit(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    let test = JSON.stringify(user);
    test = JSON.parse(test);
    dialogConfig.data = test;
    dialogConfig.panelClass = "my-class";
    const dialogRef = this.dialog.open(TestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      if (data) this.refreshUserList();
    });
  }

  status() {
    this.store.setLoginStatus(1);
  }

  OnRefresh() {
    // this.router.navigateByUrl("userprofile");
    window.location.reload();
  }
}
