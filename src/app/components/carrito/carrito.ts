import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart, CartItem } from '../../shared/services/cart';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user-service/user-service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})
export class Carrito implements OnInit {

  cartItems: CartItem[] = [];
  errorMessage = '';

  selectedItems: Set<string> = new Set();

  mostrarModal = false;
  usuarioLogueado = false;
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
    cvv: ''
  };

  touched = {
    numeroTarjeta: false,
    nombreTitular: false,
    fecha: false,
    cvv: false
  };

  constructor(
    private cartService: Cart,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.usuarioLogueado = !!this.userService.getLocalUserData();
  }

  // =========================
  // CARRITO
  // =========================

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calcularTotal();
  }

  getItemsByType(type: string): CartItem[] {
    return this.cartItems.filter(i => i.type === type);
  }

  toggleItem(item: CartItem) {
    const key = `${item.id}-${item.type}`;

    this.selectedItems.has(key)
      ? this.selectedItems.delete(key)
      : this.selectedItems.add(key);

    this.calcularTotal();
  }

  toggleAll(type: string, checked: boolean) {
    this.getItemsByType(type).forEach(item => {
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
      .filter(i => this.selectedItems.has(`${i.id}-${i.type}`))
      .reduce((acc, i) => acc + (i.price * i.quantity), 0);
  }

  getSubtotalByType(type: string): number {
    return this.cartItems
      .filter(i => i.type === type && this.selectedItems.has(`${i.id}-${i.type}`))
      .reduce((acc, i) => acc + (i.price * i.quantity), 0);
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.type);
    this.loadCart();
  }

  // =========================
  // MODAL
  // =========================

  abrirModal() {
    if (!this.usuarioLogueado) {
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

    if (
      this.errores.numeroTarjeta ||
      this.errores.nombreTitular ||
      this.errores.fecha ||
      this.errores.cvv
    ) {
      this.mostrarMensaje('Revisa los datos de la tarjeta');
      return;
    }

    if (this.guardarTarjeta) {
      localStorage.setItem('tarjeta', JSON.stringify({
        numero: this.numeroTarjeta,
        nombre: this.nombreTitular,
        fecha: this.fecha
      }));
    }

    this.cartService.clearCart();
    this.cartItems = [];
    this.mostrarModal = false;

    this.mostrarMensaje('Pago realizado correctamente');
  }

  // =========================
  // TOUCHED (BLUR)
  // =========================

  marcarTouched(campo: 'numeroTarjeta' | 'nombreTitular' | 'fecha' | 'cvv') {
    this.touched[campo] = true;
    this.validarCampos();
  }

  marcarTodoTouched() {
    this.touched = {
      numeroTarjeta: true,
      nombreTitular: true,
      fecha: true,
      cvv: true
    };
  }

  // =========================
  // VALIDACIÓN
  // =========================

  validarCampos() {

    this.errores = {
      numeroTarjeta: '',
      nombreTitular: '',
      fecha: '',
      cvv: ''
    };

    // TARJETA
    if (this.touched.numeroTarjeta || this.numeroTarjeta) {

      if (!this.numeroTarjeta) {
        this.errores.numeroTarjeta = 'Campo obligatorio';
      } else if (!/^\d+$/.test(this.numeroTarjeta)) {
        this.errores.numeroTarjeta = 'Solo se permiten números';
      } else if (!/^\d{16}$/.test(this.numeroTarjeta)) {
        this.errores.numeroTarjeta = 'Debe tener 16 números';
      }
    }

    // NOMBRE
    if (this.touched.nombreTitular || this.nombreTitular) {

      if (!this.nombreTitular || this.nombreTitular.trim() === '') {
        this.errores.nombreTitular = 'Campo obligatorio';
      } else if (this.nombreTitular.trim().length < 3) {
        this.errores.nombreTitular = 'Nombre no válido';
      }
    }

    // FECHA
    if (this.touched.fecha || this.fecha) {

      if (!this.fecha) {
        this.errores.fecha = 'Campo obligatorio';
      } else if (!/^\d{2}\/\d{2}$/.test(this.fecha)) {
        this.errores.fecha = 'Formato MM/AA inválido';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.fecha)) {
        this.errores.fecha = 'Mes inválido';
      }
    }

    // CVV
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

  // =========================
  // ALERTA
  // =========================

  mostrarMensaje(msg: string) {
    this.mensajeAlerta = msg;
    this.mostrarAlerta = true;

    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 2500);
  }

  // =========================
  // VALID FORM
  // =========================

  formValido(): boolean {
    return (
      /^\d{16}$/.test(this.numeroTarjeta) &&
      this.nombreTitular?.trim().length >= 3 &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.fecha) &&
      /^\d{3}$/.test(this.cvv)
    );
  }
}