/**
 * Created by eric on 4/24/16.
 */

import {Injectable} from 'angular2/core';

@Injectable()

export class DataService {
    private _data = ['Summer', 'Winter', 'Warm', 'Cold'];

    getRandomString() {
        let rdmNum = Math.floor(Math.random() * this._data.length);
        return this._data[rdmNum];
    }

    insert(value: string) {
        this._data.push(value);
    }
}

