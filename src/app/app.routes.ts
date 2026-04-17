import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { authGuard } from './shared/guards/auth-guard/auth-guard';
import { SignUp } from './authentication/sign-up/sign-up';
import { LogIn } from './authentication/log-in/log-in';
import { Carrito } from './components/carrito/carrito';
import { Perfil } from './perfil/perfil';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { MisPedidos } from './components/mis-pedidos/mis-pedidos';


export const routes: Routes = [
  { path: 'auth/login', component: LogIn },
  { path: 'auth/signup', component: SignUp },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'mis-pedidos', component: MisPedidos},
  { path: '**', redirectTo: 'home' }
];
