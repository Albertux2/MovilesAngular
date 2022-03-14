/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterReactiveService } from './RegisterReactive.service';

describe('Service: RegisterReactive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterReactiveService]
    });
  });

  it('should ...', inject([RegisterReactiveService], (service: RegisterReactiveService) => {
    expect(service).toBeTruthy();
  }));
});
