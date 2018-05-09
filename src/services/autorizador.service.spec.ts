import { TestBed, inject } from '@angular/core/testing';

import { AutorizadorService } from './autorizador.service';

describe('AutorizadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorizadorService]
    });
  });

  it('should be created', inject([AutorizadorService], (service: AutorizadorService) => {
    expect(service).toBeTruthy();
  }));
});
