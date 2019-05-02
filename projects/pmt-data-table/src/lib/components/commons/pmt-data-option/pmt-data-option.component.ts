import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValidateConnession } from '../../../validators/validators';

// import { MatTableDataSource } from '@angular/material';

import { PmtDataSourceService } from '../../../services/pmt-data-source.service';
import { PmtDialogService } from 'pmt-dialog';


export interface Option {
  key: string;
  name: string;
}

@Component({
  selector: 'lib-pmt-data-option',
  templateUrl: './pmt-data-option.component.html',
  styleUrls: ['./pmt-data-option.component.scss']
})
export class PmtDataOptionComponent implements OnInit {
  @Input() placeholder = '';
  @Input() _FUNCTION = 'Z_PMT_WRFC_TABLE';
  @Input() baseUrl = ''; // 'http://127.0.0.1:8001/sap/bc/webrfc';
  @Input() displayedColumns = [];
  @Input() displayedColumnsNames = [];
  @Input() sqlTable = '';
  @Input() sqlWhere = '';
  @Input() listWidth = '300';
  @Input() listLayout = 'row'; // table, row, column
  @Input() data:  Option[];
  callback = 'JSONP_CALLBACK';
  response: any;
  control = new FormControl();
  dataSource: Option[] = [];
  httpClient: HttpClient;
  dataSourceService= new PmtDataSourceService; // (this.httpClient);
  dataValues: Array<string>;
  jsonData = null;

  constructor() {}

  bind() {
    if ( this.sqlTable !== '' ) {
      this. dataSourceService.call( this.baseUrl,
                                    this.jsonData,
                                    true,
                                    'post',
                                    'jsonp',
                                    'application/json',
                                    true,
                                    'JSONP_CALLBACK',
                                    60000, // sets timeout to 60 seconds
                                    this.getResponse.bind(this),
                                    this.displayedColumns,
                                    this.displayedColumnsNames
        ) ;
    }
    this.dataValues = [];
    if ( this.data ) {
      for ( let i = 0; i < this.data.length; i++ ) {
        this.dataValues.push(this.data[i].key);
      }
    }
  }

  ngOnInit() {
      this.jsonData = {
        '_FUNCTION': this._FUNCTION,
        'callback': this.callback,
        'sap-client': '001',
        'sap-language': 'EN',
        'sap-user': 'developer',
        'sap-password': 'Ostrakon1!',
        'sqltable': this.sqlTable,
        'sqlwhere': this.sqlWhere
      };
/*
    if ( this.sqlTable !== '' ) {
      this. dataSourceService.call( this.baseUrl,
                                    this.jsonData,
                                    true,
                                    'post',
                                    'jsonp',
                                    'application/json',
                                    true,
                                    'JSONP_CALLBACK',
                                    60000, // sets timeout to 60 seconds
                                    this.getResponse.bind(this),
                                    this.displayedColumns,
                                    this.displayedColumnsNames
        ) ;
    }
    this.dataValues = [];
    if ( this.data ) {
      for ( let i = 0; i < this.data.length; i++ ) {
        this.dataValues.push(this.data[i].key);
      }
    }
*/
  }

  public getResponse = () => /*: Observable<any[]>*/ {
    this.response = this.dataSourceService.getResponse();

    if ( this.dataSourceService.getSuccess()  ) {
      //        so.progress = false;
      this.displayedColumnsNames = this.dataSourceService.getNode(this.sqlTable)['columnsNames'];
      this.dataSource = this.dataSourceService.getNode(this.sqlTable) ['data'];
      this.data = [];
      for ( let i =  0; i < this.dataSource.length; i++ ) {
        this.data.push({ 'key': '', 'name': '' });
        this.data[i].key = this.dataSource[i][this.displayedColumns[0]];
        this.data[i].name = this.dataSource[i][this.displayedColumns[1]];
      }
        //        so.progress = false;
 //       this.iconButtons.filter(item => item.icon === 'delete')[0].disabled = false;
    } else {
    //   this.dialogService.open(this.title,   // title
    //         this.dataSourceService.getError(),  // array of messages
    //         'message',   // dialog type
    //         'error',   // message type
    //         [
    //           {caption: 'Close', color: 'primary', close: true},
    //           //                           { caption: "Cancel", color: "warn", close: true }
    //         ]  // buttons
    //       );
   }
 //   this.progress = false;

   }

}
