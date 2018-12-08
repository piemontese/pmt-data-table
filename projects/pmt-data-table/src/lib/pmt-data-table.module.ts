import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, JsonpClientBackend, HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule  } from '@angular/material';
import { MatTooltipModule  } from '@angular/material';
import { MatDialogModule  } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule  } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'jquery';

import { PmtDataTableRoutingModule } from './pmt-data-table-routing.module';
import { PmtBaseDataTableComponent } from './components/commons/pmt-base-data-table/pmt-base-data-table.component';
import { PmtDataTableComponent } from './components/pmt-data-table.component';
import { PmtDataTableDetailComponent } from './components/commons/pmt-data-table-detail/pmt-data-table-detail.component';
import { PmtDataTableDetailService } from './services/pmt-data-table-detail.service';
import { PmtDataSourceService } from './services/pmt-data-source.service';
import { PmtPositionPipe } from './pipes/pmt-position.pipe';
import { PmtRowPipe } from './pipes/pmt-row.pipe';

import { PmtDialogModule } from 'pmt-dialog';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    PmtDataTableRoutingModule,
    PmtDialogModule,
  ],
  declarations: [
    PmtBaseDataTableComponent,
    PmtDataTableComponent,
    PmtDataTableDetailComponent,
    PmtPositionPipe,
    PmtRowPipe
  ],
  exports: [
    PmtBaseDataTableComponent,
    PmtDataTableComponent,
    PmtDataTableDetailComponent,
    PmtPositionPipe,
    PmtRowPipe
  ],
  providers: [
    PmtDataTableDetailService,
    PmtDataSourceService
//    JsonpClientBackend,
//    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
//    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
  ],
  entryComponents: [
    PmtDataTableDetailComponent
  ],
})
export class PmtDataTableModule { }
