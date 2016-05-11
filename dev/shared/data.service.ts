/**
 * Created by eric on 5/10/16.
 */
//This service is responsible for the data interactions, not the authentication

import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
@Injectable()


export class DataService {
    constructor(private _http: Http) {}

    getAllData(): Observable<any> {
        // must append token in order to authenticate all requests
        // this is because Firebase security rules are now set s.t. only authenticated users can read or write data.
        const token = localStorage.getItem('token') !== null
            // write the whole string that will be appended to URL
            ? '?auth=' + localStorage.getItem('token')
            : '';

        return this._http.get('https://incandescent-torch-6930.firebaseio.com/users/data.json' + token)
            .map(response => response.json());
    }

    addData(data: any): Observable<any> {
        const token = localStorage.getItem('token') !== null
            // write the whole string that will be appended to URL
            ? '?auth=' + localStorage.getItem('token')
            : '';

        const body: string = JSON.stringify(data);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        // post will append the data in the db, whereas put would overwrite stuff.
        // Also, post auto-generates an ID, whereas put will not
        return this._http.post('https://incandescent-torch-6930.firebaseio.com/users/data.json' + token,
            body,
            {
                'headers': headers
            })
            .map(response => response.json());

    }

    deleteAllData():Observable<any> {
        const token = localStorage.getItem('token') !== null
            // write the whole string that will be appended to URL
            ? '?auth=' + localStorage.getItem('token')
            : '';


        return this._http.delete('https://incandescent-torch-6930.firebaseio.com/users/data.json' + token)
            .map(response => response.json());
    }
}