import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
// import { Observable } from 'rxjs';

// import * as jQuery from 'jquery';

import { PmtDataTableDetailService } from '../services/pmt-data-table-detail.service';
import { PmtDataSourceService } from '../services/pmt-data-source.service';
import { DateAdapter } from '@angular/material';


import { PmtDialogService } from 'pmt-dialog';

import { Fields } from './commons/pmt-base-data-table/pmt-base-data-table.component';
import { Buttons } from './commons/pmt-base-data-table/pmt-base-data-table.component';
import { IconButtons } from './commons/pmt-base-data-table/pmt-base-data-table.component';

import { newRowsAnimation } from '../animations/table-row-animation';

// import * as packageJson from '../../package.json';
// const version = packageJson.default.version;

/*
export interface Fields {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  valueFrom: string;
  valueTo: string;
  color: string;
  range: string;
  isTable: string;
  bind: string;
}
*/
/*
export class Fields {
  name = '';
  type = '';
  placeholder = '';
  value = '';
  nameFrom = '';
  nameTo = '';
  valueFrom = '';
  valueTo = '';
  color = '';
  range = 'false';
  isTable = 'false';
  row = '0';
  bind = '';  // method to get data
}*/
/*
export interface Buttons {
  caption: string;
  icon: string;      // search, edit, content_copy, add, delete
  position: string;  // left, center, right
  action: string;
  color: string;     // primary, accent, warn
  row: number;
  tooltip: string;
  disabled: boolean;
  multiSel: boolean;
}

export interface IconButtons {
  icon: string;      // refresh, filter_list
  position: string;  // left, center, right
  action: string;
  color: string;     // primary, accent, warn
  row: number;
  tooltip: string;
  disabled: boolean;
  multiSel: boolean;
}
*/

@Component({
  selector: 'lib-pmt-data-table',
  templateUrl: './pmt-data-table.component.html',
  styleUrls: ['./pmt-data-table.component.scss'],
  animations: [newRowsAnimation]
})
export class PmtDataTableComponent implements OnInit {
  appVersion;
  @Input() title = 'Sample table';
  @Input() color = '';
  @Input() filter = true;
  @Input() displayedColumns = [];
  @Input() displayedColumnsNames = [];
  @Input() noRefreshColumns = 'false';
  @Input() refreshColumns = 'false';
  @Input() _FUNCTION = 'Z_PMT_WRFC_INTERFACE';
  @Input() abapClass = '';
  @Input() method = '';
  @Input() methodType = '';
  @Input() webrfcLog = '';
  @Input() webrfcLogin = '';
  @Input() webrfcUser = '';
  @Input() webrfcPassword = '';
  @Input() table = '';
  @Input() fields: Fields[] = [];
  @Input() buttons: Buttons[] = [];
  @Input() iconButtons: IconButtons[] = [];
  @Input() multiSelection = false;
  @Input() showMenu = true;
  @Input() baseUrl = 'http://127.0.0.1:8001/sap/bc/webrfc';
  // @Input() sapUser = 'developer';
  // @Input() sapPassword = 'Ostrakon1!';
  // @Input() sapClient = '';
  // @Input() sapLanguage = 'EN';

