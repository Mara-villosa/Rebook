import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user-service';

describe('User Service', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
