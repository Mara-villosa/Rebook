import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../tienda/servicios/libros.service';
import { TarjetaLibroComponent } from '../tienda/componentes/tarjeta-libro/tarjeta-libro.component';

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