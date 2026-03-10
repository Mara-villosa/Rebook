import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})


export class LogIn {
  constructor(private router: Router) {}

  email: string = '';
  password: string = '';
  error: boolean = false;

  login() {
  const user = { email: this.email };
  localStorage.setItem('user', JSON.stringify(user));
  this.router.navigate(['/perfil']); 
}

}
