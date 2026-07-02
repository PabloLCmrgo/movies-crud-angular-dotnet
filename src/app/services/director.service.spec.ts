import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DirectorService } from './director.service';

describe('DirectorService', () => {
  let service: DirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
