import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { GetUserRole } from './Resolver/get-user-roles.resolver';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'analysis',
        pathMatch: 'full'
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        resolve: { roles: GetUserRole }
      },
      {
        path: 'analysis',
        component: AnalysisComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
