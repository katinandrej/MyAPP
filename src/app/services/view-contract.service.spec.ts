import { TestBed, inject } from '@angular/core/testing';

import { ViewContractService } from './view-contract.service';

describe('ViewContractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewContractService]
    });
  });

  it('should be created', inject([ViewContractService], (service: ViewContractService) => {
    expect(service).toBeTruthy();
  }));
});
