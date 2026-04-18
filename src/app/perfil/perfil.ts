import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DeleteBookRequest,
  GetAllBooksFromUserResponse,
  UploadBookRequest,
} from '../shared/interfaces/HTTP/Books';
import { UpdateUserRequest } from '../shared/interfaces/HTTP/User';
import { BookService } from '../shared/services/book-service';
import { UserService } from '../shared/services/user-service/user-service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss'],
})
export class Perfil implements OnInit {
  private userService = inject(UserService);
  private bookService = inject(BookService);

  editMode = false;
  showPassword = false;

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  // USER
  message = '';
  loading = true;
  showCardFields = false;

  user = {
    photo: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    creditCard: {
      number: '',
      name: '',
      cvv: '',
    },
  };

  // BOOKS
  tab: 'uploads' | 'bought' | 'rented' = 'uploads';

  books = {
    uploads: [] as any[],
    bought: [] as any[],
    rented: [] as any[],
  };

  showBookModal = false;

  newBook: UploadBookRequest = {
    title: '',
    description: '',
    author: '',
    isbn: '',
    url: '',
    category: '',
    rent_price: 0,
    sell_price: 0,
  };

  // INIT
  ngOnInit() {
    this.cargarUsuario();
    this.cargarLibros();
  }

  // USER (BACKEND)
  cargarUsuario() {
    this.loading = true;

    const request: UpdateUserRequest = {
      name: '',
      lastname: '',
      oldPassword: '',
      newPassword: '',
      id_document: '',
      birthday: '',
      city: '',
      address: '',
      postal_code: '',
      phone: '',
      card_name: '',
      card_number: '',
      cvv: '',
    };

    this.userService.updateUser(request).subscribe({
      next: (data: any) => {
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.phone = data.phone;

        this.user.address = data.address;
        this.user.city = data.city;
        this.user.postalCode = data.postal_code;

        this.user.creditCard.name = data.card_name;
        this.user.creditCard.number = data.card_number;
        this.user.creditCard.cvv = data.cvv;

        this.loading = false;
      },

      error: () => {
        this.message = 'No se pudo cargar el usuario';
        this.loading = false;
      },
    });
  }

  validar(): boolean {
    if (!this.user.name) {
      this.message = 'Nombre obligatorio';
      return false;
    }

    if (this.showCardFields) {
      if (!/^\d{16}$/.test(this.user.creditCard.number)) {
        this.message = 'Tarjeta inválida';
        return false;
      }

      if (!/^\d{3}$/.test(this.user.creditCard.cvv)) {
        this.message = 'CVV inválido';
        return false;
      }
    }

    return true;
  }

  guardar() {
    if (this.showPassword) {
      if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        this.message = 'Completa los campos de contraseña';
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.message = 'Las contraseñas no coinciden';
        return;
      }
    }

    if (!this.validar()) return;

    const request: UpdateUserRequest = {
      name: this.user.name,
      lastname: '',
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      id_document: '',
      birthday: '',
      city: this.user.city,
      address: this.user.address,
      postal_code: this.user.postalCode,
      phone: this.user.phone,
      card_name: this.user.creditCard.name,
      card_number: this.user.creditCard.number,
      cvv: this.user.creditCard.cvv,
    };

    this.userService.updateUser(request).subscribe({
      next: () => {
        this.message = 'Perfil actualizado correctamente';

        this.editMode = false;
        this.showPassword = false;

        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },

      error: () => {
        this.message = 'Error al guardar';
      },
    });
  }

  // BOOKS
  cargarLibros() {
    this.bookService.getAllBooksFromUser().subscribe({
      next: (res: GetAllBooksFromUserResponse) => {
        this.books.uploads = res.uploads || [];
        this.books.bought = res.bought || [];
        this.books.rented = res.rented || [];
      },
      error: () => {
        this.message = 'Error cargando libros';
      },
    });
  }

  getBooks(tab: string) {
    return this.books[tab as keyof typeof this.books];
  }

  deleteBook(id: number) {
    const request: DeleteBookRequest = {
      book_id: id,
    };

    this.bookService.deleteBook(request).subscribe({
      next: () => this.cargarLibros(),
      error: () => (this.message = 'Error eliminando libro'),
    });
  }

  abrirModalLibro() {
    this.showBookModal = true;
  }

  cerrarModalLibro() {
    this.showBookModal = false;
  }

  crearLibro() {
    const request: UploadBookRequest = {
      title: this.newBook.title,
      description: this.newBook.description,
      author: this.newBook.author,
      isbn: this.newBook.isbn,
      url: this.newBook.url,
      category: this.newBook.category,
      rent_price: this.newBook.rent_price,
      sell_price: this.newBook.sell_price,
    };

    this.bookService.uploadBook(request).subscribe({
      next: () => {
        this.cargarLibros();
        this.cerrarModalLibro();

        this.newBook = {
          title: '',
          description: '',
          author: '',
          isbn: '',
          url: '',
          category: '',
          rent_price: 0,
          sell_price: 0,
        };
      },
      error: () => (this.message = 'Error creando libro'),
    });
  }
}
