/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";

// this is the root component that starts the whole application
bootstrap(AppComponent, [ROUTER_PROVIDERS]);