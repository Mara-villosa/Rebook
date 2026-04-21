import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { PasswordToggler } from './password-toggler';

describe('Password Toggler', () => {
  let component: PasswordToggler;
  let fixture: ComponentFixture<PasswordToggler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordToggler],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordToggler);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
