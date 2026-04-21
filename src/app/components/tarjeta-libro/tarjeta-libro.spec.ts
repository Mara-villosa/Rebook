import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { TarjetaLibroComponent } from './tarjeta-libro.component';

describe('Tarjeta Libro Component', () => {
  let component: TarjetaLibroComponent;
  let fixture: ComponentFixture<TarjetaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaLibroComponent],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
