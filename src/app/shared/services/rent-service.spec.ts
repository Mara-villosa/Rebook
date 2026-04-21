import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { RentService } from './rent-service';

describe('Rent Service', () => {
  let service: RentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(RentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
