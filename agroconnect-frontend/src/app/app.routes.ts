import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Buyer
import { DashboardComponent } from './buyer/dashboard/dashboard.component';
import { BuyerProduceComponent } from './buyer/produce/produce.component';
import { BuyerCartComponent } from './buyer/cart/cart.component';
import { BuyerOrdersComponent } from './buyer/orders/orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'produce', 
    component: BuyerProduceComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'cart', 
    component: BuyerCartComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'orders', 
    component: BuyerOrdersComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'farmer',
    loadChildren: () => import('./farmer/farmer.module').then(m => m.FarmerModule),
    canActivate: [AuthGuard]
  }
];