  dataSource: MatTableDataSource<any>;
  showFilter = true;
  data: any;
//  baseUrl = 'http://mnibm09.novellini.it:8066/sap/bc/webrfc';
// baseUrl = 'http://127.0.0.1:8000/sap/bc/webrfc';
  callback = 'JSONP_CALLBACK';
  response: any;
  progress = false;
  selectedItems: number[];
  currentDate = new FormControl(new Date());
  fieldsRows = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogService: PmtDialogService,
              public dataTableDetailService: PmtDataTableDetailService,
              public dataSourceService: PmtDataSourceService,
              private dateAdapter: DateAdapter<Date>,
              private sanitizer: DomSanitizer,
              iconRegistry: MatIconRegistry ) {
    this.dataSource = new MatTableDataSource([]);
    this.dateAdapter.setLocale('it-IT');
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
 //   debugger;
 //   this.appVersion = version;
  }

  public buttonClick(button: Buttons) {
    if (button.action !== '') {
      const fnString = button.action;
      const fn =  this[fnString]();
      if ( typeof fn === 'function' ) {
        fn();
      }
    }
  }

  public iconBbuttonClick(iconButton: IconButtons) {
    if (iconButton.action !== '') {
      const fnString = iconButton.action;
      const fn =  this[fnString]();
      if ( typeof fn === 'function' ) {
        fn();
      }
    }
  }

  public view() {
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].selected) {
          const rec = this.dataSource.data[i];
          const detailFields = [];
          for (const [key, value] of Object.entries(rec)) {
            for (let j = 0; j < this.displayedColumns.length; j++) {
              if (this.displayedColumns[j] === key) {
                detailFields.push({'key': this.displayedColumnsNames[j], 'value': value});
                continue;
              }
            }
          }
          this.dataTableDetailService.open(this.title + ' view item',   // title
            'view',                   // mode
            detailFields,
            [{caption: 'Close', color: 'primary', close: true}]  // buttons
          );
        }
      }
    }
  }

  public change() {
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].selected) {
          const rec = this.dataSource.data[i];
          const detailFields = [];
          for (const [key, value] of Object.entries(rec)) {
            for (let j = 0; j < this.displayedColumns.length; j++) {
              if (this.displayedColumns[j] === key) {
                detailFields.push({'key': this.displayedColumnsNames[j], 'value': value});
                continue;
              }
            }
          }
          this.dataTableDetailService.data = this.dataSource.data;
          this.dataTableDetailService.open(this.title + ' change item',   // title
            'edit',                   // mode
            detailFields,
            [
              {caption: 'Cancel', color: 'warn', close: true},
              {caption: 'OK', color: 'primary', close: true}
            ],  // buttons
            this.changedCallback,      // callback
            this         // caller
          );
        }
      }
    }
  }

  private changedCallback = (result: any, fields: any[], caller: PmtDataTableComponent) => {
    debugger;
    if (result === 'OK') {
      for (let i = 0; i < caller.dataSource.data.filter(item => item.selected === true).length; i++) {
        //      for (let i = 0; i < this.dataSource.data.length; i++) {
        for (let j = 0; j < fields.length; j++) {
          caller.dataSource.data[i][fields[j].key] = fields[j].value;
          //          this.dataSource.data[i][fields[j].key] = fields[j].value;
        }
      }
    }
  }

  public selectItem(row: any) {
    if (!this.multiSelection) {
      //      for (let i = 0; i < this.dataSource.data.filter(item => item.selected === true).length; i++) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i] !== row) {
          this.dataSource.data[i].selected = false;
        }
      }
    }
    row.selected = !row.selected;
    this.enableDisableButtons();
  }

  public selectAll() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
    }
    this.enableDisableButtons();
  }

  public getResponse = () => /*: Observable<any[]>*/ {
    debugger;
    this.response = this.dataSourceService.getResponse();
    const message = this.dataSourceService.getError();
    if ( message.length > 0 ) {
      this.dialogService.open(this.title,   // title
            message,  // array of messages
            'message',   // dialog type
            'error',   // message type
            [
              {caption: 'Close', color: 'primary', close: true},
              //                           { caption: "Cancel", color: "warn", close: true }
            ]  // buttons
          );
    }
    this.progress = false;
    debugger;
  }

  public getData( )/*: Observable<any[]>*/ {
    const jsonData = {
      //      '_FUNCTION': this._FUNCTION,
      'callback': this.callback,
      //      'method': this.method,
      'sap-client': '001',
      'sap-language': 'EN',
      'sap-user': 'developer',
      'sap-password': 'Ostrakon1!'
    };

    if (this._FUNCTION !== '') {
      jsonData['_FUNCTION'] = this._FUNCTION;
    }

    if (this.abapClass !== '') {
      jsonData['class'] = this.abapClass;
    }

    if (this.method !== '') {
      jsonData['method'] = this.method;
    }

    if (this.methodType !== '') {
      jsonData['method_type'] = this.methodType;
    }

    if (this.webrfcLog !== '') {
      jsonData['webrfc_log'] = this.webrfcLog;
    }
    /*
    if (this.sapLanguage !== '') {
      jsonData['sap-language'] = this.sapLanguage;
    }
    */
    if (this.webrfcLogin !== '') {
      jsonData['webrfc_login'] = this.webrfcLogin;
    }

    if (this.webrfcUser !== '') {
      jsonData['webrfc_user'] = this.webrfcUser;
    }

    if (this.webrfcPassword !== '') {
      jsonData['webrfc_password'] = btoa( this.webrfcPassword );
    }

 //   let inputData = [];
    for (let i = 0; i < this.fields.length; i++) {
      let structure = [];
      if (this.fields[i].value !== '' || this.fields[i].valueFrom || this.fields[i].valueTo ) {
        structure = this.fields[i].name.split(':');
        if ( structure[1] ) {
          this.fields[i].name = structure[0];
        }
      }
      if (this.fields[i].value !== '') {
        if (this.fields[i].type === 'datePicker') {
          const date = new Date(this.fields[i].value);
          jsonData[this.fields[i].name] = date.getFullYear().toString() +
            (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) +
            (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
        } else {
          jsonData[this.fields[i].name/*.toUpperCase()*/] = this.fields[i].value;
          if ( this.fields[i].name.toLocaleLowerCase() === 'sqltable' ) {
            this.table =  this.fields[i].value;
          }
        }
      }
      if ( this.fields[i].valueFrom || this.fields[i].valueFrom ) {
        if (this.fields[i].type === 'datePicker') {
          let dateFrom = null;
          let dateTo = null;
          if ( this.fields[i].valueFrom && this.fields[i].valueFrom !== '' ) {
            const date = new Date(this.fields[i].valueFrom);
            dateFrom = date.getFullYear().toString() +
              (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) +
              (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
          }
          if (this.fields[i].valueTo && this.fields[i].valueTo !== '') {
            const date = new Date(this.fields[i].valueTo);
            dateTo = date.getFullYear().toString() +
              (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) +
              (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
          }
          let jsonDataValue = '';
          if (dateFrom && !dateTo) {
            jsonDataValue =  '{"SIGN":"I","OPTION":"EQ","LOW":"' + dateFrom + '","HIGH":"00000000"}';
          }
          if (!dateFrom && dateTo) {
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"00000000","HIGH":"' + dateTo + '"}';
          }
          if (dateFrom && dateTo) {
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"' + dateFrom + '","HIGH":"' + dateTo + '"}';
          }
          if ( dateFrom || dateTo ) {
            if ( this.fields[i].isTable === 'true' ) {
              jsonDataValue = '[' + jsonDataValue + ']';
            }
            for ( let ii = 1; ii < structure.length; ii++ ) {
              if ( !jsonData[structure[0]] /*|| jsonData[this.fields[ii].name].indexOf(structure[0]) <= 0*/ ) {
                jsonData[this.fields[i].name] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              } else if ( !jsonData[structure[ii]] ) {
                const length = jsonData[structure[0]].length;
                const oldValue = jsonData[structure[0]];
                // tslint:disable-next-line:max-line-length
             //   jsonData[structure[0]] = oldValue.substring(0, length - 1) + ',' +  structure[ii] + ':' + jsonDataValue + oldValue.substring(length - 1);
                const key = structure[0] + '|' + i.toString();
                jsonData[key] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              }
            }
          }
          for ( let ii = 1; ii < structure.length; ii++ ) {
            this.fields[i].name += ':' + structure[ii];
          }
        } else if ( this.fields[i].type === 'timePicker' ) {
          let jsonDataValue = '';
          if (this.fields[i].valueFrom && !this.fields[i].valueTo) {
//            jsonDataValue =  '{"SIGN":"I","OPTION":"EQ","LOW":"' + this.fields[i].valueFrom.replace(':', '') + '","HIGH":""}';
            jsonDataValue =  '{"SIGN":"I","OPTION":"EQ","LOW":"' + this.fields[i].valueFrom.replace(/:/g, '') + '","HIGH":"000000"}';
          }
          if (!this.fields[i].valueFrom && this.fields[i].valueTo) {
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"","HIGH":"' + this.fields[i].valueTo.replace(/:/g, '') + '"}';
          }
          if (this.fields[i].valueFrom && this.fields[i].valueTo) {
            // tslint:disable-next-line:max-line-length
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"' + this.fields[i].valueFrom.replace(/:/g, '') + '","HIGH":"000000' + this.fields[i].valueTo.replace(/:/g, '') + '"}';
          }
          if ( this.fields[i].valueFrom || this.fields[i].valueTo ) {
            if ( this.fields[i].isTable === 'true' ) {
              jsonDataValue = '[' + jsonDataValue + ']';
            }
            for ( let ii = 1; ii < structure.length; ii++ ) {
              if ( !jsonData[structure[0]] /*|| jsonData[this.fields[ii].name].indexOf(structure[0]) <= 0*/ ) {
                jsonData[this.fields[i].name] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              } else if ( !jsonData[structure[ii]] ) {
                const length = jsonData[structure[0]].length;
                const oldValue = jsonData[structure[0]];
                // tslint:disable-next-line:max-line-length
//                jsonData[structure[0]] = oldValue.substring(0, length - 1) + ',' +  structure[ii] + ':' + jsonDataValue + oldValue.substring(length - 1);
                const key = structure[0] + '|' + i.toString();
                jsonData[key] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              }
            }
          }
          for ( let ii = 1; ii < structure.length; ii++ ) {
            this.fields[i].name += ':' + structure[ii];
          }
        } else {
          let jsonDataValue = '';
          if (this.fields[i].valueFrom && !this.fields[i].valueTo) {
            if ( this.fields[i].valueFrom.indexOf('*') > 0 ) {
              jsonDataValue =  '{"SIGN":"I","OPTION":"CP","LOW":"' + this.fields[i].valueFrom + '","HIGH":""}';
            } else {
              jsonDataValue =  '{"SIGN":"I","OPTION":"EQ","LOW":"' + this.fields[i].valueFrom + '","HIGH":""}';
            }
          }
          if (!this.fields[i].valueFrom && this.fields[i].valueTo) {
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"","HIGH":"' + this.fields[i].valueTo + '"}';
          }
          if (this.fields[i].valueFrom && this.fields[i].valueTo) {
            jsonDataValue = '{"SIGN":"I","OPTION":"BT","LOW":"' + this.fields[i].valueFrom + '","HIGH":"' + this.fields[i].valueTo + '"}';
          }
          if ( this.fields[i].valueFrom || this.fields[i].valueTo ) {
            if ( this.fields[i].isTable === 'true' ) {
              jsonDataValue = '[' + jsonDataValue + ']';
            }
            for ( let ii = 1; ii < structure.length; ii++ ) {
              if ( !jsonData[structure[0]] /*|| jsonData[this.fields[ii].name].indexOf(structure[0]) <= 0*/ ) {
                jsonData[this.fields[i].name] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              } else if ( !jsonData[structure[ii]] ) {
                const length = jsonData[structure[0]].length;
                const oldValue = jsonData[structure[0]];
                // tslint:disable-next-line:max-line-length
//                jsonData[structure[0]] = oldValue.substring(0, length - 1) + ',' +  structure[ii] + ':' + jsonDataValue + oldValue.substring(length - 1);
                const key = structure[0] + '|' + i.toString();
                jsonData[key] = '{' + structure[ii] + ':' + jsonDataValue + '}';
              }
            }
          }
          for ( let ii = 1; ii < structure.length; ii++ ) {
            this.fields[i].name += ':' + structure[ii];
          }
        }
      }
    }   // for (let i = 0; i < this.fields.length; i++) {
    const so = this;
    this.progress = true;

        /*
		let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
		return this.http.get(apiURL)
				.map(res => {
					return res.json().results.map(item => {
						return new SearchItem(
								item.trackName,
								item.artistName,
								item.trackViewUrl,
								item.artworkUrl30,
								item.artistId
						);
					});
				});
		*/

    if ( so.refreshColumns === 'true' ) {
      so.displayedColumns = [];
      so.displayedColumnsNames = [];
    }

