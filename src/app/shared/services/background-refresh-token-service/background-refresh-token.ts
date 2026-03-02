import { inject, Injectable } from '@angular/core';
import { interval, Subscription, tap } from 'rxjs';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
/**
 * Comprueba cada BACKGROUND_REFRESH_TOKEN_INTERVAL ms la validez de los tokens
 * y si se necesita refrescar el access token
 */
export class BackgroundRefreshToken {
  #auth = inject(AuthService);

  //Comprueba cada minuto la validez y expiración de los tokens
  private BACKGROUND_REFRESH_TOKEN_INTERVAL: number = 1000;

  //Observable que empite cada BACKGROUND_REFRESH_TOKEN_INTERVAL ms y ejecuta la función checkTokens() de Auth Service
  private interval = interval(this.BACKGROUND_REFRESH_TOKEN_INTERVAL).pipe(
    tap(() => this.#auth.checkTokens()),
  );

  private subscription!: Subscription;

  //Suscipción al observable para que compience a emitir
  start() {
    this.subscription = this.interval.subscribe();
  }

  //Cancelar la suscipción al intervalo para que deje de emitir
  stop() {
    this.subscription.unsubscribe();
  }

  //Al destruirse el componente se cancela la suscripción
  ngOnDestroy(): void {
    this.stop();
  }
}
