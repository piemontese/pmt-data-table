import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PmtBaseDataTableComponent } from 'pmt-data-table';
import { PmtDialogService } from 'pmt-dialog';
import { PmtDataTableDetailService } from 'pmt-data-table';
import { PmtDataSourceService } from 'pmt-data-table';

// import { PmtDataTableDirective } from 'pmt-data-table';

@Component({
  selector: 'app-data-table',
  template: `<div libPmtDataTable></div>`,
//  templateUrl: './data-table.component.html',
//  styleUrls: ['./data-table.component.scss'],
  providers:  [ PmtDataTableDetailService, PmtDataSourceService ]
})
export class DataTableComponent extends PmtBaseDataTableComponent implements OnInit {

  constructor(public http: HttpClient,
              public dialogService: PmtDialogService,
              public dataTableDetailService: PmtDataTableDetailService,
              public dataSourceService: PmtDataSourceService) {
    super(http, dialogService, dataTableDetailService, dataSourceService);
  }

  public refresh() {
    super.refresh();
  }


  ngOnInit() {
  }

}
