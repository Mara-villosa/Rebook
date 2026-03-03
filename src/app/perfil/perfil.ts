import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})

export class Perfil {
  user = {
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      postalCode: ''
    },
    phone: '',
    password: '',
    notifications: false, // recibir notificaciones

    // campos opcionales
    creditCard: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    } 
  };

  message = '';

  guardar() {
    // Aquí normalmente iría la llamada al servicio para guardar los datos
    this.message = 'Datos actualizados correctamente';
  }
}
