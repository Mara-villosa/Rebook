import { Routes } from '@angular/router';
import { ListaLibrosComponent } from './componentes/lista-libros/lista-libros.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';

// Rutas del módulo de tienda
export const tiendaRoutes: Routes = [
  { path: '',          component: ListaLibrosComponent }, // Página principal: tienda
  { path: 'favoritos', component: FavoritosComponent  }, // Página de favoritos
];
