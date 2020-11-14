import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'' , pathMatch:'full', redirectTo:'login'},
  { path:'login' , component: LoginComponent },
  { path:'registro' , component: RegistroComponent },
  { path:'home' , component: HomeComponent , canActivate: [AuthGuard] },
  { path:'**' , pathMatch:'full', redirectTo:'login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
