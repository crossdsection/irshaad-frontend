import { TestBed, inject } from '@angular/core/testing';

import { RightOverlayCommunicationService } from './right-overlay-communication.service';

describe('RightOverlayCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RightOverlayCommunicationService]
    });
  });

  it('should be created', inject([RightOverlayCommunicationService], (service: RightOverlayCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
