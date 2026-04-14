import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../shared/services/favorites';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  //Inyectamos el servicio para que el HTML pueda usarlo
  favoritesService = inject(FavoritesService);

  categories = [
    'Fantasía',
    'Ciencia Ficción',
    'Novela Negra',
    'Romántica',
    'Histórica',
    'Desarrollo Web',
  ];
}
