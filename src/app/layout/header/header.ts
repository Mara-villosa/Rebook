import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { UserService } from '../../shared/services/user-service/user-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  isAuthenticated = this.authService.authState;
  currentUser: any = null;

  isMenuOpen = false;
  isCategoriesOpen = false;
  isAccountOpen = false;
  isPanelFavoritosOpen = false;
  isDrawerCategoriesOpen = false;

  favoritos: any[] = [];

  constructor(public favoritosService: FavoritosService) {
    effect(() => {
      const auth = this.isAuthenticated();

      if (auth) {
        this.loadUser();
        this.loadFavoritos();
      } else {
        this.currentUser = null;
        this.favoritos = [];
      }
    });
  }

  loadUser(): void {
    this.userService.getUserData().subscribe({
      next: (user) => (this.currentUser = user),
      error: () => (this.currentUser = null),
    });
  }

  loadFavoritos(): void {
    this.favoritosService.getFavs().subscribe({
      next: (res: any) => {
        this.favoritos = res.favourites ?? [];
      },
      error: () => {
        this.favoritos = [];
      },
    });
  }

  recargarFavoritos(): void {
    this.loadFavoritos();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.isDrawerCategoriesOpen = false;
    }
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

    this.currentUser = null;
    this.isAccountOpen = false;
  }

  togglePanelFavoritos(): void {
    this.isPanelFavoritosOpen = !this.isPanelFavoritosOpen;

    if (this.isPanelFavoritosOpen) {
      this.loadFavoritos();
    }
  }

  toggleDrawerCategories(): void {
    this.isDrawerCategoriesOpen = !this.isDrawerCategoriesOpen;
  }

  cerrarPanelFavoritos(): void {
    this.isPanelFavoritosOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.isCategoriesOpen = false;
      this.isAccountOpen = false;
    }
  }
}
