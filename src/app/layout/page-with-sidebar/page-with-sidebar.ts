import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-page-with-sidebar',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './page-with-sidebar.html',
  styleUrl: './page-with-sidebar.scss'
})
export class PageWithSidebarComponent {}