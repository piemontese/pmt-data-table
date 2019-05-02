import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PmtDialogService } from 'pmt-dialog';
import { Observable, Subject, Subscription  } from 'rxjs';
import { map } from 'rxjs/operators';

export class Response {
  results: Array<any>;
}

@Injectable()
export class PmtDataSourceService {
  private response = [];
  private success = false;
  private error = null;
  private columns = [];
  private columnsNames = [];
  private data = [];
  private dictionary = [];
  private errors = [];
  private informations = [];
  private warnings = [];
  subscription: Subscription;

  public constructor ( /*private httpClient: HttpClient */ ) {
  }

  public call( url: string,
               data: any,
               async: boolean,
               type: string,
               dataType: string,
               contentType: string,
               crossDomain: boolean,
               jsonpCallback: string,
               timeout: number, // sets timeout to 60 seconds
               callback,
               columns: Array<string>,
               columnsNames: Array<string> ) {
    this.response = [];
    this.columns = columns;
    this.columnsNames = columnsNames;
    this.error = '';
    const so = this;

    jQuery.ajax({
      url: url,
      data: data,
      async: async,
      type: type,
      cache: false,
      dataType: dataType,
      contentType: contentType,
      crossDomain: crossDomain,
      jsonpCallback: jsonpCallback,
      timeout: timeout, // sets timeout to 60 seconds
      success: function(response) {
        if ( !response['errors'] || response['errors'].length === 0 ) {
          so.success = true;
        } else  {
          so.errors = response['errors'].filter(item => item.type === 'E');
          so.informations = response['errors'].filter(item => item.type === 'I');
          so.warnings = response['errors'].filter(item => item.type === 'W');
        }
        so.response = response;
        callback(so);
//        return response;
      },
      error: function(response, status, error) {
        so.response = null;
        so.error = error;
        callback(so);
//        return response;
      }
    });

  }   // public call

  public callObservable( url: string,
               data: any,
               async: boolean,
               type: string,
               dataType: string,
               contentType: string,
               crossDomain: boolean,
               jsonpCallback: string,
               timeout: number, // sets timeout to 60 seconds
               callback,
               columns: Array<string>,
               columnsNames: Array<string> )/*:  Observable<any> */ {
    this.response = [];
    this.columns = columns;
    this.columnsNames = columnsNames;
    this.error = '';
    const so = this;
/*
    let serviceUrl = url;
    for (let i = 0; i < data.length; i++) {
      const rec = data[i];
      for (const [key, value] of Object.entries(rec)) {
        serviceUrl = serviceUrl + '&' + key + '=' + value;
      }
    }
    return this.httpClient.jsonp(serviceUrl, callback)
      .pipe(map((response: Response) => response[1]))
      .pipe(map((results: any[]) => results.map((result: string) => result[0])));
*/
  }   // public callObservable

  public getResponse = () => {
    return this.response;
  }

  public getSuccess () {
    return this.success;
  }

  public getError() {
    return this.errors;
  }

  public getNode( node: string) {
    if ( this.data.length === 0 ) {
      let i = 0;
      if ( this.columnsNames.length === 0 ) {
        for (const item of this.columns) {
          if (!this.columnsNames[i] || this.columnsNames[i] === '') {
            this.columnsNames[i] = item;
          }
          i++;
        }
      }

      this.data = this.response['results'][node];
      this.dictionary = this.response['dictionary'];

      // decode URI
      for (let m = 0; m < this.dictionary.length; m++) {
        const rec = this.dictionary[m];
        for (const [key, value] of Object.entries(rec)) {
          const val: any = value;
          this.dictionary[m][key] = decodeURIComponent(val);
        }
      }

/*
        if ( !this.data) {
          this.data = this.response.results[this.table];
        } else {
          if ( this.response.errors.length > 0 ) {
            this.dialogService.open(this.title,   // title
              [ this.response.errors[0].msg ],  // array of messages
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
*/
        // decode URI
      for (let m = 0; m < this.data.length; m++) {
        const rec = this.data[m];
        for (const [key, value] of Object.entries(rec)) {
          const val: any = value;
          this.data[m][key] = decodeURIComponent(val);
        }
      }

      if ( this.data.length > 0 ) {
        // if no specified displayed columns is set by code
        if (this.columnsNames.length === 0) {
          i = 0;
          const rec = this.data[0];
          for (const [key, value] of Object.entries(rec)) {
            this.columns[i] = key;
            if ( !this.dictionary.filter(item => item.name === key)[0] ) {
              this.columnsNames[i] = key;
            } else  {
              this.columnsNames[i] = this.dictionary.filter(item => item.name === key)[0].smallDescr;
            }
            i++;
          }
        }
      }
    }   // if ( this.data.length === 0 )

    const arrayRet = [];
    arrayRet['columns'] = this.columns;
    arrayRet['columnsNames'] = this.columnsNames;
    arrayRet['data'] = this.data;
    arrayRet['dictionary'] = this.dictionary;
    return arrayRet;
  }   // public getNode

}
