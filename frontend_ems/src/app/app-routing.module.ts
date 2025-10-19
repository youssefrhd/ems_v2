import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ActivationSuccessComponent } from './components/activation-success/activation-success.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ComfirmPasswordComponent } from './components/comfirm-password/comfirm-password.component';
import { CheckingOutComponent } from './components/checking-out/checking-out.component';
import { SuccessTransComponent } from './components/success-trans/success-trans.component';
import { AdminSpaceComponent } from './components/admin-space/admin-space.component';
import { HomeComponent } from './components/home/home.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { AdminProdComponent } from './components/admin-prod/admin-prod.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [
  {path:'home',component:HomeComponent},
  { path: 'products', component: ProductsListComponent  },
  { path:'success-trans',component:SuccessTransComponent},
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path :'shopping-cart' , component: CartComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'activation-success',component:ActivationSuccessComponent},
  { path:'login' ,component:LoginComponent},

  {path:'admin' ,
   canActivate:[AuthGuard],

    children:[
      {path:'adminProd',component:AdminProdComponent},
      {path:'dashbord',component:DashbordComponent},
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' }
    ]
  },
  { path :'verification', component:OtpVerificationComponent},
  { path :'signup' ,component:SignupComponent},
  {path : 'confirm-password' , component : ComfirmPasswordComponent},
  {path:'checking-out' , component:CheckingOutComponent},
  
  {path:'admin-space',component:AdminSpaceComponent},
  
  


  
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' }
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
