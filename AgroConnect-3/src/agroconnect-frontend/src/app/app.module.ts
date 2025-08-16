import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './buyer/dashboard/dashboard.component';
import { BrowseProduceComponent } from './buyer/browse-produce/browse-produce.component';
import { CartComponent } from './buyer/cart/cart.component';
import { OrderHistoryComponent } from './buyer/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BrowseProduceComponent,
    CartComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
