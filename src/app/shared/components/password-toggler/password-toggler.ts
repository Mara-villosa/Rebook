import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-toggler',
  imports: [],
  templateUrl: './password-toggler.html',
  styleUrl: './password-toggler.scss',
})
export class PasswordToggler {
  @Output() toggleVisibility: EventEmitter<boolean> = new EventEmitter();

  visible: boolean = false;

  toggle() {
    this.visible = !this.visible;
    this.toggleVisibility.emit(this.visible);
  }
}
