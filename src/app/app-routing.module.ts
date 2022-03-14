import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovilComponent } from './components/movil/movil.component';
import { NavBarComponent } from './components/navBar/navBar.component';
import { LogGuard } from './guards/log.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path:'moviles',
    component:MovilComponent,
    canActivate:[LogGuard]
  },{path:'**',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
