import { Injectable } from '@angular/core';
import { PmtDialogService } from 'pmt-dialog';


@Injectable()
export class PmtDataSourceService {
  private response: any[];
  private error = null;

  public constructor ( private dialogService: PmtDialogService ) {
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
               callback ) {

    this.error = '';
    const so = this;
    jQuery.ajax({
      url: url,
      data: data,
      async: async,
      type: type,
      dataType: dataType,
      contentType: contentType,
      crossDomain: crossDomain,
      jsonpCallback: jsonpCallback,
      timeout: timeout, // sets timeout to 60 seconds
      success: function(response) {
        so.response = response;
        callback();
//        return response;
      },
      error: function(response, status, error) {
        so.response = null;
        so.error = error;
        callback();
//        return response;
      }
    });

  }

  public getResponse = () => {
    return this.response;
  }

  public getError = () => {
    return [this.error];
  }

}
