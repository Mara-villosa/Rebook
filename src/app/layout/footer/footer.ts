import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  footerLinks = {
    comprar: [
      { label: 'Comprar libros', route: '/comprar' },
      { label: 'Alquilar libros', route: '/alquilar' },
      { label: 'Ofertas', route: '/ofertas' },
      { label: 'Novedades', route: '/novedades' }
    ],
    vender: [
      { label: 'Vender un libro', route: '/vender' },
      { label: 'Cómo funciona', route: '/ayuda/vender' },
      { label: 'Precios y comisiones', route: '/ayuda/precios' }
    ],
    ayuda: [
      { label: 'Centro de ayuda', route: '/ayuda' },
      { label: 'Contacto', route: '/contacto' },
      { label: 'Envíos y devoluciones', route: '/ayuda/envios' },
      { label: 'Preguntas frecuentes', route: '/ayuda/faq' }
    ],
    legal: [
      { label: 'Términos y condiciones', route: '/legal/terminos' },
      { label: 'Política de privacidad', route: '/legal/privacidad' },
      { label: 'Política de cookies', route: '/legal/cookies' }
    ]
  };
}