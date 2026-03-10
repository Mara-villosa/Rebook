import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { mockBooks, mockCategories } from '../../shared/services/book-mock/book-mock';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  // Datos book-mock
  recentBooks = signal(mockBooks.slice(0, 5));
  categories = signal(mockCategories);
  
  // Estado del sidebar (menu hamburguesa en móvil)
  isSidebarOpen = signal<boolean>(false);
  
  // Búsqueda
  searchQuery = signal<string>('');
  
  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }
  
  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
  
  onSearch(): void {
    console.log('Buscando:', this.searchQuery());
    // Aquí irá la lógica de búsqueda real
  }
  
  formatPrice(price?: number): string {
    if (!price) return 'Consultar';
    return `${price.toFixed(2)}€`;
  }
  
  getConditionClass(condition: string): string {
    switch (condition) {
      case 'nuevo': return 'badge bg-success';
      case 'bueno': return 'badge bg-primary';
      case 'regular': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }
}