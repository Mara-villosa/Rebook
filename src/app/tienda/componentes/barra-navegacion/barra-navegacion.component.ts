import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritosService } from '../../servicios/favoritos.service';

// Componente de la barra de navegación superior
@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss'
})
export class BarraNavegacionComponent {
  // Servicio para obtener el número de favoritos
  servicioFavoritos = inject(FavoritosService);
}
