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
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  //INIT
  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) {
      this.cargarPedidos();
    }
  }

  // CARGAR PEDIDOS
  cargarPedidos(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http
      .get(`${environment.api.url}${environment.api.endpoints.private.getAllBooksFromUser}`)
      .subscribe({
        next: (res: any) => {
          console.log('RESPUESTA BACKEND:', res);

          this.rentedBooks = res?.rented ?? [];
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al cargar los libros alquilados';
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
          this.mostrarMensaje('Alquiler extendido correctamente');
          this.cargarPedidos();
        },
        error: () => {
          this.mostrarMensaje('❌ No se pudo extender el alquiler');
        },
      });
  }

  //DEVOLVER LIBRO
  devolverLibro(book: any): void {
    this.http
      .post(`${environment.api.url}${environment.api.endpoints.private.returnRentedBook}`, {
        book_id: book.id,
      })
      .subscribe({
        next: () => {
          this.mostrarMensaje('Libro devuelto correctamente');
          this.cargarPedidos();
        },
        error: () => {
          this.mostrarMensaje('❌ No se pudo devolver el libro');
        },
      });
  }

  mostrarMensaje(msg: string, type: 'error' | 'success' = 'success'): void {
    if (type === 'error') {
      this.errorMessage = msg;
    } else {
      this.successMessage = msg;
    }

    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 2500);
  }

  isEmpty(): boolean {
    return this.rentedBooks.length === 0;
  }
}
