import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  // Categorías simuladas (luego vendrán de la base de datos)
  categories = [
    'Fantasía',
    'Ciencia Ficción',
    'Novela Negra',
    'Romántica',
    'Histórica',
    'Desarrollo Web',
  ];
}
