import { Component, OnInit } from '@angular/core';

import { PmtBaseDataTableComponent } from '../commons/pmt-base-data-table/pmt-base-data-table.component';

@Component({
  selector: 'lib-pmt-data-table',
  templateUrl: './web-data-table.component.html',
  styleUrls: ['./web-data-table.component.css']
})
export class WebDataTableComponent extends PmtBaseDataTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
