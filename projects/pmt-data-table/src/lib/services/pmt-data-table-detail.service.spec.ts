import { TestBed, inject } from '@angular/core/testing';

import { PmtDataTableDetailService } from './pmt-data-table-detail.service';

describe('PmtDataTableDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmtDataTableDetailService]
    });
  });

  it('should be created', inject([PmtDataTableDetailService], (service: PmtDataTableDetailService) => {
    expect(service).toBeTruthy();
  }));
});
