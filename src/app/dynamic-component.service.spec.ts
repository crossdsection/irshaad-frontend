import { TestBed, inject } from '@angular/core/testing';

import { DynamicComponentService } from './dynamic-component.service';

describe('DynamicComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicComponentService]
    });
  });

  it('should be created', inject([DynamicComponentService], (service: DynamicComponentService) => {
    expect(service).toBeTruthy();
  }));
});
