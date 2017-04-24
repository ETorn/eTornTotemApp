import { TestBed, inject } from '@angular/core/testing';

import { CaesarService } from './caesar.service';

describe('CaesarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaesarService]
    });
  });

  it('should ...', inject([CaesarService], (service: CaesarService) => {
    expect(service).toBeTruthy();
  }));
});
