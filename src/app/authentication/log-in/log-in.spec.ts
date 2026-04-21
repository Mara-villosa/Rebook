import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { LogIn } from './log-in';

describe('LogIn', () => {
  let component: LogIn;
  let fixture: ComponentFixture<LogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogIn],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LogIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
