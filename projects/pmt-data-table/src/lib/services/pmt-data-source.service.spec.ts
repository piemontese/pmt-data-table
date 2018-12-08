import { TestBed, inject } from '@angular/core/testing';

import { PmtDataSourceService } from './pmt-data-source.service';

describe('DataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmtDataSourceService]
    });
  });

  it('should be created', inject([PmtDataSourceService], (service: PmtDataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
