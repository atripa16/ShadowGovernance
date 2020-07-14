import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddResourceDetailsComponent } from './end-user/components/add-resource-details/add-resource-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'end-user',
    pathMatch: 'full'
  },
  {
    path: 'end-user',
    loadChildren: 'src/app/end-user/end-user.module#EndUserModule'
  },
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
