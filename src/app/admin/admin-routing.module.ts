import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AnalysisComponent } from './components/analysis/analysis.component';

const routes: Routes = [
  {
    path: '', component: HomeComponentComponent,
    children: [
      {path: '',redirectTo:'analysis',pathMatch:'full'},
      { path: 'create-user', component: CreateUserComponent },
      { path: 'analysis', component: AnalysisComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
