import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { BackgroundRefreshToken } from './background-refresh-token';

describe('BackgroundRefreshToken', () => {
  let service: BackgroundRefreshToken;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(BackgroundRefreshToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
