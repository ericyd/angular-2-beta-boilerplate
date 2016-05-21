/**
 * Created by eric on 5/11/16.
 */

import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

declare var Firebase:any;

@Injectable()

export class AuthService {

    private _authError: EventEmitter<string> = new EventEmitter<string>();
    private _loggedIn: EventEmitter<any> = new EventEmitter<any>();
    private firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/');

    constructor(private _router: Router) {}

    signupUser(user: User): Observable<any> {

        return this.firebaseRef.createUser({
                'email': user.email,
                'password': user.password
            },
            (error) => {
                if (error) {
                    this._authError.emit(error);
                } else {
                    // auto-login user after account creation
                    this.loginUser({email: user.email, password: user.password});
                }

            });
    }

    loginUser(user: User): Promise<any> {

        return this.firebaseRef.authWithPassword({
                'email': user.email,
                'password': user.password
            },
            (error, authData) => {
                if (error) {
                    this._authError.emit(error);
                } else {
                    localStorage.setItem('token', authData.token);
                    localStorage.setItem('uid', authData.uid);
                    this._router.navigate(['Recipes']);
                    console.log('Successfully logged in user');
                }

            });

        /* optional callback
        (error, authData) => {
            if (error) {
                this._signinError = true;
                console.error('Signin error: ' + error);
            } else {
                localStorage.setItem('token', authData.auth);
                this._router.navigate(['Recipes']);
                console.log('Successfully logged in user');
            }

        }*/
    }

    logout() {
        this._loggedIn.emit('Logged Out');
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token');
    }

    getAuthError(): EventEmitter<string> {
        return this._authError;
    }

    getLogoutEvent(): EventEmitter<any> {
        return this._loggedIn;
    }
}