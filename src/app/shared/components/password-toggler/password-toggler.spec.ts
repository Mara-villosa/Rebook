import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordToggler } from './password-toggler';

describe('PasswordToggler', () => {
  let component: PasswordToggler;
  let fixture: ComponentFixture<PasswordToggler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordToggler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordToggler);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