debugger;
    this. dataSourceService.call( this.baseUrl,
                                  jsonData,
                                  false,
                                  'POST',
                                  'jsonp',
                                  'application/json',
                                  true,
                                  jsonData.callback,
                                  60000, // sets timeout to 60 seconds
                                  this.getResponse.bind(this)
      ) ;

    jQuery.ajax({
      url: this.baseUrl,
      data: jsonData,
      async: false,
      type: 'POST',
      dataType: 'jsonp',
      contentType: 'application/json',
      crossDomain: true,
      jsonpCallback: jsonData.callback,
      timeout: 60000, // sets timeout to 60 seconds
      success: function(data) {
        let i = 0;
        for (const item of so.displayedColumns) {
          if (!so.displayedColumnsNames[i] || so.displayedColumnsNames[i] === '') {
            so.displayedColumnsNames[i] = item;
          }
          i++;
        }


        so.response = data;

        if ( so.response.results[so.table] ) {
          so.dataSource.data = so.response.results[so.table];
        } else {
          if ( so.response.errors.length > 0 ) {
            so.dialogService.open(so.title,   // title
              [ so.response.errors[0].msg ],  // array of messages
              'message',   // dialog type
              'error',   // message type
              [
                {caption: 'Close', color: 'primary', close: true},
                //                           { caption: "Cancel", color: "warn", close: true }
              ]  // buttons
            );
//            so.progress = false;
            return;
          }
        }


        // decode URI
        for (let m = 0; m < so.response.dictionary.length; m++) {
          const rec = so.response.dictionary[m];
          for (const [key, value] of Object.entries(rec)) {
            const val: any = value;
            so.response.dictionary[m][key] = decodeURIComponent(val);
          }
        }


        const dictionary = so.response.dictionary;

        // decode URI
        for (let m = 0; m < so.dataSource.data.length; m++) {
          const rec = so.dataSource.data[m];
          for (const [key, value] of Object.entries(rec)) {
            const val: any = value;
            so.dataSource.data[m][key] = decodeURIComponent(val);
          }
        }

        if ( so.dataSource.data.length > 0 ) {
          // if no specified displayed columns is set by code
          if (so.displayedColumnsNames.length === 0) {
            i = 0;
            const rec = so.dataSource.data[0];
            for (const [key, value] of Object.entries(rec)) {
              so.displayedColumns[i] = key;
              if ( !so.response.dictionary.filter(item => item.name === key)[0] ) {
                so.displayedColumnsNames[i] = key;
              } else  {
                so.displayedColumnsNames[i] = so.response.dictionary.filter(item => item.name === key)[0].smallDescr;
              }
              i++;
            }
          }
          /*
          so.displayedColumnsNames = [];
          debugger;
          const rec = so.dataSource.data[0];
          i = 0;
          // build mat-table rows
          if (so.displayedColumnsNames.length === 0) {
            for (const [key, value] of Object.entries(rec)) {
              const rec2 = so.response.dictionary.filter(item => item.name === key)[0];
              for (const [key2, value2] of Object.entries(rec2)) {
                if (key2 === 'small_descr') {
                  // check if the extracted columns is in dyplayed columns array"
                  if ( so.displayedColumns.filter(item => item === key)[0] ) {
                    // put value in correct column
                    for (let j = 0; j < so.displayedColumns.length; j++ ) {
                      if ( so.displayedColumns[j] === key ) {
                        i = j;
                        break;
                      }
                    }
                    if (value2 !== '') {
                      so.displayedColumnsNames[i] = value2;
                    } else {
                      so.displayedColumnsNames[i] = so.response.dictionary[i].name.replace('"', '').replace('"', '');
                    }
                    i++;
                  }
                }
              }
            }
          }
        */
        }
//        so.progress = false;
        so.iconButtons.filter(item => item.icon === 'delete')[0].disabled = false;
      },
      error: function(data, status, error) {
        /*
        so.response = [];
        so.response['results'] = { 'USRLIST': [{'tid': '1', 'mandt': '', 'vbname': '', 'termv': '', 'hostaddr': ''}]  };
        so.dataSource.data = so.response.results['USRLIST'];
        */
//        so.progress = false;
        so.dialogService.open(so.title,   // title
          ['Server unavailable'],  // array of messages
          'message',   // dialog type
          'error',   // message type
          [
            {caption: 'Close', color: 'primary', close: true},
            //                           { caption: "Cancel", color: "warn", close: true }
          ]  // buttons
        );
      }
    });
    /*
    .catch( function(e) {
       debugger;
       if ( e.statusText === 'timeout') {
         alert('Native Promise: Failed from timeout');
       }
     });
     * */
  }


  public refresh() {
    if ( this.noRefreshColumns === 'false' ) {
      this.refreshColumns = 'true';
    }
    this.getData();
    /*
    if ( this.dataSource.data.length > 0 ) {
      this.iconButtons.filter(item => item.icon === 'delete')[0].disabled = false;
    }
    */
  }

  public delete() {
    this.dataSource.data = [];
debugger;
    for ( let i = this.dataSource.data.length - 1; i >= 0; i-- ) {
      this.dataSource.data.splice(i, 1);
    }
    this.iconButtons.filter(item => item.icon === 'delete')[0].disabled = true;
  }

 public showFilterClick() {
    this.showFilter = !this.showFilter;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private enableDisableButtons() {
    if (this.dataSource.data.filter(item => item.selected === true).length === 1) {
      for (let m = 0; m < this.buttons.filter(item => item.multiSel === false).length; m++) {
        //        this.buttons[m].disabled = !this.buttons[m].disabled;   // !row.selected;
        this.buttons[m].disabled = false;   // !row.selected;
      }
    } else {
      for (let m = 0; m < this.buttons.filter(item => item.multiSel === false).length; m++) {
        this.buttons[m].disabled = true;
      }
    }
  }

  ngOnInit() {
    if ( this.fields[0] ) {
      this.fieldsRows.push(this.fields[0].row/*row*/);
      for ( let i = 1; i < this.fields.length; i++ ) {
        if ( !this.fields[i].row ) {
          this.fields[i].row = '0';
        }
        if ( this.fields[i].row !== this.fields[i - 1].row ) {
          this.fieldsRows.push(this.fields[i].row/*row*/);
        }
      }
      this.fieldsRows.sort( );
    }
    if ( this.showMenu === true && !this.iconButtons.filter(item => item.icon === 'menu')[0] ) {
      // tslint:disable-next-line:max-line-length
      this.iconButtons.push( { icon: 'menu', position: 'right', action: 'menu', color: 'accent', row: 0, tooltip: 'Menu', disabled: false, multiSel: null } );
    }
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 }

}


