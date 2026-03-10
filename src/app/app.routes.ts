import { Routes } from '@angular/router';
import { PageWithSidebarComponent } from './layout/page-with-sidebar/page-with-sidebar';
import { authGuard } from './shared/guards/auth-guard/auth-guard';

export const routes: Routes = [
  // SIN sidebar (Auth)
  { path: 'auth/login', loadComponent: () => import('./authentication/log-in/log-in').then(m => m.LogIn) },
  { path: 'auth/signup', loadComponent: () => import('./authentication/sign-up/sign-up').then(m => m.SignUp) },

  // CON sidebar (públicas y privadas)
  {
    path: '',
    component: PageWithSidebarComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      
      // (sin authGuard)
      { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
      
      // (con authGuard)
      { path: 'carrito', loadComponent: () => import('./carrito/carrito').then(m => m.Carrito), canActivate: [authGuard] },
      { path: 'perfil', loadComponent: () => import('./perfil/perfil').then(m => m.Perfil), canActivate: [authGuard] },
      { path: 'favoritos', loadComponent: () => import('./components/favorites/favorites').then(m => m.FavoritesComponent), canActivate: [authGuard] },
    ]
  },

  // Wildcard al final
  { path: '**', redirectTo: 'home' }
];