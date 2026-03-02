import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BackgroundRefreshToken } from '../shared/services/background-refresh-token-service/background-refresh-token';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  #backgroundRefreshToken = inject(BackgroundRefreshToken);

  ngOnInit(): void {
    //Mientras estamos en /home se comprueba la validez de los tokens de auth y si se necesitan refrescar
    this.#backgroundRefreshToken.start();
  }

  ngOnDestroy(): void {
    //Al salir de /home se detiene la comprobación de tokens
    this.#backgroundRefreshToken.stop();
  }
}
