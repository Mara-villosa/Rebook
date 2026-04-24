import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../../shared/interfaces/cart-item';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { CarritoService } from '../../shared/services/carrito-service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss'],
})
export class Carrito implements OnInit {
  #authService = inject(AuthService);

  cartItems: CartItem[] = [];
  errorMessage = '';

  selectedItems: Set<string> = new Set();

  mostrarModal = false;
  mostrarAlerta = false;
  mensajeAlerta = '';

  numeroTarjeta = '';
  nombreTitular = '';
  fecha = '';
  cvv = '';
  guardarTarjeta = false;

  total = 0;

  errores = {
    numeroTarjeta: '',
    nombreTitular: '',
    fecha: '',
    cvv: '',
  };

  touched = {
    numeroTarjeta: false,
    nombreTitular: false,
    fecha: false,
    cvv: false,
  };

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.loadCart();
  }

  loadCart() {
    this.carritoService.getCart().subscribe({
      next: (res) => {
        console.log('CART RESPONSE:', res.books);
        this.cartItems = res.books.map((book: any) => ({
          id: book.id,
          titulo: book.title,
          autor: book.author,
          portada: book.url,
          price: book.in_cart_for_rent ? book.rentPrice : book.sellPrice,
          type: book.in_cart_for_rent ? 'rent' : 'buy',
          quantity: 1,
          rent_expiration_date: book.rent_expiration_date || '',
        }));

        this.calcularTotal();
      },
      error: () => {
        this.cartItems = [];
      },
    });
  }

  getItemsByType(type: string): CartItem[] {
    return this.cartItems.filter((i) => i.type === type);
  }

  toggleItem(item: CartItem) {
    const key = `${item.id}-${item.type}`;

    this.selectedItems.has(key) ? this.selectedItems.delete(key) : this.selectedItems.add(key);

    this.calcularTotal();
  }

  toggleAll(type: string, checked: boolean) {
    this.getItemsByType(type).forEach((item) => {
      const key = `${item.id}-${item.type}`;
      checked ? this.selectedItems.add(key) : this.selectedItems.delete(key);
    });

    this.calcularTotal();
  }

  isSelected(item: CartItem): boolean {
    return this.selectedItems.has(`${item.id}-${item.type}`);
  }

  calcularTotal() {
    this.total = this.cartItems
      .filter((i) => this.selectedItems.has(`${i.id}-${i.type}`))
      .reduce((acc, i) => acc + i.price * i.quantity, 0);
  }

  getSubtotalByType(type: string): number {
    return this.cartItems
      .filter((i) => i.type === type && this.selectedItems.has(`${i.id}-${i.type}`))
      .reduce((acc, i) => acc + i.price * i.quantity, 0);
  }

  remove(item: CartItem) {
    this.carritoService
      .removeFromCart({
        book_id: String(item.id),
      })
      .subscribe({
        next: () => this.loadCart(),
        error: () => this.mostrarMensaje('Error al eliminar del carrito'),
      });
  }

  // MODAL
  abrirModal() {
    if (!this.authService.isAuthenticated()) {
      this.mostrarMensaje('Debes iniciar sesión para finalizar compra');
      return;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  pagar() {
    this.marcarTodoTouched();
    this.validarCampos();

    // LIMPIA ERROR GENERAL
    this.errorMessage = '';

    if (
      this.errores.numeroTarjeta ||
      this.errores.nombreTitular ||
      this.errores.fecha ||
      this.errores.cvv
    ) {
      // ERROR NUEVO AÑADIDO
      this.errorMessage = 'Debes completar todos los campos de la tarjeta correctamente';

      this.mostrarMensaje('Revisa los datos de la tarjeta');
      return;
    }

    if (this.guardarTarjeta) {
      localStorage.setItem(
        'tarjeta',
        JSON.stringify({
          numero: this.numeroTarjeta,
          nombre: this.nombreTitular,
          fecha: this.fecha,
        }),
      );
    }

    this.carritoService.buyCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.selectedItems.clear();
        this.total = 0;
        this.mostrarModal = false;

        this.mostrarMensaje('Pago realizado correctamente');

        this.router.navigate(['/mis-pedidos']);
      },
      error: () => {
        this.mostrarMensaje('Error al procesar el pago');
      },
    });
  }

  // VALIDACIÓN
  marcarTouched(campo: 'numeroTarjeta' | 'nombreTitular' | 'fecha' | 'cvv') {
    this.touched[campo] = true;
    this.validarCampos();
  }

  marcarTodoTouched() {
    this.touched = {
      numeroTarjeta: true,
      nombreTitular: true,
      fecha: true,
      cvv: true,
    };
  }

  validarCampos() {
    this.errores = {
      numeroTarjeta: '',
      nombreTitular: '',
      fecha: '',
      cvv: '',
    };

    if (this.touched.numeroTarjeta || this.numeroTarjeta) {
      if (!this.numeroTarjeta) {
        this.errores.numeroTarjeta = 'Campo obligatorio';
      } else if (!/^\d+$/.test(this.numeroTarjeta)) {
        this.errores.numeroTarjeta = 'Solo números';
      } else if (!/^\d{16}$/.test(this.numeroTarjeta)) {
        this.errores.numeroTarjeta = 'Debe tener 16 números';
      }
    }

    if (this.touched.nombreTitular || this.nombreTitular) {
      if (!this.nombreTitular || this.nombreTitular.trim() === '') {
        this.errores.nombreTitular = 'Campo obligatorio';
      } else if (this.nombreTitular.trim().length < 3) {
        this.errores.nombreTitular = 'Nombre no válido';
      }
    }

    if (this.touched.fecha || this.fecha) {
      if (!this.fecha) {
        this.errores.fecha = 'Campo obligatorio';
      } else if (!/^\d{2}\/\d{2}$/.test(this.fecha)) {
        this.errores.fecha = 'Formato MM/AA inválido';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.fecha)) {
        this.errores.fecha = 'Mes inválido';
      }
    }

    if (this.touched.cvv || this.cvv) {
      if (!this.cvv) {
        this.errores.cvv = 'Campo obligatorio';
      } else if (!/^\d+$/.test(this.cvv)) {
        this.errores.cvv = 'Solo números';
      } else if (!/^\d{3}$/.test(this.cvv)) {
        this.errores.cvv = 'Debe tener 3 números';
      }
    }
  }

  // ALERTA
  mostrarMensaje(msg: string) {
    this.mensajeAlerta = msg;
    this.mostrarAlerta = true;

    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 2500);
  }

  isFormInvalid(): boolean {
    return !this.formValido();
  }

  formValido(): boolean {
    return (
      /^\d{16}$/.test(this.numeroTarjeta) &&
      this.nombreTitular?.trim().length >= 3 &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.fecha) &&
      /^\d{3}$/.test(this.cvv)
    );
  }
}
