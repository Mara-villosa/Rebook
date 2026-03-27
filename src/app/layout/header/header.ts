import { Component, signal, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { UserService } from '../../shared/services/user-service/user-service';
import { UserData } from '../../shared/interfaces/Storage/UserData';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritosService } from '../../tienda/servicios/favoritos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  // Inyección de los servicios
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  // Hay que conectar esto con AuthService -- Ya conectado!
  isAuthenticated = signal<boolean>(this.authService.isAuthenticated());
  currentUser = signal<UserData | null>(this.userService.getLocalUserData());

  // Estado del menú móvil y dropdowns
  isMenuOpen = signal<boolean>(false);
  isCategoriesOpen = signal<boolean>(false);
  isAccountOpen = signal<boolean>(false);

  isPanelFavoritosOpen = signal<boolean>(false);

  constructor(public favoritosService: FavoritosService) {}

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  toggleAuth(): void {
    this.isAuthenticated.update(value => !value);
  }

  // Toggle categorías
  toggleCategories(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isCategoriesOpen.update(value => !value);
    this.isAccountOpen.set(false);
  }

  // Toggle cuenta
  toggleAccount(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isAccountOpen.update(value => !value);
    this.isCategoriesOpen.set(false);  // Cerrar otros dropdowns
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.isAccountOpen.set(false);
  }

  // Cerrar dropdowns al hacer clic fuera
  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isCategoriesOpen.set(false);
      this.isAccountOpen.set(false);
    }
  }

  togglePanelFavoritos(): void {
    this.isPanelFavoritosOpen.update(value => !value);
  }

  cerrarPanelFavoritos(): void {
    this.isPanelFavoritosOpen.set(false);
  }
}
