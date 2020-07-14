import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddResourceDetailsComponent } from './components/add-resource-details/add-resource-details.component';

const routes: Routes = [
  {
    path: '',
    component: AddResourceDetailsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndUserRoutingModule { }
