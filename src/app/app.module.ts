//buit-in
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";

//Components
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
//routes
import { appRoutes } from "./routes";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserService } from "./user/shared/user.service";
import { StoreService } from "./user/shared/store.service";
import { UserService1 } from "./user/shared/user.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { ToolbarComponent } from "../app/toolbar/toolbar.component";
import { TestComponent } from "./user/test/test.component";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    TestComponent,
    ToolbarComponent,
    MatConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
    UserService1,
    StoreService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [TestComponent, MatConfirmDialogComponent],
})
export class AppModule {}
