import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckingOutComponent } from './components/checking-out/checking-out.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ActivationSuccessComponent } from './components/activation-success/activation-success.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { JwtInterceptor } from './models/jwt-interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ComfirmPasswordComponent } from './components/comfirm-password/comfirm-password.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LogoAnimComponent } from './components/logo-anim/logo-anim.component';
import { SuccessTransComponent } from './components/success-trans/success-trans.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { AdminSpaceComponent } from './components/admin-space/admin-space.component';
import { HomeComponent } from './components/home/home.component';

import { AdminProdComponent } from './components/admin-prod/admin-prod.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckingOutComponent,
    LoginComponent,
    SignupComponent,
    OtpVerificationComponent,
    ActivationSuccessComponent,
    ForgotPasswordComponent,
    ComfirmPasswordComponent,
    DropdownComponent,
    LogoAnimComponent,
    SuccessTransComponent,
    DashbordComponent,
    AdminSpaceComponent,
    HomeComponent,
    AdminProdComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}