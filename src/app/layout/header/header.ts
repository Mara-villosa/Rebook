import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  isAuthenticated = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  
  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }
  
  toggleAuth(): void {
    this.isAuthenticated.update(value => !value);
  }
}