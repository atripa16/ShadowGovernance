import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddResourceDetailsComponent } from './components/add-resource-details/add-resource-details.component';
import { EndUserAuthGuard } from './guards/end-user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AddResourceDetailsComponent,
    pathMatch: 'full',
    canActivate: [EndUserAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndUserRoutingModule { }
