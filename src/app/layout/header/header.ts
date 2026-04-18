import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserData } from '../../shared/interfaces/Storage/UserData';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { UserService } from '../../shared/services/user-service/user-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  // 🔥 AHORA ES REACTIVO REAL
  isAuthenticated = this.authService.authState;

  currentUser = signal<UserData | null>(
    this.userService.getLocalUserData(),
  );

  isMenuOpen = signal<boolean>(false);
  isCategoriesOpen = signal<boolean>(false);
  isAccountOpen = signal<boolean>(false);
  isPanelFavoritosOpen = signal<boolean>(false);

  constructor(public favoritosService: FavoritosService) {}

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  toggleCategories(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isCategoriesOpen.update(v => !v);
    this.isAccountOpen.set(false);
  }

  toggleAccount(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isAccountOpen.update(v => !v);
    this.isCategoriesOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.isAccountOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isCategoriesOpen.set(false);
      this.isAccountOpen.set(false);
    }
  }

  togglePanelFavoritos(): void {
    this.isPanelFavoritosOpen.update(v => !v);
  }

  cerrarPanelFavoritos(): void {
    this.isPanelFavoritosOpen.set(false);
  }
}
