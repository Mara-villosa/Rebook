import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { finalize, interval, take } from 'rxjs';
import { PasswordToggler } from '../../shared/components/password-toggler/password-toggler';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { passwordMatch } from '../../shared/validators/passwordMatch';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, PasswordToggler],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  #auth = inject(AuthService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);

  private emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  form = this.#formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern(this.emailPattern)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: passwordMatch('password', 'confirmPassword'),
    },
  );

  errorMessage: string = '';
  successMessage: string = '';
  redirecting: boolean = false;
  validating: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  onSubmit() {
    this.validating = true;

    const { name, email, password } = this.form.value;
    if (!name || !email || !password) return;

    this.#auth
      .signup(name, email, password)
      .pipe(finalize(() => (this.validating = false)))
      .subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.successMessage = 'Cuenta creada con éxito';
          this.redirecting = true;
          interval(1500)
            .pipe(take(1))
            .subscribe({
              next: () => {
                this.redirecting = false;
                this.#router.navigate(['/auth/login']);
              },
            });
        },
        error: (err) => {
          this.successMessage = '';
          console.log(err);
          this.handleError(err);
          this.form.get('password')?.reset();
          this.form.get('confirmPassword')?.reset();
        },
      });
  }

  togglePasswordVisibility(visible: boolean) {
    this.passwordVisible = visible;
  }

  toggleConfirmPasswordVisibility(visible: boolean) {
    this.confirmPasswordVisible = visible;
  }

  handleError(error: HttpErrorResponse) {
    const errorData = error.error;

    if (errorData.status === 0) {
      this.errorMessage = 'Error al conectar con el servidor. Inténtalo más tarde';
    } else {
      this.errorMessage = 'Correo inválido';
    }
  }
}
