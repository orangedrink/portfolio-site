import { TestBed, inject } from '@angular/core/testing';

import { ChicagoOpenDataService } from './chicago-open-data.service';

describe('ChicagoOpenDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChicagoOpenDataService]
    });
  });

  it('should be created', inject([ChicagoOpenDataService], (service: ChicagoOpenDataService) => {
    expect(service).toBeTruthy();
  }));
});
