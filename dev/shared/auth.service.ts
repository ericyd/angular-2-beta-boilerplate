/**
 * Created by eric on 5/11/16.
 */

import {Injectable} from "angular2/core";
import {User} from "./user.interface";
import {Headers, Http} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

declare var Firebase:any;

@Injectable()

export class AuthService() {

    constructor(private _http: Http) {}

    signupUser(user: User): Observable<any> {
        const firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/');
        const body = JSON.stringify(user);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        return
    }

    signinUser(user: User) {

    }

    logout() {

    }

    isAuthenticated(): boolean {

    }
}