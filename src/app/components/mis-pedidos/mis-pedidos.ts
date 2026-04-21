import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/services/auth-service/auth-service';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.scss',
})
export class MisPedidos implements OnInit {
  #authService = inject(AuthService);
  private http = inject(HttpClient);

  // ESTADO
  rentedBooks: any[] = [];
  purchasedBooks: any[] = [];

  errorMessage: string = '';
  loading: boolean = false;

  //INIT
  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.cargarPedidos();
  }

  // CARGAR PEDIDOS
  cargarPedidos(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http
      .get(`${environment.api.url}${environment.api.endpoints.private.getRentedFromUser}`)
      .subscribe({
        next: (res: any) => {
          // backend esperado:
          // { rented: [], bought: [] }

          this.rentedBooks = res?.rented ?? [];
          this.purchasedBooks = res?.bought ?? [];

          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al cargar los pedidos';
          this.loading = false;
        },
      });
  }

  // EXTENDER ALQUILER
  extenderAlquiler(book: any): void {
    this.http
      .post(`${environment.api.url}${environment.api.endpoints.private.extendRent}`, {
        book_id: book.id,
      })
      .subscribe({
        next: () => {
          alert('Alquiler extendido correctamente');
          this.cargarPedidos();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'No se pudo extender el alquiler';
        },
      });
  }

  // VOLVER A COMPRAR
  volverAComprar(book: any): void {
    this.http
      .post(`${environment.api.url}/buy`, {
        book_id: book.id,
      })
      .subscribe({
        next: () => {
          alert('Libro comprado de nuevo');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al recomprar el libro';
        },
      });
  }

  // ALQUILAR LIBRO
  alquilar(book: any): void {
    this.http
      .post(`${environment.api.url}${environment.api.endpoints.private.rentBook}`, {
        book_id: book.id,
      })
      .subscribe({
        next: () => {
          alert('Libro alquilado correctamente');
          this.cargarPedidos();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al alquilar el libro';
        },
      });
  }

  // UTILIDAD (si quieres estados)
  isEmpty(): boolean {
    return this.rentedBooks.length === 0 && this.purchasedBooks.length === 0;
  }
}
