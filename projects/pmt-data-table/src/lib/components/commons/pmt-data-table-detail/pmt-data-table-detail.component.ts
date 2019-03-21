import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';

export interface Button {
  caption: string;
  color: string;
  close: boolean;
}

@Component({
  selector: 'lib-pmt-data-table-detail',
  templateUrl: './pmt-data-table-detail.component.html',
  styleUrls: ['./pmt-data-table-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PmtDataTableDetailComponent implements OnInit {
  @Input() title = 'Title';
  @Input() mode = 'view';   // view, change
  @Input() fields: any[] = [];

  public buttons: Button[];
  public response: String = '';
  public routeTo: String = '';
  public callback = null;  // : Function = null;
  public caller: any = null;

  constructor() {}

  onClick( response: string ) {
    this.response = response;
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if ( this.callback ) {
      debugger;
      this.callback(this.response, this.fields, this.caller);
    }
  }

  }
