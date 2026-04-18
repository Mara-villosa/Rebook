import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UpdateUserRequest } from '../../shared/interfaces/HTTP/User';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { UserService } from '../../shared/services/user-service/user-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  isAuthenticated = false;
  currentUser: any = null;

  isMenuOpen = false;
  isCategoriesOpen = false;
  isAccountOpen = false;
  isPanelFavoritosOpen = false;

  favoritos: any[] = [];

  constructor(public favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.loadUser();
      this.loadFavoritos();
    }
  }

  loadUser(): void {
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
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.currentUser = null;
      },
    });
  }

  loadFavoritos(): void {
    this.favoritosService.getFavs().subscribe({
      next: (res: any) => {
        this.favoritos = res.favs || res || [];
      },
      error: () => {
        this.favoritos = [];
      },
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCategories(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.isCategoriesOpen = !this.isCategoriesOpen;
    this.isAccountOpen = false;
  }

  toggleAccount(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.isAccountOpen = !this.isAccountOpen;
    this.isCategoriesOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.currentUser = null;
    this.isAccountOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.isCategoriesOpen = false;
      this.isAccountOpen = false;
    }
  }

  togglePanelFavoritos(): void {
    this.isPanelFavoritosOpen = !this.isPanelFavoritosOpen;
  }

  cerrarPanelFavoritos(): void {
    this.isPanelFavoritosOpen = false;
  }
}
