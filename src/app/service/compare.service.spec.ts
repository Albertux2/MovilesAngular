/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompareServiceService } from './compareService.service';

describe('Service: CompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompareServiceService]
    });
  });

  it('should ...', inject([CompareServiceService], (service: CompareServiceService) => {
    expect(service).toBeTruthy();
  }));
});
