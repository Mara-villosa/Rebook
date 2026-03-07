import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss'],
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);
  //Accedemos directamente a la señal del servicio
  misFavoritos = this.favoritesService.favorites;
}
