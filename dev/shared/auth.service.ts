/**
 * Created by eric on 5/11/16.
 */

import {Injectable, EventEmitter} from "angular2/core";
import {User} from "./user.interface";
import {Headers} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Router} from "angular2/router";

declare var Firebase:any;

@Injectable()

export class AuthService {

    private _signupError: boolean = false;
    private _signinError: boolean = false;
    private _loggedIn: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _router: Router) {}

    signupUser(user: User): Observable<any> {
        const firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/');

        return firebaseRef.createUser({
                'email': user.email,
                'password': user.password
            },
            (error, userData) => {
                if (error) {
                    console.error(error);
                    this._signupError = true;
                    return;
                }
                this._signupError = false;
                this._router.navigate(['Login']);
                // this.signinUser({userData.email, userData.password});
                return console.log('Successfully signed up user: ' + userData.uid);
            });
    }

    signinUser(user: User): Observable<any> {
        const firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/');

        return firebaseRef.authWithPassword({
                'email': user.email,
                'password': user.password
            },
            (error, authData) => {
                if (error) {
                    this._signinError = true;
                    return console.error('Signin error: ' + error);
                }
                localStorage.setItem('token', authData.auth);
                this._router.navigate(['Recipes']);
                return console.log('Successfully logged in user');
            }
        );
    }

    logout() {
        this._loggedIn.emit('Logged Out');
        return localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token');
    }

    getSignupError(): boolean {
        return this._signupError;
    }

    getSigninError(): boolean {
        return this._signinError;
    }

    getLogoutEvent(): EventEmitter<any> {
        return this._loggedIn;
    }
}