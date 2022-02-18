/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovilService } from './movil.service';

describe('Service: Movil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovilService]
    });
  });

  it('should ...', inject([MovilService], (service: MovilService) => {
    expect(service).toBeTruthy();
  }));
});
