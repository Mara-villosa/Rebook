import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { MisPedidos } from './mis-pedidos';

describe('Mis Pedidos', () => {
  let component: MisPedidos;
  let fixture: ComponentFixture<MisPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPedidos],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(MisPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
