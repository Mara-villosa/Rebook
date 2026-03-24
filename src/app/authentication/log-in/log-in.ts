import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { PasswordToggler } from '../../shared/components/password-toggler/password-toggler';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { BackgroundRefreshToken } from '../../shared/services/background-refresh-token-service/background-refresh-token';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, PasswordToggler],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn implements OnInit {
  #auth = inject(AuthService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #backgroundRefreshToken = inject(BackgroundRefreshToken);

  private emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  form = this.#formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern(this.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string = '';
  validating: boolean = false;
  passwordVisible: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    this.#backgroundRefreshToken.stop();
    this.validating = true;

    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.#auth
      .login(email, password)
      .pipe(finalize(() => (this.validating = false)))
      .subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.#backgroundRefreshToken.start();
          this.#router.navigate(['/perfil']);
        },
        error: (err) => {
          console.log(err);
          this.handleError(err);
          this.form.get('password')?.reset();
        },
      });
  }

  togglePasswordVisibility(visible: boolean) {
    this.passwordVisible = visible;
  }

  handleError(error: HttpErrorResponse) {
    const errorData = error.error;

    if (errorData.status === 0) {
      this.errorMessage = 'Error al conectar con el servidor. Inténtalo más tarde';
    } else {
      this.errorMessage = 'Fallo al iniciar sesión';
    }
  }
}
