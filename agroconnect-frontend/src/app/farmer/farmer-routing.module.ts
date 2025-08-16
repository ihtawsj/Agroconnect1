import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerDashboardComponent } from './dashboard/farmer-dashboard.component';
import { ProduceUploadComponent } from './produce-upload/produce-upload.component';
import { ViewProduceComponent } from './view-produce/view-produce.component';
import { FarmerOrdersComponent } from './orders/farmer-orders.component';

const routes: Routes = [
  { path: '', component: FarmerDashboardComponent }, // /farmer
  { path: 'upload-produce', component: ProduceUploadComponent },
  { path: 'view-produce', component: ViewProduceComponent },
  { path: 'orders', component: FarmerOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule {}
