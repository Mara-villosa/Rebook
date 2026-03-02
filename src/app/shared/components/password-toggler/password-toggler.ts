import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-toggler',
  imports: [],
  templateUrl: './password-toggler.html',
  styleUrl: './password-toggler.scss',
})
/**
 * Componente para colocar al lado de un input de contrasñea que permite ver u ocultar la contraseña.
 * En el componente donde se coloque este, se debe hace event binding de toggleVisibility y cambiar
 * el input type de password a text (ver componente Log In para ejemplo)
 */
export class PasswordToggler {
  @Output() toggleVisibility: EventEmitter<boolean> = new EventEmitter();

  visible: boolean = false;

  /**
   * Al pulsar el botón, se cambia el gráfico del ojo y se emite un evento para indicar
   * si la contraseña debería ser visible o no
   */
  toggle() {
    this.visible = !this.visible;
    this.toggleVisibility.emit(this.visible);
  }
}
