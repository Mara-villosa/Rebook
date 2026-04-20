import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SignUp } from './authentication/sign-up/sign-up';
import { LogIn } from './authentication/log-in/log-in';
import { Carrito } from './components/carrito/carrito';
import { Perfil } from './perfil/perfil';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { MisPedidos } from './components/mis-pedidos/mis-pedidos';
import { authGuard } from './shared/guards/auth-guard/auth-guard';
import { CategoriaComponent } from './components/categoria/categoria';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth/login', component: LogIn },
  { path: 'auth/signup', component: SignUp },
  { path: 'home', component: Home },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'favoritos', component: FavoritosComponent, canActivate: [authGuard] },
  { path: 'mis-pedidos', component: MisPedidos, canActivate: [authGuard] },
  { path: 'categoria/:nombre', component: CategoriaComponent },
  { path: '**', redirectTo: 'home' }
];