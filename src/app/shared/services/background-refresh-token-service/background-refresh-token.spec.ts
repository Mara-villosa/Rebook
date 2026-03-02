import { TestBed } from '@angular/core/testing';

import { BackgroundRefreshToken } from './background-refresh-token';

describe('BackgroundRefreshToken', () => {
  let service: BackgroundRefreshToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundRefreshToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
