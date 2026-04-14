import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';
import { LibrosService } from '../../shared/services/libros.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaLibroComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  servicioLibros = inject(LibrosService);

  get libros() {
    return this.servicioLibros.todosLibros();
  }
}