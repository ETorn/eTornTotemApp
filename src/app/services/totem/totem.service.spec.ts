import { TestBed, inject } from '@angular/core/testing';

import { TotemService } from './totem.service';

describe('TotemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotemService]
    });
  });

  it('should ...', inject([TotemService], (service: TotemService) => {
    expect(service).toBeTruthy();
  }));
});
