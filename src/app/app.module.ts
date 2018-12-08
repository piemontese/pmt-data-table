import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule  } from '@angular/material';
import { MatDialogModule  } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'jquery';

import { PmtDataTableModule } from 'projects/pmt-data-table/src/lib/pmt-data-table.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
//    BrowserAnimationsModule,
    CdkTableModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule,
    MatDialogModule,
    MatDividerModule,
    FlexLayoutModule,
    PmtDataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
