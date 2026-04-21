import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { TokenService } from './token-service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
