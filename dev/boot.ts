/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import {AuthService} from "./shared/auth.service";

// this is the root component that starts the whole application
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService]);