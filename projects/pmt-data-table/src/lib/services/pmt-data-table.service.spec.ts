import { TestBed, inject } from '@angular/core/testing';

import { PmtDataTableService } from './pmt-data-table.service';

describe('PmtDataTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmtDataTableService]
    });
  });

  it('should be created', inject([PmtDataTableService], (service: PmtDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
