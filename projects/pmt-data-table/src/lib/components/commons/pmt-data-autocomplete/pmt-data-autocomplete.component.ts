import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValidateConnession } from '../../../validators/validators';

// import { MatTableDataSource } from '@angular/material';

import { PmtDataSourceService } from '../../../services/pmt-data-source.service';
import { PmtDialogService } from 'pmt-dialog';
import { PmtDataTableService } from 'pmt-data-table/public_api';


export interface Autocomplete {
  key: string;
  name: string;
}

@Component({
  selector: 'lib-pmt-data-autocomplete',
  templateUrl: './pmt-data-autocomplete.component.html',
  styleUrls: ['./pmt-data-autocomplete.component.scss']
})
export class PmtDataAutocompleteComponent implements OnInit {
  @Input() placeholder = '';
  @Input() _FUNCTION = 'Z_PMT_WRFC_TABLE';
  @Input() baseUrl = '';  // 'http://127.0.0.1:8001/sap/bc/webrfc';
  @Input() displayedColumns = [];
  @Input() displayedColumnsNames = [];
  @Input() sqlTable = '';
  @Input() sqlWhere = '';
  @Input() listWidth = '300';
  @Input() listLayout = 'row'; // table, row, column
  data:  Autocomplete[]; /* = [{key: '1000', name: 'Milan'},
                           {key: '2000', name: 'Rome'},
                           {key: '3000', name: 'Naples'},
                           {key: '4000', name: 'Florence'},
                           {key: '5000', name: 'Turin'}]; */

  callback = 'JSONP_CALLBACK';
  response: any;
  control = new FormControl();
  dataSource: Autocomplete[] = [];
  httpClient: HttpClient;
  dataSourceService = new PmtDataSourceService; // (this.httpClient);
  filteredData: Observable<Autocomplete[]>;
  jsonData = null;
  subscription: Subscription;

  constructor(public dialogService: PmtDialogService) {
    if ( this.data ) {
      this.filteredData = this.control.valueChanges
        .pipe(
          startWith<string | Autocomplete>(''),
          map(value => typeof value === 'string' ? value : value.key),
          map(key => key ? this._filter(key) : this.data.slice())
        );
    }
  }

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

   if ( this.data ) {
    this.filteredData = this.control.valueChanges
        .pipe(
          startWith<string | Autocomplete>(''),
          map(value => typeof value === 'string' ? value : value.key),
          map(key => key ? this._filter(key) : this.data.slice())
        );
    }
/*
    this.subscription = this.dataSourceService.callObservable( this.baseUrl,
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
    ).subscribe(response =>  {
 //         if (response) {
   debugger;
            this.response = response;
          // } else {
          //   // clear messages when empty message received
          //   this.messages = [];
          // }
    });
*/
  }

  displayFn(data?: Autocomplete): string | undefined {
    return data ? data.key : undefined;
  }

  private _filter(value: string): Autocomplete[] {
    const filterValue = value.toLowerCase();
    // tslint:disable-next-line:max-line-length
    const filter = this.data.filter(data => data.key.toLowerCase().indexOf(filterValue) >= 0 || data.name.toLowerCase().indexOf(filterValue) >= 0);
    return filter;
  }

 public getResponse = (dataSource: PmtDataSourceService) => /*: Observable<any[]>*/ {
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
      if ( this.data ) {
        this.filteredData = this.control.valueChanges
          .pipe(
            startWith<string | Autocomplete>(''),
            map(value => typeof value === 'string' ? value : value.key),
            map(key => key ? this._filter(key) : this.data.slice())
          );
        }
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
