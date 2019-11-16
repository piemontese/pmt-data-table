import { Component, OnInit } from '@angular/core';

// import * as configuration from './configuration.json';
import { Config } from './configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  configuration = new Config;  // configuration;
}
