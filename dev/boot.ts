/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {LoggingService} from "./services/logging.service";

// this is the root component that starts the whole application
// The second, optional, argument is an array of custom services
bootstrap(AppComponent, [LoggingService]);