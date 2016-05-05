import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
// this import allows us to use all the functions associated with observables,
// e.g. map and subscribe (see app.component)
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
/**
 * Created by eric on 5/4/16.
 */

@Injectable()

export class DataService {
    constructor(private _http: Http) {}

    /*
    * Need at least two things
    * 1. URL to send to
    * 2. Body of what to send to
    * */
    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://incandescent-torch-6930.firebaseio.com/http-test.json', body, {'headers': headers})
        // map transforms the data stream that we get back, and parses it at JSON
            // map is rxjs-specific for observables
            .map(response => response.json());
    }

    getData(): Observable<any> {
        return this._http.get('https://incandescent-torch-6930.firebaseio.com/http-test.json')
            .map(response => response.json());


    }
}