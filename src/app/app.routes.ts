import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './shared/guards/auth-guard/auth-guard';
import { SignUp } from './authentication/sign-up/sign-up';
import { LogIn } from './authentication/log-in/log-in';
import { Carrito } from './carrito/carrito';
import { Perfil } from './perfil/perfil';
import { FavoritesComponent } from './components/favorites/favorites';

export const routes: Routes = [
  { path: 'auth/login', component: LogIn },
  { path: 'auth/signup', component: SignUp },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil },
  { path: 'favoritos', component: FavoritesComponent },
];
