/**
 * Created by eric on 5/10/16.
 */


import {Injectable, EventEmitter} from "angular2/core";
import {User} from "./user.interface";
// this tells Typescript that we are going to use this object,
// not previously defined, and makes sure that Typescript doesn't throw errors
declare var Firebase: any;


@Injectable()

export class AuthService {
    private _userLoggedOut = new EventEmitter<any>();


    signupUser(user: User) {
        const firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com');

        // pass a json which describes the user we'd like to create
        // the method is defined in the SDK
        // must contain email and password fields,
        // second argument is callback, optional
        firebaseRef.createUser({
            email: user.email,
            password: user.password
        }, function (error, userData) {
            if (error) {
                console.error(error);
            } else {
                console.log('Successfully created user: ' + userData.uid);
            }
        });
    }

    signinUser(user: User) {
        const firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com');

        // documentation for SDK is provided on website
        // pass json with email/password, and optional callback
        firebaseRef.authWithPassword({
            email: user.email,
            password: user.password
        }, function (error, authData) {
            if (error) {
                // handle login error
                console.error(error);
            } else {
                // we want to store the JWT (authData) in localstorage so we can use it for future authenticated requests
                localStorage.setItem('token', authData.token);
                console.log('Successfully signedIn: ' + authData);
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        // emit this event so the header can listen to it
        // the app.component listens for this event and routes to the signin page whenever logout is fired
        this._userLoggedOut.emit();
    }

    // this basically returns an Observable, which is subscribed by app.component
    getLoggedOutEvent(): EventEmitter {
        return this._userLoggedOut;
    }

    isAuthenticated(): boolean {
        // if the token exists in localstorage, then we're good!
        // We set it on login, and we're going to delete it on logout

        // for real apps, we might want to delete the token if a user leaves the app (or something like that
        return localStorage.getItem('token') !== null;
    }

    
}

