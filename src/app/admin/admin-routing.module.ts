import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { GetUserRole } from './Resolver/get-user-roles.resolver';
import { HomeComponent } from './components/home/home.component';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AnalystAuthGuard } from './guards/analyst-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AdminAuthGuard],
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
  },
  {
    path: 'analysis',
    component: HomeComponent,
    canActivate: [AnalystAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'analysis',
        pathMatch: 'full'
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
