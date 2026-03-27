import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss'],
})
export class Perfil {
  user = {
    photo: '', 
    name: '',
    email: '',
    phone: '',
    password: '',
    address: { street: '', city: '', postalCode: '' },
    notifications: false,
    creditCard: { number: '', name: '', expiry: '', cvv: '' },
  };

  message = '';
  showCardFields = false;

  // Campos editables control
  editFields: any = {
    name: false,
    email: false,
    phone: false,
    password: false,
    street: false,
    city: false,
    postalCode: false,
    cardNumber: false,
    cardName: false,
    cardExpiry: false,
    cardCvv: false,
  };

  toggleEdit(field: string) {
    this.editFields[field] = !this.editFields[field];
  }

  cambiarFoto() {
    // lógica para subir o cambiar foto
    alert('Función de cambiar foto aquí');
  }

  guardar() {
    this.message = 'Datos actualizados correctamente';
    // normalmente aquí iría tu servicio para guardar en backend
  }
}