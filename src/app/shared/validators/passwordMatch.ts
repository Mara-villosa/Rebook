import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Este validador se debe aplicar a nivel de formGroup, no de formControl
 * Comprueba si el campo de contraseña y el de confirmar contrseña tienen el mismo contenido.
 * Si no coinciden, añade al formGroup y al formControl de confirmar contraseña el error passwordMismatch
 * @param password nombre del formControl del campo contraseña
 * @param confirmPassword nombre del formControl del campo confirmar contraseña
 * @returns passwordMismatch | null
 */
export function passwordMatch(password: string, confirmPassword: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordControl = form.get(password);
    const confirmPasswordControl = form.get(confirmPassword);

    const passwordMatch = passwordControl?.value === confirmPasswordControl?.value;

    if (passwordMatch) {
      if (
        !confirmPasswordControl?.errors?.['required'] &&
        !confirmPasswordControl?.errors?.['minlength']
      ) {
        confirmPasswordControl?.setErrors(null);
      }
      return null;
    } else {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  };
}
