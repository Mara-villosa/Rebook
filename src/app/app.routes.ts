import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard/auth-guard';

export const routes: Routes = [
  // Rutas públicas
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
  
  // Auth
  { path: 'auth/login', loadComponent: () => import('./authentication/log-in/log-in').then(m => m.LogIn) },
  { path: 'auth/signup', loadComponent: () => import('./authentication/sign-up/sign-up').then(m => m.SignUp) },
  
  // Rutas privadas
  { path: 'carrito', loadComponent: () => import('./carrito/carrito').then(m => m.Carrito), canActivate: [authGuard] },
  { path: 'perfil', loadComponent: () => import('./perfil/perfil').then(m => m.Perfil), canActivate: [authGuard] },
  { path: 'favoritos', loadComponent: () => import('./components/favorites/favorites').then(m => m.FavoritesComponent), canActivate: [authGuard] },


  { path: '**', redirectTo: 'home' }
];
