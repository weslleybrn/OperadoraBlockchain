import { TestBed, inject } from '@angular/core/testing';

import { PrestadorService } from './prestador.service';

describe('PrestadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestadorService]
    });
  });

  it('should be created', inject([PrestadorService], (service: PrestadorService) => {
    expect(service).toBeTruthy();
  }));
});
