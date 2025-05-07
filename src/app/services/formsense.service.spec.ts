import { TestBed } from '@angular/core/testing';

import { FormsenseService } from './formsense.service';

describe('FormsenseService', () => {
  let service: FormsenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
